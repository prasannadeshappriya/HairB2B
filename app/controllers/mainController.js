/**
 * Created by prasanna_d on 7/6/2017.
 */

app.controller('MainController',['$scope','$http', function ($scope, $http) {
    $scope.tesst = false;

    $scope.buu = function () {
        console.log('asdasdadsasdsa');
        $scope.test = true
    };
}]);

