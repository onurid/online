(function () {
    'use strict';

    angular
        .module('app')
        .factory('LanguageService', LanguageService);
    
    var LanguageApiUrl = baseURL + '/api' + adminPath + '/language';

    LanguageService.$inject = ['getjson'];
    function LanguageService(getjson) {
        var service = {};

        service.GetAllLanguage = GetAllLanguage;

        service.PostLanguage = PostLanguage;
        service.DeleteLanguage = DeleteLanguage;

        return service;

        function GetAllLanguage(callback) {
            getjson.getData(LanguageApiUrl)
                .then(function (res) {
                    callback(res.data);
                });
        }

        function PostLanguage(Language, callback) {
            getjson.postData(LanguageApiUrl, Language)
                .then(function (res) {
                    callback(res);
                });
        }

        function DeleteLanguage(LanguageId, callback) {
            getjson.deleteData(LanguageApiUrl + "/" + LanguageId)
                .then(function (res) {
                    callback(res);
                });
        }
    }

})();
