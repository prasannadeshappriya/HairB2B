/**
 * Created by prasanna_d on 7/6/2017.
 */

app.controller('MainController',['$scope','$http','AuthService', '$localStorage', function ($scope, $http, AuthService, $localStorage) {
    $scope.authenticated = false;

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

//Run when refresh the page
app.run(['$localStorage','AuthService', '$http',function ($localStorage,AuthService, $http) {
    if ($localStorage.currentUser) {
        console.log('inside');
        AuthService.setIsLogin(true);
        $http.defaults.headers.common.Authorization = 'JWT ' + $localStorage.currentUser.token;
    }
    console.log('outside');
}]);
