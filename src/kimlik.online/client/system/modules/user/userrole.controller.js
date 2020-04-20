(function () {
    'use strict';

    angular
        .module('app')
        .controller('UserRoleController', UserRoleController);

    UserRoleController.$inject = ['UserService', 'CompanyService', 'RoleService', 'notification', 'util'];
    function UserRoleController(UserService, CompanyService, RoleService, notification, util) {
        var vm = this;

        vm.userRole = { userId: null, applicationId: null, roleId:null };

        vm.allUserRole = [];

        vm.allUser = [];
        vm.allCompanyApplication = [];
        vm.allRole = [];

        vm.selectedUser = null;
        vm.selectedApplication = null;
        vm.selectedRole = null;

        vm.submitUserRole = addUserRole;
        vm.deleteUserRole = deleteUserRole;
        vm.loadAllRole = loadAllRole;
        
        initController();

        function initController() {
            loadAllUserRole();
            loadAllUser();
            loadAllCompanyApplication();
        }

        function loadAllUserRole() {
            UserService.GetUserRole(function (response) {
                        vm.allUserRole = response;
                });
        }

        function loadAllUser() {
            UserService.GetUsers(function (response) {
                vm.allUser = response;
            });
        }

        function loadAllCompanyApplication() {
            CompanyService.GetCompanyApplications(function (response) {
                vm.allCompanyApplication = response;
            });
        }

        function loadAllRole() {
            var applicationId = vm.selectedApplication.id;
            RoleService.GetRolesByApplication(applicationId, function (response) {
                vm.allRole = response;
            });
        }

        function addUserRole() {
            vm.userRole.userId = vm.selectedUser.id;
            vm.userRole.roleId = vm.selectedRole.id;
            vm.userRole.applicationId = vm.selectedApplication.id;

            vm.userRole.username = vm.selectedUser.username;
            vm.userRole.roleName = vm.selectedRole.roleName;
            vm.userRole.applicationTagName = vm.selectedApplication.applicationTagName;

            UserService.PostUserRole(vm.userRole, function (res) {
                if (res.success) {
                    vm.userRole.id = res.data.resultId;
                    vm.allUserRole.push(vm.userRole);
                    notification.pushSuccessNotify(res.data.message);
                }
            });
        }

        function deleteUserRole(userRoleId) {
            UserService.DeleteUserRole(userRoleId, function (res) {
                if (res.success) {
                    var result = util.arrayRemove(vm.allUserRole, userRoleId);
                    vm.allUserRole = result;
                    notification.pushSuccessNotify(res.data);
                }
            });
        }
    }

})();