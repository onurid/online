(function () {
    'use strict';

    angular
        .module('app')
        .factory('ModuleService', ModuleService);

    var moduleApiUrl = baseURL + '/api' + adminPath + '/module';

    var modulePageApiUrl = baseURL + '/api' + adminPath + '/module-page';

    ModuleService.$inject = ['getjson'];
    function ModuleService(getjson) {
        var service = {};

        service.GetAllModules = GetAllModules;
        service.GetModuleRoutes = GetModuleRoutes;

        service.PostModule = PostModule;
        service.DeleteModule = DeleteModule;

        service.PostModulePage = PostModulePage;
        service.DeleteModulePage = DeleteModulePage;

        return service;

        function GetAllModules(callback) {
            getjson.getData(moduleApiUrl)
                .then(function (res) {
                    callback(res.data);
                });
        }

        function GetModuleRoutes(callback) {
            getjson.getData(modulePageApiUrl)
                .then(function (res) {
                    callback(res.data);
                });
        }

        function PostModule(module, callback) {
            getjson.postData(moduleApiUrl, module)
                .then(function (res) {
                    callback(res);
                });
        }

        function DeleteModule(moduleId, callback) {
            getjson.deleteData(moduleApiUrl + "/" + moduleId)
                .then(function (res) {
                    callback(res);
                });
        }

        function PostModulePage(modulePage, callback) {
            getjson.postData(modulePageApiUrl, modulePage)
                .then(function (res) {
                    callback(res);
                });
        }

        function DeleteModulePage(modulePageId, callback) {
            getjson.deleteData(modulePageApiUrl + "/" + modulePageId)
                .then(function (res) {
                    callback(res);
                });
        }
    }

})();
