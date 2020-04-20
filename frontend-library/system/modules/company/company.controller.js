(function () {
    'use strict';

    angular
        .module('app')
        .controller('CompanyController', CompanyController);

    CompanyController.$inject = ['CompanyService', 'notification', 'util'];
    function CompanyController(CompanyService, notification, util) {
        var vm = this;

        vm.allCompany = [];

        vm.company = null;

        vm.submitCompany = addCompany;
        vm.deleteCompany = deleteCompany;


        initController();

        function initController() {
            loadAllCompany();
        }

        function loadAllCompany() {
            CompanyService.GetCompanies(function (response) {
                        vm.allCompany = response;
                });
        }

        function addCompany() {
            CompanyService.PostCompany(vm.company, function (res) {
                if (res.success) {
                    vm.company.id = res.data.resultId;
                    vm.allCompany.push(vm.company);
                    notification.pushSuccessNotify(res.data.message);
                }
            });
        }

        function deleteCompany(companyId) {
            CompanyService.DeleteCompany(companyId, function (res) {
                if (res.success) {
                    var result = util.arrayRemove(vm.allCompany, companyId);
                    vm.allCompany = result;
                    notification.pushSuccessNotify(res.data);
                }
            });
        }
    }

})();