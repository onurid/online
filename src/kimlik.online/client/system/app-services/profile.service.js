(function () {
    'use strict';

    angular
        .module('app')
        .factory('ProfileService', ProfileService);
    
    var profileApiUrl = baseURL + '/api' + authPath + '/myprofile';
    var zoeApiUrl = baseURL + '/api' + authPath + '/zoe';
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
            getjson.putData(profileApiUrl, user).then(function (res) {
                if (res.success)
                    notification.pushSuccessNotify(res.data);
            });
        }

        function Zoe(zoe) {
            getjson.putData(zoeApiUrl, zoe).then(function (res) {
                if (res.success)
                    notification.pushSuccessNotify(res.data);
            });
        }

        function Get(callback) {
            getjson.getData(profileApiUrl).then(function (res) {
                callback(res.data);
            });            
        }

        function Logout() {
            notification.pushInfoNotify('Çıkış yaptınız', true);
            //getjson.getData(logoutApiUrl).then(function (res) {
            //    if (res.success)
            //        notification.pushInfoNotify(res.data, true);
            //});
        }
    }

})();
