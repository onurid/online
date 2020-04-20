(function () {
    'use strict';

    angular
        .module('app')
        .factory('BusinessLogicService', BusinessLogicService);
    
    var businessLogicApiUrl = baseURL + '/api' + adminPath + '/business-logic';
    var businessServiceApiUrl = baseURL + '/api' + adminPath + '/business-service';

    BusinessLogicService.$inject = ['getjson'];
    function BusinessLogicService(getjson) {
        var service = {};

        service.GetAllBusinessLogic = GetAllBusinessLogic;
        service.GetAllBusinessService = GetAllBusinessService;

        service.PostBusinessLogic = PostBusinessLogic;
        service.DeleteBusinessLogic = DeleteBusinessLogic;

        return service;

        function GetAllBusinessLogic(callback) {
            getjson.getData(businessLogicApiUrl)
                .then(function (res) {
                    callback(res.data);
                });
        }

	function GetAllBusinessService(callback) {
            getjson.getData(businessServiceApiUrl)
                .then(function (res) {
                    callback(res.data);
                });
        }

        function PostBusinessLogic(businessLogic, callback) {
            getjson.postData(businessLogicApiUrl, businessLogic)
                .then(function (res) {
                    callback(res);
                });
        }

        function DeleteBusinessLogic(businessLogicId, callback) {
            getjson.deleteData(businessLogicApiUrl + "/" + businessLogicId)
                .then(function (res) {
                    callback(res);
                });
        }
    }

})();
