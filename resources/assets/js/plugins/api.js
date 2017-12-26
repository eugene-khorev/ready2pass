import axios from 'axios';

const Api = {
  install: function(Vue, options) {
    Vue.prototype.$api = {
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
            this.refreshTimer = setInterval(
              this.refreshAccessToken.bind(this),
              (response.data.expires_in - 60) * 1000
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
        clearInterval(this.refreshTimer);
        return new Promise(function(resolve, reject) {
          axios.post('/api/login/refresh')
          .then(function (response) {
            localStorage.setItem('accessToken', response.data.access_token);
            this.refreshTimer = setInterval(
              this.refreshAccessToken.bind(this),
              (response.data.expires_in - 60) * 1000
            );
            resolve();
          }.bind(this))
          .catch(function (error) {
            localStorage.setItem('accessToken', '');
            console.log(error);
            reject();
          });
        }.bind(this));
      },

      logout: function () {
        const token = localStorage.getItem('accessToken');
        return new Promise(function(resolve, reject) {
          axios.post('/api/logout', {}, {
            headers: { Authorization: 'Bearer ' + token }
          })
          .then(function (response) {
            clearInterval(this.refreshTimer);
            localStorage.setItem('accessToken', '');
            resolve();
          }.bind(this))
          .catch(function (error) {
            clearInterval(this.refreshTimer);
            localStorage.setItem('accessToken', '');
            reject(error);
          }.bind(this));
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
            this.refreshTimer = setInterval(
              this.refreshAccessToken.bind(this),
              (response.data.expires_in - 60) * 1000
            );
            resolve();
          }.bind(this))
          .catch(function (error) {
            localStorage.setItem('accessToken', '');
            reject(error);
          });
        }.bind(this));
      },

      protectedRequest(url, method, data) {
        const request = function(resolve, reject) {
          const token = localStorage.getItem('accessToken');
          axios({
            url,
            method,
            data,
            headers: { Authorization: 'Bearer ' + token }
          })
          .then(resolve)
          .catch(reject);
        };

        return new Promise(function (resolve, reject) {
          request(function(response) {
            resolve(response);
          }, function () {
            this.refreshAccessToken()
            .then(function () {
              request(resolve, reject)
            })
            .catch(reject);
          }.bind(this))
        }.bind(this));
      },

      getUserPasswords() {
        return this.protectedRequest('/api/passwords', 'get')
      },

      getUserPasswordItem(id) {
        return this.protectedRequest('/api/passwords/' + id, 'get');
      },

      saveUserPasswordItem(id, name, password, comment, icon) {
        return this.protectedRequest('/api/passwords', 'post', {
          id, name, password, comment, icon
        });
      },
    }
  },
}

export default Api;
