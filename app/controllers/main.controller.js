/**
 * Created by prasanna_d on 7/6/2017.
 */

app.controller('MainController',[
    '$scope','$http','AuthService', 'SearchService',
    '$rootScope', '$location', 'host_url','HeaderVerifyService',
    function (
        $scope, $http, AuthService,SearchService,
        $rootScope,$location,host_url, HeaderVerifyService) {

        $scope.authenticated = false;
        $scope.email_verify = false;
        $scope.background_image = 'url(assets/img/sl02.jpg)';
        $scope.backgroung_image_repeat = 'no-repeat';
        $scope.profile_section = false;
        $scope.search_section = true;
        $scope.show_error_box = false;
        $scope.profile_status = false;

        $scope.getEmail = function () {
            var user = AuthService.getUser();
            if(user){return user.email;}
            return 'your email address'
        };

        $scope.clear_history = function () {
            SearchService.clearHistory();
            SearchService.clearDynamicHistory();
        };

        $scope.onInitVerify = function () {

        };

        $scope.getProfile = function () {
            $http({
                method: "GET",
                url: host_url + "profile/getProfile"
            }).then(function (resData){
                console.log(resData);
            },function (error){
                if(error.status===404){
                    console.log('No Profile is created for the current user');
                }
            });
        };

        $rootScope.$on('$routeChangeStart', function (next, last) {
            try {
                console.log('Redirect to: ' + last.$$route.templateUrl);
                // if(last.$$route.templateUrl==="views/userprofile.html"){
                if (last.$$route.templateUrl === "views/search.html") {
                    $scope.background_image = 'url(assets/img/sl02.jpg)';
                    $scope.backgroung_image_repeat = 'no-repeat';
                    $scope.profile_section = false;
                    $scope.search_section = true;
                } else {
                    $scope.background_image = '';
                    $scope.backgroung_image_repeat = '';
                    $scope.profile_section = true;
                    $scope.search_section = false;
                }
            }catch (err){
                 console.log('Error: ' + err);
                 $location.path('/');
            }
        });

        $scope.resendVerifyEmail = function () {
            // console.log(AuthService.getToken());
            $http({
                method: "POST",
                url: host_url + "auth/resendVerifyLink",
                data: {token: AuthService.getToken()}
            }).then(function (resData){
                console.log(resData.status);
            },function (error){
                console.log('Error: ' + error);
            });
        };

        var user = AuthService.getUser();
        if (user) {
            $scope.username = user.firstname + " " + user.lastname;
        }else {
            $scope.username = '';
        }

        $scope.$watch(AuthService.isLoginStatus, function (newValue) {
            $scope.authenticated = newValue;
            if(newValue){
                var user = AuthService.getUser();
                if (user) {
                    $scope.username = user.firstname + " " + user.lastname;
                }else {
                    $scope.username = '';
                }
                HeaderVerifyService.run();
            }
        },true);

        $scope.$watch(AuthService.isEmailVerifyedStatus, function (newValue) {
            $scope.email_verify = newValue;
            setTimeout(function () {
                $scope.show_error_box = !(newValue);
                $scope.$apply();
            },10)
        },true);

        $scope.$watch(AuthService.isProfileExistStatus, function (newValue) {
            $scope.profile_status = newValue;
        },true);

        $scope.sign_out = function () {
            SearchService.clearDynamicHistory();
            SearchService.clearHistory();
            AuthService.Logout();
        };

}]);