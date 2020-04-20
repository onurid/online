(function () {
    'use strict';

    angular
        .module('app')
        .controller('BuyProductController', BuyProductController);

    BuyProductController.$inject = ['BuyProductService', '$rootScope'];
    function BuyProductController(BuyProductService, $rootScope) {
        var vm = this;

    }

})();