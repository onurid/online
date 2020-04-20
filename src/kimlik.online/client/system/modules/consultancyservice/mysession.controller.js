(function () {
    'use strict';

    angular
        .module('app')
        .controller('MySessionController', MySessionController);

    MySessionController.$inject = ['ConsultancyService', '$rootScope'];
    function MySessionController(ConsultancyService, $rootScope) {
        var vm = this;

    }

})();