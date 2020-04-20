(function () {
    'use strict';

    angular
        .module('app')
        .controller('ApplicationController', ApplicationController);

    ApplicationController.$inject = ['ApplicationService', 'notification', 'util'];
    function ApplicationController(ApplicationService, notification, util) {
        var vm = this;

        vm.application = null;

        vm.selectedApplicationType = null;

        vm.allApplication = [];
        vm.allApplicationType = [];

        vm.submitApplication = addApplication;
        vm.deleteApplication = deleteApplication;

        initController();

        function initController() {
            loadAllApplication();
            loadAllApplicationType();
        }

        function loadAllApplication() {
            ApplicationService.GetApplications(function (response) {
                        vm.allApplication = response;
                });
        }

        function loadAllApplicationType() {
            ApplicationService.GetAllApplicationType(function (response) {
                vm.allApplicationType = response;
            });
        }
        
        function addApplication() {
            vm.application.applicationTypeId = vm.selectedApplicationType.id;
            vm.application.applicationTypeName = vm.selectedApplicationType.applicationTypeName;

            ApplicationService.PostApplication(vm.application, function (res) {
                if (res.success) {
                    vm.application.id = res.data.resultId;
                    vm.allApplication.push(vm.application);
                    notification.pushSuccessNotify(res.data.message);
                }
            });
        }

        function deleteApplication(applicationId) {
            ApplicationService.DeleteApplication(applicationId, function (res) {
                if (res.success) {
                    var result = util.arrayRemove(vm.allApplication, applicationId);
                    vm.allApplication = result;
                    notification.pushSuccessNotify(res.data);
                }
            });
        }
    }

})();