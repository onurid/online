(function () {
    'use strict';

    angular
        .module('app')
        .controller('ApplicationModuleController', ApplicationModuleController);

    ApplicationModuleController.$inject = ['ApplicationService', 'ModuleService', 'BusinessLogicService', 'notification', 'util'];
    function ApplicationModuleController(ApplicationService, ModuleService, BusinessLogicService, notification, util) {
        var vm = this;

        vm.applicationModule = { applicationId: null, moduleId: null, businessLogicId: null };

        vm.allApplicationModule = [];

        vm.allApplication = [];
        vm.allModule = [];
        vm.allBusinessLogic = [];

        vm.selectedApplication = null;
        vm.selectedModule = null;
        vm.selectedBusinessLogic = null;

        vm.submitApplicationModule = addApplicationModule;
        vm.deleteApplicationModule = deleteApplicationModule;

        initController();

        function initController() {
            loadAllApplicationModule();
            loadAllApplication();
            loadAllModule();
            loadAllBusinessLogic();
        }

        function loadAllApplicationModule() {
            ApplicationService.GetAllApplicationModule(function (response) {
                        vm.allApplicationModule = response
                });
        }

        function loadAllApplication() {
            ApplicationService.GetApplications(function (response) {
                vm.allApplication = response
            });
        }

        function loadAllModule() {
            ModuleService.GetAllModules(function (response) {
                vm.allModule = response
            });
        }

        function loadAllBusinessLogic() {
            BusinessLogicService.GetAllBusinessLogic(function (response) {
                vm.allBusinessLogic = response
            });
        }

        function addApplicationModule() {
            vm.applicationModule.applicationId = vm.selectedApplication.id;
            vm.applicationModule.moduleId = vm.selectedModule.id;
            vm.applicationModule.businessLogicId = vm.selectedBusinessLogic.id;

            vm.applicationModule.applicationName = vm.selectedApplication.applicationName;
            vm.applicationModule.moduleName = vm.selectedModule.moduleName;
            vm.applicationModule.businessLogicName = vm.selectedBusinessLogic.businessLogicName;

            ApplicationService.PostApplicationModule(vm.applicationModule, function (res) {
                if (res.success) {
                    vm.applicationModule.id = res.data.resultId;
                    vm.allApplicationModule.push(vm.applicationModule);
                    notification.pushSuccessNotify(res.data.message);
                }
            });
        }

        function deleteApplicationModule(applicationModuleId) {
            ApplicationService.DeleteApplicationModule(applicationModuleId, function (res) {
                if (res.success) {
                    var result = util.arrayRemove(vm.allApplicationModule, applicationModuleId);
                    vm.allApplicationModule = result;
                    notification.pushSuccessNotify(res.data);
                }
            });
        }
    }

})();