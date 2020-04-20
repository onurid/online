(function () {
    'use strict';

    angular
        .module('app')
        .controller('MyProductController', MyProductController);

    MyProductController.$inject = ['MyProductService', '$rootScope'];
    function MyProductController(MyProductService, $rootScope) {
        var vm = this;

    }

})();