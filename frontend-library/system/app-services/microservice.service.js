(function () {
    'use strict';

    angular
        .module('app')
        .factory('MicroserviceService', MicroserviceService);
    
    var microserviceApiUrl = baseURL + '/api' + adminPath + '/microservice';

    var microserviceModuleApiUrl = baseURL + '/api' + adminPath + '/microservice-module';

    MicroserviceService.$inject = ['getjson'];
    function MicroserviceService(getjson) {
        var service = {};

        service.GetMicroservice = GetMicroservice;
        service.GetAllMicroserviceModule = GetAllMicroserviceModule;

        service.PostMicroservice = PostMicroservice;
        service.DeleteMicroservice = DeleteMicroservice;

        service.PostMicroserviceModule = PostMicroserviceModule;
        service.DeleteMicroserviceModule = DeleteMicroserviceModule;

        return service;

        function GetMicroservice(callback) {
            getjson.getData(microserviceApiUrl)
                .then(function (res) {
                    callback(res.data);
                });
        }

        function GetAllMicroserviceModule(callback) {
            getjson.getData(microserviceModuleApiUrl)
                .then(function (res) {
                    callback(res.data);
                });
        }

        function PostMicroservice(microservice, callback) {
            getjson.postData(microserviceApiUrl, microservice)
                .then(function (res) {
                    callback(res);
                });
        }

        function DeleteMicroservice(microserviceId, callback) {
            getjson.deleteData(microserviceApiUrl + "/" + microserviceId)
                .then(function (res) {
                    callback(res);
                });
        }

        function PostMicroserviceModule(microserviceModule, callback) {
            getjson.postData(microserviceModuleApiUrl, microserviceModule)
                .then(function (res) {
                    callback(res);
                });
        }

        function DeleteMicroserviceModule(microserviceModuleId, callback) {
            getjson.deleteData(microserviceModuleApiUrl + "/" + microserviceModuleId)
                .then(function (res) {
                    callback(res);
                });
        }
    }

})();
