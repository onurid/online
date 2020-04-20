(function () {
    'use strict';

    angular
        .module('app')
        .factory('RoleService', RoleService);

    var roleApiUrl = baseURL + '/api' + adminPath + '/role';

    var applicationRoleApiUrl = baseURL + '/api' + adminPath + '/application-role';

    var roleAuthoriseApiUrl = baseURL + '/api' + adminPath + '/role-authorise';

    RoleService.$inject = ['getjson'];
    function RoleService(getjson) {
        var service = {};

        service.GetRoles = GetRoles;
        service.GetRoleAuthorises = GetRoleAuthorises;
        service.GetRolesByApplication = GetRolesByApplication;

        service.PostRole = PostRole;
        service.DeleteRole = DeleteRole;

        service.PostRoleAuthorise = PostRoleAuthorise;
        service.DeleteRoleAuthorise = DeleteRoleAuthorise;
        
        return service;

        function GetRoles(callback) {
            getjson.getData(roleApiUrl)
                .then(function (res) {
                    callback(res.data);
                });
        }

        function GetRolesByApplication(applicationId, callback) {
            getjson.getData(applicationRoleApiUrl + "/" + applicationId)
                .then(function (res) {
                    callback(res.data);
                });
        }

        function GetRoleAuthorises(callback) {
            getjson.getData(roleAuthoriseApiUrl)
                .then(function (res) {
                    callback(res.data);
                });
        }

        function PostRole(role, callback) {
            getjson.postData(applicationRoleApiUrl, role)
                .then(function (res) {
                    callback(res);
                });
        }

        function DeleteRole(roleId, callback) {
            getjson.deleteData(applicationRoleApiUrl + "/" + roleId)
                .then(function (res) {
                    callback(res);
                });
        }

        function PostRoleAuthorise(roleAuthorise, callback) {
            getjson.postData(roleAuthoriseApiUrl, roleAuthorise)
                .then(function (res) {
                    callback(res);
                });
        }

        function DeleteRoleAuthorise(roleAuthoriseId, callback) {
            getjson.deleteData(roleAuthoriseApiUrl + "/" + roleAuthoriseId)
                .then(function (res) {
                    callback(res);
                });
        }
    }

})();
