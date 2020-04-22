(function () {
    'use strict';

    angular
        .module('app')
        .factory('ProfileService', ProfileService);
    
    var updateUrl = baseURL + '/api' + authPath + '/update';
    var getUrl = baseURL + '/api' + authPath + '/me';
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
            if (zoe.newPassword != zoe.reNewPassword) {
                notification.pushWarningNotify("Yeni şifreler uyuşmamaktadır");
                return;
            }
            var newPassword = zoe.currentPassword + "#change-password#" + zoe.newPassword;
            var data = { password : newPassword };
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
