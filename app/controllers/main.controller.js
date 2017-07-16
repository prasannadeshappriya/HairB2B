/**
 * Created by prasanna_d on 7/6/2017.
 */

app.controller('MainController',['$scope','$http','AuthService', '$localStorage', '$rootScope',
    function ($scope, $http, AuthService, $localStorage,$rootScope) {
        $scope.authenticated = false;
        $scope.background_image = 'url(assets/img/sl02.jpg)';
        $scope.profile_section = false;
        $scope.search_section = true;

        $rootScope.$on('$routeChangeStart', function (next, last) {
            console.log('Redirect to: ' + last.$$route.templateUrl);
            // if(last.$$route.templateUrl==="views/userprofile.html"){
            if(last.$$route.templateUrl==="views/search.html"){
                $scope.background_image = 'url(assets/img/sl02.jpg)';
                $scope.profile_section = false;
                $scope.search_section = true;
            }else{
                $scope.background_image = '';
                $scope.profile_section = true;
                $scope.search_section = false;
            }
        });

        var user = AuthService.getUser();
        if (user) {
            $scope.username = user.firstname + " " + user.lastname;
        }else {
            $scope.username = '';
        }

        $scope.$watch(AuthService.isLoginStatus, function (newValue) {
            $scope.authenticated = newValue;
        },true);

        $scope.sign_out = function () {
            AuthService.Logout();
        };

}]);