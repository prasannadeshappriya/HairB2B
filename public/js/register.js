/**
 * Created by prasanna_d on 7/6/2017.
 */
app.controller('LoginController',['$scope','$http', function ($scope, $http) {
    $scope.isEmailExist = false;
    $scope.isComplete = false;
    $scope.submitted = false;
    $scope.repass = false;

    $scope.setRePass = function (repassword) {
        if(repassword==="" || typeof repassword==="undefined"){$scope.repass = false;}
        else {$scope.repass = true;}
    };

    $scope.resetSubmitted = function () {
        $scope.submitted = false;
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
        $http({
            method: "GET",
            url: "http://localhost:3000/auth/register/isexist",
            params: {email: email},
            headers: {'Content-Type': 'application/json'}
        }).then(function (resData){
            if(typeof resData.data.status==="undefined"){return false;}
            if(resData.data.status==="true"){return true;}
            if(resData.data.status==="false"){return true;}
        },function (error){
            $scope.message = "Something fail";
        });
    };
}]);