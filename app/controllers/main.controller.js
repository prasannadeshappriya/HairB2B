/**
 * Created by prasanna_d on 7/6/2017.
 */

app.controller('MainController',['$scope','$http','AuthService', function ($scope, $http, AuthService) {
    $scope.tesst = false;
    $scope.login_status = AuthService.isLogin;

    $scope.buu = function () {
        console.log('asdasdadsasdsa');
        $scope.test = true
    };
}]);

//Run when refresh the page
app.run(function () {
    console.log('Hiiii');
});
