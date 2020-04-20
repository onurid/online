(function () {
    'use strict';

    angular
        .module('app')
        .controller('RolePageController', RolePageController);

    RolePageController.$inject = ['RoleService', 'CommandService', 'notification', 'util'];
    function RolePageController(RoleService, CommandService, notification, util) {
        var vm = this;

        vm.allRolePage = [];
        vm.allRole = [];
        vm.allCommand = [];

        vm.RolePage = { roleId: null, commandId: null };

        vm.selectedRole = null;
        vm.selectedCommand = null;

        vm.submitRolePage = addRolePage;
        vm.deleteRolePage = deleteRolePage;
        
        initController();

        function initController() {
            loadAllRolePage();
            loadAllRole();
            loadAllCommand();
        }

        function loadAllRolePage() {
            RoleService.GetRolePages(function (response) {
                        vm.allRolePage = response;
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

        function addRolePage() {
            vm.RolePage.roleId = vm.selectedRole.id;
            vm.RolePage.commandId = vm.selectedCommand.id;
            vm.RolePage.roleName = vm.selectedRole.roleName;
            vm.RolePage.commandName = vm.selectedCommand.commandName;

            RoleService.PostRolePage(vm.RolePage, function (res) {
                if (res.success) {
                    vm.RolePage.id = res.data.resultId;
                    vm.allRolePage.push(vm.RolePage);
                    notification.pushSuccessNotify(res.data.message);
                }
            });
        }

        function deleteRolePage(RolePageId) {
            RoleService.DeleteRolePage(RolePageId, function (res) {
                if (res.success) {
                    var result = util.arrayRemove(vm.allRolePage, RolePageId);
                    vm.allRolePage = result;
                    notification.pushSuccessNotify(res.data);
                }
            });
        }
    }

})();
