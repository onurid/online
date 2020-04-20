(function () {
    'use strict';

    angular
        .module('app')
        .factory('CommandService', CommandService);

    var kernelPath = "/kernel";

    var commandApiUrl = baseURL + '/api' + adminPath + '/command';

    CommandService.$inject = ['getjson'];
    function CommandService(getjson) {
        var service = {};

        service.GetAllCommand = GetAllCommand;

        service.PostCommand = PostCommand;
        service.DeleteCommand = DeleteCommand;

        return service;

        function GetAllCommand(callback) {
            getjson.getData(commandApiUrl)
                .then(function (res) {
                    callback(res.data);
                });
        }

        function PostCommand(command, callback) {
            getjson.postData(commandApiUrl, command)
                .then(function (res) {
                    callback(res);
                });
        }

        function DeleteCommand(commandId, callback) {
            getjson.deleteData(commandApiUrl + "/" + commandId)
                .then(function (res) {
                    callback(res);
                });
        }
    }

})();
