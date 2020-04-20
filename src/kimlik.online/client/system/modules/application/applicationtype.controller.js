(function () {
    'use strict';

    angular
        .module('app')
        .controller('ApplicationTypeController', ApplicationTypeController);

    ApplicationTypeController.$inject = ['ApplicationService', 'notification', 'util'];
    function ApplicationTypeController(ApplicationService, notification, util) {
        var vm = this;

        vm.applicationType = null;

        vm.allApplicationType = [];

        vm.submitApplicationType = addApplicationType;
        vm.deleteApplicationType = deleteApplicationType;

        initController();

        function initController() {
            loadAllApplicationType();
        }

        function loadAllApplicationType() {
            ApplicationService.GetAllApplicationType(function (response) {
                        vm.allApplicationType = response
                });
        }

        function addApplicationType() {
            ApplicationService.PostApplicationType(vm.applicationType, function (res) {
                if (res.success) {
                    vm.applicationType.id = res.data.resultId;
                    vm.allApplicationType.push(vm.applicationType);
                    notification.pushSuccessNotify(res.data.message);
                }
            });
        }

        function deleteApplicationType(applicationTypeId) {
            ApplicationService.DeleteApplicationType(applicationTypeId, function (res) {
                if (res.success) {
                    var result = util.arrayRemove(vm.allApplicationType, applicationTypeId);
                    vm.allApplicationType = result;
                    notification.pushSuccessNotify(res.data);
                }
            });
        }
    }

})();