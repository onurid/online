(function () {
    'use strict';

    angular
        .module('app')
        .controller('MicroserviceModuleController', MicroserviceModuleController);

    MicroserviceModuleController.$inject = ['MicroserviceService', 'ModuleService', 'notification', 'util'];
    function MicroserviceModuleController(MicroserviceService, ModuleService, notification, util) {
        var vm = this;

        vm.allMicroserviceModule = [];

        vm.allModule = [];
        vm.allMicroservice = [];

        vm.microserviceModule = { microserviceId: null, moduleId:null };

        vm.selectedMicroservice = null;
        vm.selectedModule = null;

        vm.submitMicroserviceModule = addMicroserviceModule;
        vm.deleteMicroserviceModule = deleteMicroserviceModule;
        
        initController();

        function initController() {
            loadAllMicroserviceModule();
            loadAllModule();
            loadAllMicroservice();
        }

        function loadAllMicroserviceModule() {
            MicroserviceService.GetAllMicroserviceModule(function (response) {
                    vm.allMicroserviceModule = response;
                });
        }

        function loadAllModule() {
            ModuleService.GetAllModules(function (response) {
                vm.allModule = response;
            });
        }

        function loadAllMicroservice() {
            MicroserviceService.GetMicroservice(function (response) {
                vm.allMicroservice = response;
            });
        }

        function addMicroserviceModule() {
            vm.microserviceModule.microserviceId = vm.selectedMicroservice.id;
            vm.microserviceModule.moduleId = vm.selectedModule.id;
            vm.microserviceModule.microserviceName = vm.selectedMicroservice.microserviceName;
            vm.microserviceModule.moduleName = vm.selectedModule.moduleName;

            MicroserviceService.PostMicroserviceModule(vm.microserviceModule, function (res) {
                if (res.success) {
                    vm.microserviceModule.id = res.data.resultId;
                    vm.allMicroserviceModule.push(vm.microserviceModule);
                    notification.pushSuccessNotify(res.data.message);
                }
            });
        }

        function deleteMicroserviceModule(microserviceModuleId) {
            MicroserviceService.DeleteMicroserviceModule(microserviceModuleId, function (res) {
                if (res.success) {
                    var result = util.arrayRemove(vm.allMicroserviceModule, applicationId);
                    vm.allMicroserviceModule = result;
                    notification.pushSuccessNotify(res.data);
                }
            });
        }
    }

})();