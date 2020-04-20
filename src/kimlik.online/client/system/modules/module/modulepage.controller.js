(function () {
    'use strict';

    angular
        .module('app')
        .controller('ModulePageController', ModulePageController);

    ModulePageController.$inject = ['ModuleService', 'ApplicationService', 'PageService', 'notification', 'util'];
    function ModulePageController(ModuleService, ApplicationService, PageService, notification, util) {
        var vm = this;

        vm.allModuleRoute = [];
        vm.allApplicationModule = [];
        vm.allPage = [];

        vm.modulePage = { applicationModuleId:null, pageId:null };

        vm.selectedApplicationModule = null;
        vm.selectedPage = null;

        vm.submitModulePage = addModulePage;
        vm.deleteModulePage = deleteModulePage;
        
        initController();

        function initController() {
            loadAllModuleRoute();
            loadAllApplicationModule();
            loadAllPage();
        }

        function loadAllModuleRoute() {
            ModuleService.GetModuleRoutes(function (response) {
                        vm.allModuleRoute = response;
                });
        }

        function loadAllApplicationModule() {
            ApplicationService.GetAllApplicationModule(function (response) {
                vm.allApplicationModule = response;
            });
        }

        function loadAllPage() {
            PageService.GetPages(function (response) {
                vm.allPage = response;
            });
        }

        function addModulePage() {
            vm.modulePage.applicationModuleId = vm.selectedApplicationModule.id;
            vm.modulePage.pageId = vm.selectedPage.id;
            vm.applicationModuleName = vm.selectedApplicationModule.applicationModuleName;
            vm.routeName = vm.selectedPage.routeName;
            
            ModuleService.PostModulePage(vm.modulePage, function (res) {
                if (res.success) {
                    vm.modulePage.id = res.data.resultId;
                    vm.allModuleRoute.push(vm.modulePage);
                    notification.pushSuccessNotify(res.data.message);
                }
            });
        }

        function deleteModulePage(modulePageId) {
            ModuleService.DeleteModulePage(modulePageId, function (res) {
                if (res.success) {
                    var result = util.arrayRemove(vm.allModuleRoute, modulePageId);
                    vm.allModuleRoute = result;
                    notification.pushSuccessNotify(res.data);
                }
            });
        }
    }

})();