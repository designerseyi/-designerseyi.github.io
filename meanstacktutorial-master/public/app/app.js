angular.module('userApp', ['appRoutes', 'userControllers' ,'userServices', 'ngAnimate','ngSanitize' , 'mainController', 'authServices', 'emailController', 'managementController'])


.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
});
