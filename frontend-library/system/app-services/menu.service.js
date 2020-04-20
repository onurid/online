(function () {
    'use strict';

    angular
        .module('app')
        .factory('MenuService', MenuService);
    
    var menuApiUrl = baseURL + '/api' + adminPath + '/menu';
    var menuIconApiUrl = baseURL + '/api' + adminPath + '/menu-icon';
    var menuTypeApiUrl = baseURL + '/api' + adminPath + '/menu-type';
    var menuValueApiUrl = baseURL + '/api' + adminPath + '/menu-value';

    MenuService.$inject = ['getjson'];
    function MenuService(getjson) {
        var service = {};

        service.GetMenus = GetMenus;
        service.GetMenuIcons = GetMenuIcons;
        service.GetMenuTypes = GetMenuTypes;
        service.GetMenuValues = GetMenuValues;

        service.PostMenu = PostMenu;
        service.PostMenuIcon = PostMenuIcon;
        service.PostMenuType = PostMenuType;
        service.PostMenuValue = PostMenuValue;
        
        service.DeleteMenu = DeleteMenu;
        service.DeleteMenuIcon = DeleteMenuIcon;
        service.DeleteMenuType = DeleteMenuType;
        service.DeleteMenuValue = DeleteMenuValue;
        
        return service;

        function GetMenus(callback) {
            getjson.getData(menuApiUrl)
                .then(function (res) {
                    callback(res.data);
                });
        }

        function GetMenuIcons(callback) {
            getjson.getData(menuIconApiUrl)
                .then(function (res) {
                    callback(res.data);
                });
        }

        function GetMenuTypes(callback) {
            getjson.getData(menuTypeApiUrl)
                .then(function (res) {
                    callback(res.data);
                });
        }

        function GetMenuValues(callback) {
            getjson.getData(menuValueApiUrl)
                .then(function (res) {
                    callback(res.data);
                });
        }

        function PostMenu(menu, callback) {
            getjson.postData(menuApiUrl, menu)
                .then(function (res) {
                    callback(res);
                });
        }

        function PostMenuIcon(menuIcon, callback) {
            getjson.postData(menuIconApiUrl, menuIcon)
                .then(function (res) {
                    callback(res);
                });
        }

        function PostMenuType(menuType, callback) {
            getjson.postData(menuTypeApiUrl, menuType)
                .then(function (res) {
                    callback(res);
                });
        }

        function PostMenuValue(menuValue, callback) {
            getjson.postData(menuValueApiUrl, menuValue)
                .then(function (res) {
                    callback(res);
                });
        }

        function DeleteMenu(menuId, callback) {
            getjson.deleteData(menuApiUrl + "/" + menuId)
                .then(function (res) {
                    callback(res);
                });
        }

        function DeleteMenuIcon(menuIconId, callback) {
            getjson.deleteData(menuIconApiUrl + "/" + menuIconId)
                .then(function (res) {
                    callback(res);
                });
        }

        function DeleteMenuType(menuTypeId, callback) {
            getjson.deleteData(menuTypeApiUrl + "/" + menuTypeId)
                .then(function (res) {
                    callback(res);
                });
        }

        function DeleteMenuValue(menuValueId, callback) {
            getjson.deleteData(menuValueApiUrl + "/" + menuValueId)
                .then(function (res) {
                    callback(res);
                });
        }
    }

})();
