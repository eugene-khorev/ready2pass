import axios from 'axios';

const OAuth = {
  install: function(Vue, options) {
    Vue.prototype.$auth = {
      refreshTimer: null,

      isUserAuthorized() {
        return !!localStorage.getItem('accessToken');
      },

      authenticate(email, password) {
        return new Promise(function(resolve, reject) {
          axios.post('/api/login', {
            email: email,
            password: password,
          })
          .then(function (response) {
            localStorage.setItem('accessToken', response.data.access_token);
            this.refreshTimer = setTimeout(
              this.refreshAccessToken.bind(this),
              response.data.expires_in * 1000
            );
            resolve();
          }.bind(this))
          .catch(function (error) {
            console.log(error.response)
            localStorage.setItem('accessToken', '');
            reject(error);
          });
        }.bind(this));
      },

      refreshAccessToken: function () {
        axios.post('/api/login/refresh')
        .then(function (response) {
          localStorage.setItem('accessToken', response.data.access_token);
          setTimeout(
            this.refreshAccessToken.bind(this),
            response.data.expires_in * 1000
          );
        }.bind(this))
        .catch(function (error) {
          localStorage.setItem('accessToken', '');
          console.log(error);
        });
      },

      logout: function () {
        const token = localStorage.getItem('accessToken');
        return new Promise(function(resolve, reject) {
          axios.post('/api/logout', {}, {
            headers: { Authorization: 'Bearer ' + token }
          })
          .then(function (response) {
            clearTimeout(this.refreshTimer);
            localStorage.setItem('accessToken', '');
            resolve();
          }.bind(this))
          .catch(function (error) {
            clearTimeout(this.refreshTimer);
            localStorage.setItem('accessToken', '');
            reject(error);
          });
        }.bind(this));
      },

      register: function (name, email, password, password_confirmation) {
        return new Promise(function(resolve, reject) {
          axios.post('/api/register', {
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation,
          })
          .then(function (response) {
            localStorage.setItem('accessToken', response.data.access_token);
            this.refreshTimer = setTimeout(
              this.refreshAccessToken.bind(this),
              response.data.expires_in * 1000
            );
            resolve();
          }.bind(this))
          .catch(function (error) {
            localStorage.setItem('accessToken', '');
            reject(error);
          });
        }.bind(this));
      },
    }
  },
}

export default OAuth;
