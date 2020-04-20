(function () {
    'use strict';

    angular
        .module('app')
        .controller('BusinessServiceController', BusinessServiceController);

    BusinessServiceController.$inject = ['BusinessLogicService', 'notification', 'util'];
    function BusinessServiceController(BusinessLogicService, notification, util) {
        var vm = this;

        vm.allBusinessService = [];

        vm.BusinessService = null;

        vm.submitBusinessService = addBusinessService;
        vm.deleteBusinessService = deleteBusinessService;
        
        initController();

        function initController() {
            loadAllBusinessService();
        }

        function loadAllBusinessService() {
            BusinessLogicService.GetAllBusinessService(function (response) {
                    vm.allBusinessService = response;
                });
        }

        function addBusinessService() {
            BusinessLogicService.PostBusinessService(vm.BusinessService, function (res) {
                if (res.success) {
                    vm.BusinessService.id = res.data.resultId;
                    vm.allBusinessService.push(vm.BusinessService);
                    notification.pushSuccessNotify(res.data.message);
                }
            });
        }

        function deleteBusinessService(BusinessServiceId) {
            BusinessLogicService.DeleteBusinessService(BusinessServiceId, function (res) {
                if (res.success) {
                    var result = util.arrayRemove(vm.allBusinessService, BusinessServiceId);
                    vm.allBusinessService = result;
                    notification.pushSuccessNotify(res.data);
                }
            });
        }
    }

})();
