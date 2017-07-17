/**
 * Created by prasanna_d on 7/6/2017.
 */

app.controller('MainController',['$scope','$http','AuthService', '$localStorage', '$rootScope',
    function ($scope, $http, AuthService, $localStorage,$rootScope) {
        $scope.authenticated = false;
        $scope.email_verify = false;
        $scope.background_image = 'url(assets/img/sl02.jpg)';
        $scope.backgroung_image_repeat = 'no-repeat';
        $scope.profile_section = false;
        $scope.search_section = true;

        $rootScope.$on('$routeChangeStart', function (next, last) {
            console.log('Redirect to: ' + last.$$route.templateUrl);
            // if(last.$$route.templateUrl==="views/userprofile.html"){
            if(last.$$route.templateUrl==="views/search.html"){
                $scope.background_image = 'url(assets/img/sl02.jpg)';
                $scope.backgroung_image_repeat = 'no-repeat';
                $scope.profile_section = false;
                $scope.search_section = true;
            }else{
                $scope.background_image = '';
                $scope.backgroung_image_repeat = '';
                $scope.profile_section = true;
                $scope.search_section = false;
            }
        });

        $scope.resendVerifyEmail = function () {
            console.log(AuthService.getToken());
            $http({
                method: "POST",
                url: "http://localhost:3000/auth/resendVerifyLink",
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
        },true);

        $scope.$watch(AuthService.isEmailVerifyedStatus, function (newValue) {
            $scope.email_verify = newValue;
        },true);

        $scope.sign_out = function () {
            AuthService.Logout();
        };

}]);