(function () {
    'use strict';

    angular
        .module('app')
        .controller('UserController', UserController);

    UserController.$inject = ['UserService', 'notification', 'util'];
    function UserController(UserService, notification, util) {
        var vm = this;

        vm.user = null;

        vm.allUser = [];
        vm.submitUser = addUser;
        vm.deleteUser = deleteUser;
        vm.getEditUser = getEditUser;
        vm.postEditUser = postEditUser;
        
        initController();

        function initController() {
            loadAllUsers();
        }

        function loadAllUsers() {
            UserService.GetUsers(function (response) {
                        vm.allUser = response;
                });
        }

        function addUser() {
            UserService.PostUser(vm.user, function (res) {
                if (res.success) {
                    vm.user.id = res.data.resultId;
                    vm.allUser.push(vm.user);
                    notification.pushSuccessNotify(res.data.message);
                }
            });
        }

        function getEditUser(userId) {
            vm.user = null;
            UserService.GetUser(userId, function (res) {
                if (res.success) {
                    console.log(res.data);
                    vm.user.email = res.data.email;
                    vm.user.userName = res.data.userName;
                    vm.user.firstName = res.data.firstName;
                    vm.user.lastName = res.data.lastName;
                    vm.user.passwd = res.data.passwd;
                    vm.user.active = res.data.active;


                    angular.element('#btnAdd').attr("disabled", "disabled");
                    angular.element('#btnAdd').attr("hidden", "true");
                    angular.element('#btnEdit').removeAttr("disabled");
                    angular.element('#btnEdit').removeAttr("hidden");
                }                
            });
        }

        function postEditUser() {
            UserService.PutUser(vm.user, function (res) {
                if (res.success) {
                    vm.user.id = res.data.resultId;
                    var result = util.arrayRemove(vm.allUser, userId);
                    vm.allUser = result;
                    notification.pushSuccessNotify(res.data.message);

                    angular.element('#btnAdd').removeAttr("disabled");
                    angular.element('#btnAdd').removeAttr("hidden");
                    angular.element('#btnEdit').attr("disabled", "disabled");
                    angular.element('#btnEdit').attr("hidden", "true");
                }
            });
        }

        function deleteUser(userId) {
     
            $.confirm({
                text: 'Silmek istediğine emin misin?', buttons: {
                    'Ok': {
                        text: "Evet",
                        keys: ['enter'],
                        action: function () {
                            UserService.DeleteUser(userId, function (res) {
                                if (res.success) {
                                    var result = util.arrayRemove(vm.allUser, userId);
                                    vm.allUser = result;
                                    notification.pushSuccessNotify(res.data);
                                }
                            });
                        }
                    },
                    'Cancel': {
                        text: "İptal",
                        keys: ['esc'],
                        action: function () {
                            this.close();
                        }
                    }
                }
            }); 
            
        }
    }

})();