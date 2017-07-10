/**
 * Created by prasanna on 7/10/17.
 */
app.directive('regform', function () {
    return {
        restrict: 'EA',
        scope: {
            handler: '=handlerid'
        },
        templateUrl: 'views/regform.html',
        transclude: true,
        controller: function ($scope) {
            $scope.handler = 'pop';
        }
    };
});