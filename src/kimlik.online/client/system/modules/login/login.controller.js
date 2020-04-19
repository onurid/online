(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['AuthenticationService', 'FlashService'];
    function LoginController(AuthenticationService, FlashService) {
        var vm = this;

        vm.login = login;
        vm.returnParam = null;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();

            var urlParams = new URLSearchParams(window.location.search);
            vm.returnParam = urlParams.get('return');
            
        })();
        
        function login() {
            vm.dataLoading = true;

            if (vm.returnParam != null) {	
                			
                AuthenticationService.ExternalLogin(vm.username, vm.password, function (response) {
                    if (response.status) {
                        if (response.hasOwnProperty("account"))
                        {
                            window.location.href = vm.returnParam + response.account.token;
                        }
                    } else {
                        // hata ?? 
                        FlashService.Error(response.message, $location);
                    }
                });  
                vm.dataLoading = false; 
            } 
            else {

            AuthenticationService.InternalLogin(vm.username, vm.password, function (response) {
                if (response.status) {
                    FlashService.WriteLocal(true, response.message);
                    var template = window.localStorage.getItem("template");
                    window.location.href = '../../templates/' + template + '/index.html';  //$location.path('/load');
                } else {
                    FlashService.Error(response.message, '/');
                    vm.dataLoading = false;
                }
                vm.dataLoading = false;
            });
            vm.dataLoading = false;
        }            
        };
    }

})();
