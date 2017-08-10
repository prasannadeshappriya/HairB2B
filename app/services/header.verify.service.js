/**
 * Created by prasanna_d on 8/4/2017.
 */

angular.module('app')
    .factory('HeaderVerifyService',['$localStorage', '$http','AuthService','$location','host_url', function ($localStorage, $http, AuthService, $location, host_url) {
        var service = {};
        service.run = run;
        return service;

        function run() {
            if ($localStorage.currentUser) {
                AuthService.setIsLogin(true);
                $http.defaults.headers.common.Authorization = 'JWT ' + $localStorage.currentUser.token;

                $http({
                    method: "POST",
                    url: host_url + "auth/getVerifyStatus"
                }).then(function (resData){
                    if(resData.data.verify){
                        AuthService.setEmailVerifyed(true);
                    }else{
                        AuthService.setEmailVerifyed(false);
                    }
                },function (error){
                    if(error.status===401){AuthService.Logout();}
                    console.log('error: ' + error);
                });

                $http({
                    method: "GET",
                    url: host_url + "profile/getProfileStatus"
                }).then(function (resData){
                    AuthService.setProfileStatus(true);
                },function (error){
                    if(error.status===404){
                        AuthService.setProfileStatus(false);
                    }else {
                        console.log('error: ' + error);
                    }
                });
            }
        }
}]);