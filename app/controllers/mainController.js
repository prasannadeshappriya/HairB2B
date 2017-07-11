/**
 * Created by prasanna_d on 7/6/2017.
 */

app.controller('MainController',['$scope','$http', function ($scope, $http) {
    //Show Signup Dialog
    $scope.showSignUpWindow = function () {
        return "RegForm";
    };

    //Show Login Dialog
    $scope.showLoginWindow = function () {
        console.log('Damn');
        return "LogInForm";
    };
}]);

