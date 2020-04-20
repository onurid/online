(function () {
    'use strict';

    angular
        .module('app')
        .controller('PaymentHistoryController', PaymentHistoryController);

    PaymentHistoryController.$inject = ['PaymentService', '$rootScope'];
    function PaymentHistoryController(PaymentService, $rootScope) {
        var vm = this;

    }

})();