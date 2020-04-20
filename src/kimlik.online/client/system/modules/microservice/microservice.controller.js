(function () {
    'use strict';

    angular
        .module('app')
        .controller('MicroserviceController', MicroserviceController);

    MicroserviceController.$inject = ['MicroserviceService', 'notification', 'util'];
    function MicroserviceController(MicroserviceService, notification, util) {
        var vm = this;

        vm.allMicroservice = [];

        vm.microservice = null;

        vm.submitMicroservice = addMicroservice;
        vm.deleteMicroservice = deleteMicroservice;
        
        initController();

        function initController() {
            loadAllMicroservice();
        }

        function loadAllMicroservice() {
            MicroserviceService.GetMicroservice(function (response) {
                    vm.allMicroservice = response;
                });
        }

        function addMicroservice() {
            MicroserviceService.PostMicroservice(vm.microservice, function (res) {
                if (res.success) {
                    vm.microservice.id = res.data.resultId;
                    vm.allMicroservice.push(vm.microservice);
                    notification.pushSuccessNotify(res.data.message);
                }
            });
        }

        function deleteMicroservice(microserviceId) {
            MicroserviceService.DeleteMicroservice(microserviceId, function (res) {
                if (res.success) {
                    var result = util.arrayRemove(vm.allMicroservice, microserviceId);
                    vm.allMicroservice = result;
                    notification.pushSuccessNotify(res.data);
                }
            });
        }
    }

})();