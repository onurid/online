(function () {
    'use strict';

    angular
        .module('app')
        .controller('MenuValueController', MenuValueController);

    MenuValueController.$inject = ['MenuService', 'notification', 'util'];
    function MenuValueController(MenuService, notification, util) {
        var vm = this;

        vm.allMenuValue = [];

        vm.menuValue = null;

        vm.submitMenuValue = addMenuValue;
        vm.deleteMenuValue = deleteMenuValue;
        
        initController();

        function initController() {
            loadAllMenuValue();
        }

        function loadAllMenuValue() {
            MenuService.GetMenuValues(function (response) {
                        vm.allMenuValue = response;
                });
        }

        function addMenuValue() {
            MenuService.PostMenuValue(vm.menuValue, function (res) {
                if (res.success) {
                    vm.menuValue.id = res.data.resultId;
                    vm.allMenuValue.push(vm.menuValue);
                    notification.pushSuccessNotify(res.data);
                }
            });
        }

        function deleteMenuValue(menuValueId) {
            MenuService.DeleteMenuValue(menuValueId, function (res) {
                if (res.success) {
                    var result = util.arrayRemove(vm.allMenuValue, menuValueId);
                    vm.allMenuValue  = result;
                    notification.pushSuccessNotify(res.data);
                }
            });
        }
    }

})();
