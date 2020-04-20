(function () {
    'use strict';

    angular
        .module('app')
        .factory('TemplateService', TemplateService);
    
    var TemplateApiUrl = baseURL + '/api' + adminPath + '/template';

    TemplateService.$inject = ['getjson'];
    function TemplateService(getjson) {
        var service = {};

        service.GetAllTemplate = GetAllTemplate;

        service.PostTemplate = PostTemplate;
        service.DeleteTemplate = DeleteTemplate;

        return service;

        function GetAllTemplate(callback) {
            getjson.getData(TemplateApiUrl)
                .then(function (res) {
                    callback(res.data);
                });
        }

        function PostTemplate(Template, callback) {
            getjson.postData(TemplateApiUrl, Template)
                .then(function (res) {
                    callback(res);
                });
        }

        function DeleteTemplate(TemplateId, callback) {
            getjson.deleteData(TemplateApiUrl + "/" + TemplateId)
                .then(function (res) {
                    callback(res);
                });
        }
    }

})();
