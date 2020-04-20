(function () {
    'use strict';

    angular
        .module('app')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['SettingsService', '$rootScope'];
    function SettingsController(SettingsService, $rootScope) {
        var vm = this;

    }

})();