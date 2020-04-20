(function () {
    'use strict';

    angular
        .module('app')
        .controller('BusinessLogicController', BusinessLogicController);

    BusinessLogicController.$inject = ['BusinessLogicService', 'notification', 'util'];
    function BusinessLogicController(BusinessLogicService, notification, util) {
        var vm = this;

        vm.allBusinessLogic = [];

	vm.allBusinessService = [];

        vm.businessLogic = null;

        vm.submitBusinessLogic = addBusinessLogic;
        vm.deleteBusinessLogic = deleteBusinessLogic;
        
        initController();

        function initController() {
            loadAllBusinessLogic();
	    loadAllBusinessService();
        }

        function loadAllBusinessLogic() {
            BusinessLogicService.GetAllBusinessLogic(function (response) {
                    vm.allBusinessLogic = response;
                });
        }

	function loadAllBusinessService() {
            BusinessLogicService.GetAllBusinessService(function (response) {
                    vm.allBusinessService = response;
                });
        }

        function addBusinessLogic() {
            BusinessLogicService.PostBusinessLogic(vm.businessLogic, function (res) {
                if (res.success) {
                    vm.businessLogic.id = res.data.resultId;
                    vm.allBusinessLogic.push(vm.businessLogic);
                    notification.pushSuccessNotify(res.data.message);
                }
            });
        }

        function deleteBusinessLogic(businessLogicId) {
            BusinessLogicService.DeleteBusinessLogic(businessLogicId, function (res) {
                if (res.success) {
                    var result = util.arrayRemove(vm.allBusinessLogic, businessLogicId);
                    vm.allBusinessLogic = result;
                    notification.pushSuccessNotify(res.data);
                }
            });
        }
    }

})();
