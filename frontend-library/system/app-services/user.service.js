(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    var userApiUrl = baseURL + '/api' + adminPath + '/user';

    var userRoleApiUrl = baseURL + '/api' + adminPath + '/user-role';

    UserService.$inject = ['getjson'];
    function UserService(getjson) {
        var service = {};

        service.GetUsers = GetUsers;
        service.GetUserRole = GetUserRole;

        service.PostUser = PostUser;
        service.DeleteUser = DeleteUser;

        service.PostUserRole = PostUserRole;
        service.DeleteUserRole = DeleteUserRole;

        service.GetUser = GetUser;
        service.PutUser = PutUser;

        return service;

        function GetUsers(callback) {
            getjson.getData(userApiUrl)
                .then(function (res) {
                    callback(res.data);
                });
        }

        function GetUser(userId, callback) {
            getjson.getData(userApiUrl + '/' + userId)
                .then(function (res) {
                    callback(res.data);
                });
        }

        function GetUserRole(callback) {
            getjson.getData(userRoleApiUrl)
                .then(function (res) {
                    callback(res.data);
                });
        }

        function PostUser(user, callback) {
            getjson.postData(userApiUrl, user)
                .then(function (res) {
                    callback(res);
                });
        }

        function PutUser(user, callback) {
            getjson.putData(userApiUrl, user)
                .then(function (res) {
                    callback(res);
                });
        }

        function DeleteUser(userId, callback) {
            getjson.deleteData(userApiUrl + "/" + userId)
                .then(function (res) {
                    callback(res);
                });
        }

        function PostUserRole(userRole, callback) {
            getjson.postData(userRoleApiUrl, userRole)
                .then(function (res) {
                    callback(res)                        
                });
        }

        function DeleteUserRole(userRoleId, callback) {
            getjson.deleteData(userRoleApiUrl + "/" + userRoleId)
                .then(function (res) {
                    callback(res);
                });
        }
    }

})();
