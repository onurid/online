(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['AuthenticationService'];
    function LoginController(AuthenticationService) {
        var vm = this;

        vm.login = login;
        vm.returnParam = null;

        (function initController() {
            // reset login status

            var urlParams = new URLSearchParams(window.location.search);
            vm.returnParam = urlParams.get('return');
            
        })();
        
        function login() {
            vm.dataLoading = true;

            if (vm.returnParam != null)
            {				
                AuthenticationService.ExternalLogin(vm.username, vm.password, function (response) {
                    if (response.hasOwnProperty("account"))
                    {
                        window.location.href = vm.returnParam + response.account.token;
                    }
                });   
            }

            vm.dataLoading = false;
        };
    }

})();
