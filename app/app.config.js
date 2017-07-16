/**
 * Created by prasanna_d on 7/14/2017.
 */
app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when("/", {
            //Search Page
            templateUrl : "views/search.html"
        })
        .when("/profile", {
            templateUrl : "views/userprofile.html",
            controller: 'MainController',
            resolve:{
                check :function(AuthService, $location){
                    if(AuthService.getUser()===null){
                        console.log('Unauthorized url request');
                        $location.path('/');
                    }
                }
            }
        })

}]);