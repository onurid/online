(function () {
    'use strict';

    angular
        .module('app')
        .controller('MenuIconController', MenuIconController);

    MenuIconController.$inject = ['MenuService', 'notification', 'util'];
    function MenuIconController(MenuService, notification, util) {
        var vm = this;

        vm.allMenuIcon = [];

        vm.menuIcon = null;

        vm.submitMenuIcon = addMenuIcon;
        vm.deleteMenuIcon = deleteMenuIcon;
        
        initController();

        function initController() {
            loadAllMenuIcon();
        }

        function loadAllMenuIcon() {
            MenuService.GetMenuIcons(function (response) {
                        vm.allMenuIcon = response;
                });
        }

        function addMenuIcon() {
            MenuService.PostMenuIcon(vm.menuIcon, function (res) {
                if (res.success) {
                    vm.menuIcon.id = res.data.resultId;
                    vm.allMenuIcon.push(vm.menuIcon);
                    notification.pushSuccessNotify(res.data);
                }
            });
        }

        function deleteMenuIcon(menuIconId) {
            MenuService.DeleteMenuIcon(menuIconId, function (res) {
                if (res.success) {
                    var result = util.arrayRemove(vm.allMenIcon, menuIconId);
                    vm.allMenuIcon  = result;
                    notification.pushSuccessNotify(res.data);
                }
            });
        }
    }

})();
