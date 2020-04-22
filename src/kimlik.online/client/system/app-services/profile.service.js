(function () {
    'use strict';

    angular
        .module('app')
        .factory('ProfileService', ProfileService);
    
    var updateUrl = baseURL + '/api' + authPath + '/update';
    var getUrl = baseURL + '/api/me';
    var logoutApiUrl = baseURL + '/api' + authPath + '/logout';

    ProfileService.$inject = ['getjson', 'notification'];
    function ProfileService(getjson, notification) {
        var service = {};
        
        service.Get = Get;
        service.Put = Put;

        service.Zoe = Zoe;
        service.Logout = Logout;

        return service;

        function Put(user) {
            getjson.putData(updateUrl, user).then(function (res) {
                if (res.status)
                    notification.pushSuccessNotify(res.message);
            });
        }

        function Zoe(zoe) {
            var data = new { password = zoe.currentPasswd + "#change-password#" + zoe.passwd };
            getjson.putData(updateUrl, data).then(function (res) {
                if (res.status)
                    notification.pushSuccessNotify(res.message);
            });
        }

        function Get(callback) {
            getjson.getData(getUrl).then(function (res) {
                if (res.status)
                    callback(res.account);
            });            
        }

        function Logout() {
            getjson.getData(logoutApiUrl).then(function (res) {
                if (res.status)
                    notification.pushInfoNotify(res.message, true);
            });
        }
    }

})();
