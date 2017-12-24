import axios from 'axios';

const OAuth = {
  install: function(Vue, options) {
    Vue.prototype.$auth = {
      isUserAuthorized() {
        return !!localStorage.getItem('accessToken');
      },

      authenticate(email, password) {
        return new Promise(function(resolve, reject) {
          axios.post('/api/login', {
            email: email,
            password: password
          })
          .then(function (response) {
            localStorage.setItem('accessToken', response.data.access_token);
            setTimeout(
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
            localStorage.setItem('accessToken', '');
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
