(function () {
    'use strict';

    angular
        .module('app')
        .controller('RoleAuthoriseController', RoleAuthoriseController);

    RoleAuthoriseController.$inject = ['RoleService', 'CommandService', 'notification', 'util'];
    function RoleAuthoriseController(RoleService, CommandService, notification, util) {
        var vm = this;

        vm.allRoleAuthorise = [];
        vm.allRole = [];
        vm.allCommand = [];

        vm.roleAuthorise = { roleId: null, commandId: null };

        vm.selectedRole = null;
        vm.selectedCommand = null;

        vm.submitRoleAuthorise = addRoleAuthorise;
        vm.deleteRoleAuthorise = deleteRoleAuthorise;
        
        initController();

        function initController() {
            loadAllRoleAuthorise();
            loadAllRole();
            loadAllCommand();
        }

        function loadAllRoleAuthorise() {
            RoleService.GetRoleAuthorises(function (response) {
                        vm.allRoleAuthorise = response;
                });
        }

        function loadAllRole() {
            RoleService.GetRoles(function (response) {
                vm.allRole = response;
            });
        }

        function loadAllCommand() {
            CommandService.GetAllCommand(function (response) {
                vm.allCommand = response;
            });
        }

        function addRoleAuthorise() {
            vm.roleAuthorise.roleId = vm.selectedRole.id;
            vm.roleAuthorise.commandId = vm.selectedCommand.id;
            vm.roleAuthorise.roleName = vm.selectedRole.roleName;
            vm.roleAuthorise.commandName = vm.selectedCommand.commandName;

            RoleService.PostRoleAuthorise(vm.roleAuthorise, function (res) {
                if (res.success) {
                    vm.roleAuthorise.id = res.data.resultId;
                    vm.allRoleAuthorise.push(vm.roleAuthorise);
                    notification.pushSuccessNotify(res.data.message);
                }
            });
        }

        function deleteRoleAuthorise(roleAuthoriseId) {
            RoleService.DeleteRoleAuthorise(roleAuthoriseId, function (res) {
                if (res.success) {
                    var result = util.arrayRemove(vm.allRoleAuthorise, roleAuthoriseId);
                    vm.allRoleAuthorise = result;
                    notification.pushSuccessNotify(res.data);
                }
            });
        }
    }

})();