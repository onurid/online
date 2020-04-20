(function () {
    'use strict';

    angular
        .module('app')
        .controller('RoleController', RoleController);

    RoleController.$inject = ['RoleService', 'ApplicationService', 'notification', 'util'];
    function RoleController(RoleService, ApplicationService, notification, util) {
        var vm = this;

        vm.allRole = [];
        vm.allApplication = [];
        
        vm.role = null;
        vm.selectedApplication = null;

        vm.submitRole = addRole;
        vm.deleteRole = deleteRole;
        
        initController();

        function initController() {
            loadAllRole();
            loadAllApplication();
        }

        function loadAllRole() {
            RoleService.GetRoles(function (response) {
                        vm.allRole = response;                
                });
        }

        function loadAllApplication() {
            ApplicationService.GetApplications(function (response) {
                vm.allApplication = response;
            });
        }

        function addRole() {
            vm.role.applicationId = vm.selectedApplication.id;
            vm.role.applicationName = vm.selectedApplication.applicationName;

            RoleService.PostRole(vm.role, function (res) {
                if (res.success) {
                    vm.role.id = res.data.resultId;
                    vm.allRole.push(vm.role);
                    notification.pushSuccessNotify(res.data.message);
                }
            });
        }

        function deleteRole(roleId) {
            RoleService.DeleteRole(roleId, function (res) {
                if (res.success) {
                    var result = util.arrayRemove(vm.allRole, roleId);
                    vm.allRole = result;
                    notification.pushSuccessNotify(res.data);
                }
            });
        }
    }

})();