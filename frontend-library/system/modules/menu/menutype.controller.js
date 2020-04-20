(function () {
    'use strict';

    angular
        .module('app')
        .controller('MenuTypeController', MenuTypeController);

    MenuTypeController.$inject = ['MenuService', 'notification', 'util'];
    function MenuTypeController(MenuService, notification, util) {
        var vm = this;

        vm.allMenuType = [];

        vm.menuType = null;

        vm.submitMenuType = addMenuType;
        vm.deleteMenuType = deleteMenuType;
        
        initController();
        
        function initController() {
            loadAllMenuType();
        }

        function loadAllMenuType() {
            MenuService.GetMenuTypes(function (response) {
                        vm.allMenuType = response;
                });
        }

        function addMenuType() {
            MenuService.PostMenuType(vm.menuType, function (res) {
                if (res.success) {
                    vm.menuType.id = res.data.resultId;
                    vm.allMenuType.push(vm.menuType);
                    notification.pushSuccessNotify(res.data);
                }
            });
        }

        function deleteMenuType(menuTypeId) {
            MenuService.DeleteMenuType(menuTypeId, function (res) {
                if (res.success) {
                    var result = util.arrayRemove(vm.allMenuType, menuTypeId);
                    vm.allMenuType  = result;
                    notification.pushSuccessNotify(res.data);
                }
            });
        }
    }

})();
