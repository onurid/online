(function () {
    'use strict';

    angular
        .module('app')
        .controller('CommandController', CommandController);

    CommandController.$inject = ['CommandService','BusinessLogicService', 'notification', 'util'];
    function CommandController(CommandService,BusinessLogicService, notification, util) {
        var vm = this;

        vm.allCommand = [];
        vm.allBusinessService=[];
        vm.command = null;

        vm.submitCommand = addCommand;
        vm.deleteCommand = deleteCommand;
        
        initController();

        function initController() {
            loadAllCommand();
            loadAllBusinessService();
        }

        function loadAllCommand() {
            CommandService.GetAllCommand(function (response) {
                        vm.allCommand = response;
                });
        }

        function loadAllBusinessService() {
            BusinessLogicService.GetAllBusinessService(function (response) {
                        vm.allBusinessService = response;
                });
        }

        function addCommand() {
            vm.command.businessServiceId = vm.selectedBusinessService.id;
            vm.command.businessServiceKey = vm.selectedBusinessService.businessServiceKey;

            CommandService.PostCommand(vm.command, function (res) {
                if (res.success) {
                    vm.command.id = res.data.resultId;
                    vm.allCommand.push(vm.command);
                    notification.pushSuccessNotify(res.data.message);
                }
            });
        }

        function deleteCommand(commandId) {
            CommandService.DeleteCommand(commandId, function (res) {
                if (res.success) {
                    var result = util.arrayRemove(vm.allCommand, commandId);
                    vm.allCommand = result;
                    notification.pushSuccessNotify(res.data);
                }
            });
        }
    }

})();