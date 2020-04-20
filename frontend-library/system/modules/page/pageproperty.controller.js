(function () {
    'use strict';

    angular
        .module('app')
        .controller('PagePropertyController', PagePropertyController);

    PagePropertyController.$inject = ['PageService', 'notification', 'util'];
    function PagePropertyController(PageService, notification, util) {
        var vm = this;

        vm.allRoute = [];

        vm.page = null;

        vm.submitPage = addPage;
        vm.deletePage = deletePage;
        
        initController();

        function initController() {
            loadAllRoute();
        }

        function loadAllRoute() {
            PageService.GetPages(function (response) {
                        vm.allRoute = response;
                });
        }

        function addPage() {
            PageService.PostPage(vm.page, function (res) {
                if (res.success) {
                    vm.page.id = res.data.resultId;
                    vm.allRoute.push(vm.page);
                    notification.pushSuccessNotify(res.data);
                }
            });
        }

        function deletePage(pageId) {
            PageService.DeletePage(pageId, function (res) {
                if (res.success) {
                    var result = util.arrayRemove(vm.allRoute, pageId);
                    vm.allRoute  = result;
                    notification.pushSuccessNotify(res.data);
                }
            });
        }
    }

})();
