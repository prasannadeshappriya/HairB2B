/**
 * Created by prasanna_d on 7/11/2017.
 */
/**
 * Created by prasanna on 7/10/17.
 */
app.directive('loginForm', function () {
    return {
        restrict: 'EA',
        scope: {
            handler: '=handlerid'
        },
        templateUrl: 'views/loginform.html',
        transclude: true,
        controller: 'LoginController'
    };
}).controller('LoginController',['$scope','$http',function ($scope,$http) {
    $scope.handler = 'LogInForm';
}]);

