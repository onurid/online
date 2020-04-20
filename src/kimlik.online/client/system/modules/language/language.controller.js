(function () {
    'use strict';

    angular
        .module('app')
        .controller('LanguageController', LanguageController);

    LanguageController.$inject = ['LanguageService', 'notification', 'util'];
    function LanguageController(LanguageService, notification, util) {
        var vm = this;

        vm.allLanguage = [];

        vm.language = null;

        vm.submitLanguage = addLanguage;
        vm.deleteLanguage = deleteLanguage;
        
        initController();

        function initController() {
            loadAllLanguage();
        }

        function loadAllLanguage() {
            LanguageService.GetAllLanguage(function (response) {
                        vm.allLanguage = response;
                });
        }

        function addLanguage() {
            LanguageService.PostLanguage(vm.language, function (res) {
                if (res.success) {
                    vm.language.id = res.data.resultId;
                    vm.allLanguage.push(vm.language);
                    notification.pushSuccessNotify(res.data.message);
                }
            });
        }

        function deleteLanguage(languageId) {
            LanguageService.DeleteLanguage(languageId, function (res) {
                if (res.success) {
                    var result = util.arrayRemove(vm.allLanguage, languageId);
                    vm.allLanguage = result;
                    notification.pushSuccessNotify(res.data);
                }
            });
        }
    }

})();
