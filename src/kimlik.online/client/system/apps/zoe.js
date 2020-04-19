require.config({
    baseUrl: '../../system',
    urlArgs: 'v=1.0',

    waitSeconds: 100,
    paths: {
        "angular-notify" : "requires/angular-notify",
        "jquery-confirm" :"requires/jquery-confirm.min",
        "jquery" : "requires/jquery.min",
        "angular-route":"requires/angular-route.min",
        "angular-cookies" : "requires/angular-cookies.min",
        "ocLazyLoad" : "requires/ocLazyLoad.min",
        "angular": "requires/angular.min",
        "app" : "app",
        "flash": "app-services/flash.service",
        "authentication": "app-services/authentication.service",
        "profile" : "app-services/profile.service",
        "dashboard" : "app-services/dashboard.service",
        "lemoras" :"app-services/lemoras.service",
        "message" : "app-services/message.service",
        "settings": "app-services/settings.service",

        "login":"modules/login/login.controller",
        "logout":"modules/logout/logout.controller"
    },
    shim: {
        "angular-notify": { deps:["angular"], exports: "angular-notif" },
        "jquery-confirm": { deps: ["jquery"], exports: "jquery-confirm" },
        "jquery": { exports: "jquery" },
        "angular-route": { deps: ["angular"], exports: "angular-route" },
        "angular-cookies": { deps: ["angular"], exports: "angular-cookies" },
        "ocLazyLoad": { deps: ["angular"], exports: "ocLazyLoad" },
        "angular": { deps: ["jquery"], exports: "angular" },
        "app": { deps: ["angular", "angular-route", "angular-cookies", "ocLazyLoad", 'angular-notify'], exports: "app" },
        "flash": { deps: ["app"], exports: "flash" },
        "authentication": { deps: ["app"],exports: "authentication" },
        "profile": { deps: ["app"], exports: "profile" },
        "dashboard": { deps: ["app"], exports: "dashboard" },
        "lemoras": { deps: ["app"], exports: "lemoras" },
        "message": { deps: ["app"], exports: "message" },
        "settings": { deps: ["app"],exports: "settings" },
        "logout": { deps: ["app", "jquery-confirm"], exports: "logout" },
        "login": { deps: ["authentication", "flash", "app"], exports: "login" }
    },
    deps: ["app"]
});

require(
    [
        'login', 'logout',
        "jquery-confirm",
        "jquery",
        "angular-route",
        "angular-cookies",
        "ocLazyLoad",
        "angular",
        "app",
        "flash",
        "authentication",
        "profile",
        "dashboard",
        "lemoras",
        "message",
        "settings"
    ],
    function () {
        angular.bootstrap(document, ['app']);
    });
