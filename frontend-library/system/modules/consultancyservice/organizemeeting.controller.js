(function () {
    'use strict';

    angular
        .module('app')
        .controller('OrganizeMeetingController', OrganizeMeetingController);

    OrganizeMeetingController.$inject = ['ConsultancyService', '$rootScope'];
    function OrganizeMeetingController(ConsultancyService, $rootScope) {
        var vm = this;

    }

})();