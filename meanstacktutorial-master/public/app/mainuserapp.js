angular.module('mainApp', ['appRoutes','mainRoutes', 'userControllers','mainAppController' , 'userServices', 'ngAnimate', 'mainController', 'authServices', 'emailController', 'managementController'])

.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
});
