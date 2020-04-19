(function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);
    
    AuthenticationService.$inject = ['$http', 'getjson', '$cookies', '$rootScope'];
    function AuthenticationService($http, getjson, $cookies, $rootScope) {
        var service = {};

        service.ExternalLogin = ExternalLogin;
        service.Create = Create;
        
        return service;

        function ExternalLogin(username, password, callback) {
            getjson.postData(baseURL + '/api' + authPath + '/login', { email: username, password: password })
                .then(function (res) {
                        callback(res);
                });
        }

        function Create(username, password, callback) {
            getjson.postData(baseURL + '/api' + authPath + '/new', { email: username, password: password })
                .then(function (res) {
                        callback(res);
                });
        }
    }

})();
