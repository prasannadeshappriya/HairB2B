/**
 * Created by prasanna_d on 7/14/2017.
 */
app.config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when("/order/place", {
            //Profile View Page [Edit]
            templateUrl : "views/order.place.html",
            controller: 'MainController',
            resolve:{
                init : function () {
                    //Nothing here for now
                    console.log('search results route triggered');
                }
            }
        })
        .when("/search", {
            //Profile View Page [Edit]
            templateUrl : "views/searchresults.html",
            controller: 'MainController',
            resolve:{
                init : function () {
                    //Nothing here for now
                    console.log('search results route triggered');
                }
            }
        })
        .when("/profile/view", {
            //Profile View Page [Edit]
            templateUrl : "views/profileviewpublic.html",
            controller: 'MainController',
            resolve:{
                init : function () {
                    //Nothing here for now
                    console.log('search results route triggered');
                }
            }
        })
        .when("/", {
            //Search Page
            templateUrl : "views/search.html"
        })
        .when("/profile/edit", {
            //Profile View Page [Edit]
            templateUrl : "views/usersettings.html",
            controller: 'MainController',
            resolve:{
                init :function(AuthService, $location, $http){
                    if(AuthService.getUser()===null) {
                        console.log('Unauthorized url request');
                        $location.path('/');
                    }
                }
            }
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
                            url: "http://localhost:3000/profile/getProfileStatus"
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
                            url: "http://localhost:3000/profile/getProfileStatus"
                        }).then(function (resData){
                            console.log('Server status [/profile]: ' + resData.status);
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