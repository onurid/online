(function () {
    'use strict';

    angular
        .module('app')
        .factory('ApplicationService', ApplicationService);

    var applicationApiUrl = baseURL + '/api' + adminPath  + '/application';

    var applicationTypeApiUrl = baseURL + '/api' + adminPath + '/application-type';

    var applicationModuleApiUrl = baseURL + '/api' + adminPath + '/application-module';

    ApplicationService.$inject = ['getjson'];
    function ApplicationService(getjson) {
        var service = {};
        
        service.GetApplications = GetApplications;
        service.GetAllApplicationType = GetAllApplicationType;
        service.GetAllApplicationModule = GetAllApplicationModule; 

        service.PostApplication = PostApplication;
        service.DeleteApplication = DeleteApplication;

        service.PostApplicationType = PostApplicationType;
        service.DeleteApplicationType = DeleteApplicationType;

        service.PostApplicationModule = PostApplicationModule;
        service.DeleteApplicationModule = DeleteApplicationModule;

        return service;

        function GetApplications(callback) {
            getjson.getData(applicationApiUrl)
                .then(function (res) {
                    callback(res.data);
                });
        }

        function GetAllApplicationType(callback) {
            getjson.getData(applicationTypeApiUrl)
                .then(function (res) {
                    callback(res.data);
                });
        }

        function GetAllApplicationModule(callback) {
            getjson.getData(applicationModuleApiUrl)
                .then(function (res) {
                    callback(res.data);
                });
        }

        function PostApplication(application, callback) {
            getjson.postData(applicationApiUrl, application)
                .then(function (res) {
                    callback(res)
                });
        }

        function DeleteApplication(applicationId, callback) {
            getjson.deleteData(applicationApiUrl + "/" + applicationId)
                .then(function (res) {
                    callback(res);
                });
        }

        function PostApplicationType(applicationType, callback) {
            getjson.postData(applicationTypeApiUrl, applicationType)
                .then(function (res) {
                    callback(res);
                });
        }

        function DeleteApplicationType(applicationTypeId, callback) {
            getjson.deleteData(applicationTypeApiUrl + "/" + applicationTypeId)
                .then(function (res) {
                    callback(res);
                });
        }

        function PostApplicationModule(applicationModule, callback) {
            getjson.postData(applicationModuleApiUrl, applicationModule)
                .then(function (res) {
                    callback(res);
                });
        }

        function DeleteApplicationModule(applicationModuleId, callback) {
            getjson.deleteData(applicationModuleApiUrl + "/" + applicationModuleId)
                .then(function (res) {
                    callback(res);
                });
        }
    }

})();
