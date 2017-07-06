/**
 * Created by prasanna_d on 7/6/2017.
 */
app.controller('LoginController',['$scope','$http', function ($scope, $http) {
    $scope.isEmailExist = false;
    $scope.isComplete = false;
    $scope.submitted = false;

    $scope.resetSubmitted = function () {
        $scope.submitted = false;
    };

    $scope.register = function () {
        $scope.submitted = true;
    };

    // $scope.isEmailExist = function (email) {
    //     $http({
    //         method: "GET",
    //         url: "http://localhost:3000/auth/register/isexist",
    //         params: {email: email},
    //         headers: {'Content-Type': 'application/json'}
    //     }).then(function (resData){
    //         if(typeof resData.data.status==="undefined"){return false;}
    //         if(resData.data.status==="true"){return true;}
    //         if(resData.data.status==="false"){return true;}
    //     },function (error){
    //         $scope.message = "Something fail";
    //     });
    // };

    $scope.Test = function (test) {
        $scope.message = test;
    };
}]);