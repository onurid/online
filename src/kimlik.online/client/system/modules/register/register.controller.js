(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['AuthenticationService', '$location'];
    function RegisterController(AuthenticationService, $location) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            AuthenticationService.Create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        //FlashService.Success('Registration successful', true);
                        alert("Kayıt başarılı");
                        $location.path('/login');
                    } else {
                        //FlashService.Error(response.message);
                        alert(response.message)
                        vm.dataLoading = false;
                    }
                });
        }
    }

})();
