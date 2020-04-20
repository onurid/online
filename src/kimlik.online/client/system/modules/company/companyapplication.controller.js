(function () {
    'use strict';

    angular
        .module('app')
        .controller('CompanyApplicationController', CompanyApplicationController);

    CompanyApplicationController.$inject = ['CompanyService', 'ApplicationService', 'notification', 'util'];
    function CompanyApplicationController(CompanyService, ApplicationService, notification, util) {
        var vm = this;

        vm.allCompanyApplication = [];

        vm.allApplication = [];

        vm.allCompany = [];

        vm.companyApplication = null;

        vm.selectedApplication = null;
        vm.selectedCompany = null;

        vm.submitCompanyApplication = addCompanyApplication;
        vm.deleteCompanyApplication = deleteCompanyApplication;

        initController();

        function initController() {
            loadAllCompanyApplication();
            loadAllApplication();
            loadAllComapany();
        }

        function loadAllCompanyApplication() {
            CompanyService.GetCompanyApplications(function (response) {
                    vm.allCompanyApplication = response;
                });
        }

        function loadAllComapany() {
            CompanyService.GetCompanies(function (response) {
                vm.allCompany = response;
            });
        }

        function loadAllApplication() {
            ApplicationService.GetApplications(function (response) {
                vm.allApplication = response;
            });
        }

        function addCompanyApplication() {
            vm.companyApplication.applicationId = vm.selectedApplication.id;
            vm.companyApplication.companyId = vm.selectedCompany.id;

            CompanyService.PostCompanyApplication(vm.companyApplication, function (res) {
                if (res.success) {
                    vm.companyApplication.id = res.data.resultId;
                    vm.allCompanyApplication.push(vm.companyApplication);
                    notification.pushSuccessNotify(res.data.message);
                }
            });
        }

        function deleteCompanyApplication(companyApplicationId) {
            CompanyService.DeleteCompanyApplication(companyApplicationId, function (res) {
                if (res.success) {
                    var result = util.arrayRemove(vm.allCompanyApplication, companyApplicationId);
                    vm.allCompanyApplication = result;
                    notification.pushSuccessNotify(res.data);
                }
            });
        }
    }

})();