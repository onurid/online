(function () {
    'use strict';

    angular
        .module('app')
        .controller('TemplateController', TemplateController);

    TemplateController.$inject = ['TemplateService', 'notification', 'util'];
    function TemplateController(TemplateService, notification, util) {
        var vm = this;

        vm.allTemplate = [];

        vm.template = null;

        vm.submitTemplate = addTemplate;
        vm.deleteTemplate = deleteTemplate;
        
        initController();

        function initController() {
            loadAllTemplate();
        }

        function loadAllTemplate() {
            TemplateService.GetAllTemplate(function (response) {
                    vm.allTemplate = response;
                });
        }

        function addTemplate() {
            TemplateService.PostTemplate(vm.template, function (res) {
                if (res.success) {
                    vm.template.id = res.data.resultId;
                    vm.allTemplate.push(vm.template);
                    notification.pushSuccessNotify(res.data.message);
                }
            });
        }

        function deleteTemplate(templateId) {
            TemplateService.DeleteTemplate(templateId, function (res) {
                if (res.success) {
                    var result = util.arrayRemove(vm.allTemplate, templateId);
                    vm.allTemplate = result;
                    notification.pushSuccessNotify(res.data);
                }
            });
        }
    }

})();
