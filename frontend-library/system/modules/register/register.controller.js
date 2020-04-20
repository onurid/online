(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['AuthenticationService', '$location', 'FlashService'];
    function RegisterController(AuthenticationService, $location, FlashService) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            AuthenticationService.CreateAccount(vm.user.username, vm.user.password, function (response) {
                    if (response.success) {
                        FlashService.Success('Kayıt başarılı', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;
                    }
                    vm.dataLoading = false;
                });
        }
    }

})();
