(function () {
    'use strict';

    angular
        .module('app')
        .factory('PageService', PageService);
    
    var pageApiUrl = baseURL + '/api' + adminPath + '/page';

    PageService.$inject = ['getjson'];
    function PageService(getjson) {
        var service = {};

        service.GetPages = GetPages;

        service.PostPage = PostPage;
        service.DeletePage = DeletePage;

        return service;

        function GetPages(callback) {
            getjson.getData(pageApiUrl)
                .then(function (res) {
                    callback(res.data);
                });
        }

        function PostPage(page, callback) {
            getjson.postData(pageApiUrl, page)
                .then(function (res) {
                    callback(res);
                });
        }

        function DeletePage(pageId, callback) {
            getjson.deleteData(pageApiUrl + "/" + pageId)
                .then(function (res) {
                    callback(res);
                });
        }
    }

})();
