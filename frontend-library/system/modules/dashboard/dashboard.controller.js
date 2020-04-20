(function () {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['DashboardService', '$rootScope'];
    function DashboardController(DashboardService, $rootScope) {
        var vm = this;

    }

})();