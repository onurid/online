(function () {
    'use strict';

    angular
        .module('app')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['UserLocalService', '$rootScope'];
    function SearchController(UserLocalService, $rootScope) {
        var vm = this;

    }

})();