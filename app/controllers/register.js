/**
 * Created by prasanna_d on 7/6/2017.
 */

app.controller('LoginController',['$scope','$http', function ($scope, $http) {
    $scope.isEmailExist = false;
    $scope.isComplete = false;
    $scope.submitted = false;
    $scope.repass = false;
    $scope.server_error = false;
    $scope.isLoading = false;


    $scope.setRePass = function (repassword) {
        if(repassword==="" || typeof repassword==="undefined"){$scope.repass = false;}
        else {$scope.repass = true;}
    };

    $scope.resetSubmitted = function () {
        $scope.submitted = false;
        $scope.isEmailExist = false;
        $scope.server_error = false;
    };

    $scope.validate = function () {
        if(typeof $scope.firstname==="undefined" || $scope.firstname===""){$scope.isComplete = false;return;}
        if(typeof $scope.lastname==="undefined" || $scope.lastname===""){$scope.isComplete = false;return;}
        if(typeof $scope.email==="undefined" || $scope.email===""){$scope.isComplete = false;return;}
        if(typeof $scope.password==="undefined" || $scope.password===""){$scope.isComplete = false;return;}
        if($scope.password !== $scope.repassword){$scope.isComplete = false;return;}
        if(typeof $scope.chkTerms==="undefined" || !($scope.chkTerms)){$scope.isComplete = false;return;}
        $scope.isComplete = true;
    };

    $scope.register = function () {
        if(!($scope.regForm.email.$valid)) {return;}
        $scope.isLoading = true;
        $http({
            method: "POST",
            url: "http://localhost:3000/auth/register",
            data: {firstname: $scope.firstname, lastname: $scope.lastname, email: $scope.email, password: $scope.password},
            headers: {'Content-Type': 'application/json'}
        }).then(function (resData){
            $scope.isLoading = false;
            if(typeof resData.data.status==="undefined"){return $scope.message = "Server connection error";}
            if(resData.data.status==="success"){
                //Create session with the server
                //Get the token
            }else{
                $scope.isEmailExist = true;
            }
        },function (error){
            $scope.isLoading = false;
            $scope.server_error = true;
            $scope.message = "Server connection error";
        });
    };
}]);

