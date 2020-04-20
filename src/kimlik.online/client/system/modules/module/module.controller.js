(function () {
    'use strict';

    angular
        .module('app')
        .controller('ModuleController', ModuleController);

    ModuleController.$inject = ['ModuleService', 'notification', 'util'];
    function ModuleController(ModuleService, notification, util) {
        var vm = this;

        vm.allModule = [];

        vm.module = null;

        vm.submitModule = addModule;
        vm.deleteModule = deleteModule;
        
        initController();

        function initController() {
            loadAllModule();
        }

        function loadAllModule() {
            ModuleService.GetAllModules(function (response) {
                        vm.allModule = response;
                });
        }

        function addModule() {
            ModuleService.PostModule(vm.module, function (res) {
                if (res.success) {
                    vm.module.id = res.data.resultId;
                    vm.allModule.push(vm.module);
                    notification.pushSuccessNotify(res.data.message);
                }
            });
        }

        function deleteModule(moduleId) {
            ModuleService.DeleteModule(moduleId, function (res) {
                if (res.success) {
                    var result = util.arrayRemove(vm.allModule, moduleId);
                    vm.allModule = result;
                    notification.pushSuccessNotify(res.data);
                }
            });
        }
    }

})();