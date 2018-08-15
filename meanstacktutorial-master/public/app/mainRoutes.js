var app = angular.module('mainRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {


     $routeProvider

      .when('/', {
         templateUrl: 'app/views/pages/users/mainApp/main.html',
        authenticated: false
    })



	  .when('/main', {
        templateUrl: 'app/views/pages/users/mainApp/main.html',
        authenticated: true
    })

      .when('/payment', {
        templateUrl: 'app/views/pages/users/mainApp/payment.html',
        authenticated: true
    })

       .when('/history', {
        templateUrl: 'app/views/pages/users/mainApp/history.html',
        authenticated: true
    })

        .when('/notificatoin', {
        templateUrl: 'app/views/pages/users/mainApp/notification.html',
        authenticated: true
    })

         .when('/setting', {
        templateUrl: 'app/views/pages/users/mainApp/setting.html',
        authenticated: true
    })


     .when('/help', {
        templateUrl: 'app/views/pages/users/mainApp/help.html',
        authenticated: true
    })

     .when('/reviewtrip', {
        templateUrl: 'app/views/pages/users/mainApp/reviewtrip.html',
        authenticated: true
    })

     

      .when('/requestride', {
        templateUrl: 'app/views/pages/users/mainApp/requestride.html',
        authenticated: true
    })


      .when('/confirmbooking', {
        templateUrl: 'app/views/pages/users/mainApp/confirmbooking.html',
        authenticated: true
    })


      .when('/emergencycontact', {
        templateUrl: 'app/views/pages/users/mainApp/emergencycontact.html',
        authenticated: true
    })


       .when('/bookingsucessful', {
        templateUrl: 'app/views/pages/users/mainApp/bookingsucessful.html',
        authenticated: true
    })

        .when('/setlocation', {
        templateUrl: 'app/views/pages/users/mainApp/setlocation.html',
        authenticated: true
    })

        .when('/pickuparriving', {
        templateUrl: 'app/views/pages/users/mainApp/pickuparriving.html',
        authenticated: true
    })


        .when('/changepaymentmethod', {
        templateUrl: 'app/views/pages/users/mainApp/changepaymentmethod.html',
        authenticated: true
    })





    // Route: User Profile
    .when('/profile', {
        templateUrl: 'app/views/pages/users/mainApp/main.html',
        authenticated: true
    })

    .otherwise({ redirectTo: '/' }); // If user tries to access any other route, redirect to home page

    $locationProvider.html5Mode({ enabled: true, requireBase: false }); // Required to remove AngularJS hash from URL (no base is required in index file)
});

// Run a check on each route to see if user is logged in or not (depending on if it is specified in the individual route)
app.run(['$rootScope', 'Auth', '$location', 'User', function($rootScope, Auth, $location, User) {

    // Check each time route changes    
    $rootScope.$on('$routeChangeStart', function(event, next, current) {

        // Only perform if user visited a route listed above
        if (next.$$route !== undefined) {
            // Check if authentication is required on route
            if (next.$$route.authenticated === true) {
                // Check if authentication is required, then if permission is required
                if (!Auth.isLoggedIn()) {
                    event.preventDefault(); // If not logged in, prevent accessing route
                    $location.path('/login'); // Redirect to home instead
                } else if (next.$$route.permission) {
                    // Function: Get current user's permission to see if authorized on route
                    User.getPermission().then(function(data) {
                        // Check if user's permission matches at least one in the array
                        if (next.$$route.permission[0] !== data.data.permission) {
                            if (next.$$route.permission[1] !== data.data.permission) {
                                event.preventDefault(); // If at least one role does not match, prevent accessing route
                                $location.path('/login'); // Redirect to home instead
                            }
                        }
                    });
                }
            } else if (next.$$route.authenticated === false) {
                // If authentication is not required, make sure is not logged in
                if (Auth.isLoggedIn()) {
                    event.preventDefault(); // If user is logged in, prevent accessing route
                    $location.path('/main'); // Redirect to profile instead
                }
            }
        }
    });
}]);
