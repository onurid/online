(function () {
    'use strict';

    angular
        .module('app')
        .factory('CompanyService', CompanyService);

    var companyApiUrl = baseURL + '/api' + adminPath + '/company';

    var applicationInstanceApiUrl = baseURL + '/api' + adminPath + '/application-instance';

    CompanyService.$inject = ['getjson'];
    function CompanyService(getjson) {
        var service = {};

        service.GetCompanies = GetCompanies;
        service.GetCompanyApplications = GetCompanyApplications;

        service.PostCompany = PostCompany;
        service.DeleteCompany = DeleteCompany;

        service.PostCompanyApplication = PostCompanyApplication;
        service.DeleteCompanyApplication = DeleteCompanyApplication;

        return service;

        function GetCompanies(callback) {
            getjson.getData(companyApiUrl)
                .then(function (res) {
                    callback(res.data);
                });
        }

        function GetCompanyApplications(callback) {
            getjson.getData(applicationInstanceApiUrl)
                .then(function (res) {
                    callback(res.data);
                });
        }

        function PostCompany(company, callback) {
            getjson.postData(companyApiUrl, company)
                .then(function (res) {
                    callback(res);
                });
        }

        function DeleteCompany(companyId, callback) {
            getjson.deleteData(companyApiUrl + "/" + companyId)
                .then(function (res) {
                    callback(res);
                });
        }

        function PostCompanyApplication(applicationInstance, callback) {
            getjson.postData(applicationInstanceApiUrl, applicationInstance)
                .then(function (res) {
                    callback(res);
                });
        }

        function DeleteCompanyApplication(applicationInstanceId, callback) {
            getjson.deleteData(applicationInstanceApiUrl + "/" + applicationInstanceId)
                .then(function (res) {
                    callback(res);
                });
        }
    }

})();
