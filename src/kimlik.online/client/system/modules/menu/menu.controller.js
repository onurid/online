(function () {
    'use strict';

    angular
        .module('app')
        .controller('MenuController', MenuController);

    MenuController.$inject = ['MenuService', 'notification', 'util'];
    function MenuController(MenuService, notification, util) {
        var vm = this;

        vm.allMenu = [];

        vm.menu = null;

        vm.submitMenu = addMenu;
        vm.deleteMenu = deleteMenu;
        
        initController();

        function initController() {
            loadAllMenu();
        }

        function loadAllMenu() {
            MenuService.GetMenus(function (response) {
                        vm.allMenu = response;
                });
        }

        function addMenu() {
            MenuService.PostMenu(vm.Menu, function (res) {
                if (res.success) {
                    vm.menu.id = res.data.resultId;
                    vm.allMenu.push(vm.menu);
                    notification.pushSuccessNotify(res.data);
                }
            });
        }

        function deleteMenu(menuId) {
            MenuService.DeleteMenu(menuId, function (res) {
                if (res.success) {
                    var result = util.arrayRemove(vm.allMenu, menuId);
                    vm.allMenu  = result;
                    notification.pushSuccessNotify(res.data);
                }
            });
        }
    }

})();
