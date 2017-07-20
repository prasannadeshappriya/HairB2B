/**
 * Created by prasanna_d on 7/14/2017.
 */
app.config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when("/", {
            //Search Page
            templateUrl : "views/search.html"
        })
        .when("/profile/create", {
            //Profile Create Page
            templateUrl : "views/userprofilecreate.html",
            controller: 'MainController',
            resolve:{
                init :function(AuthService, $location, $http){
                    if(AuthService.getUser()===null){
                        console.log('Unauthorized url request');
                        $location.path('/');
                    }else{
                        $http({
                            method: "GET",
                            url: "http://localhost:3000/profile/getProfile"
                        }).then(function (resData){
                            console.log('Return Data: ' + resData);
                            $location.path('/profile');
                        },function (error){
                            if(error.status===404){
                                $location.path('/profile/create');
                                console.log('No profile found for user, creating now');
                            }else {
                                console.log('Sever connection error occurred, redirecting to home');
                                $location.path('/');
                            }
                        });
                    }
                }
            }
        })
        .when("/profile", {
            //Profile View Page [Edit]
            templateUrl : "views/userprofile.html",
            controller: 'MainController',
            resolve:{
                init :function(AuthService, $location, $http){
                    if(AuthService.getUser()===null){
                        console.log('Unauthorized url request');
                        $location.path('/');
                    }else{
                        $http({
                            method: "GET",
                            url: "http://localhost:3000/profile/getProfile"
                        }).then(function (resData){
                            console.log('Return Data: ' + resData);
                        },function (error){
                            if(error.status===404){
                                $location.path('/profile/create');
                                console.log('No profile found for user, creating now');
                            }else {
                                console.log('Sever connection error occurred, redirecting to home');
                                $location.path('/');
                            }
                        });
                    }
                }
            }
        })

}]);