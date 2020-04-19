(function () {
    'use strict';

    angular
        .module('app')
        .controller('AccountController', AccountController);

    AccountController.$inject = ['ProfileService'];
    function AccountController(ProfileService) {
        var vm = this;

        vm.user = null;
        vm.zoe = null;
        
        vm.submitProfile = updateUser;
        vm.submitZOE = changePassword;

        initController();

        function initController() {
            loadCurrentUser();
        } 

        function loadCurrentUser() {
            ProfileService.Get(function (response) {
                    vm.user = response
            });
        }

        function changePassword() {
            ProfileService.Zoe(vm.zoe);
        }

        function updateUser() {
            ProfileService.Put(vm.user);
        }
    }

})();