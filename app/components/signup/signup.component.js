/**
 * Created by prasanna_d on 7/12/2017.
 */
angular.module('signup')
    .component('signUp',{
        templateUrl : 'app/components/signup/signup.template.html',
        controller : function ($scope, $http, AuthService) {
            $scope.isEmailExist = false;    //Email exist error
            $scope.isComplete = false;      //Check all the fields are filled
            $scope.submitted = false;       //Error showing only after submit button clicked
            $scope.repass = false;          //Check password match only after user retype password
            $scope.server_error = false;    //Check connection Errors
            $scope.isLoading = false;       //Processing image gif while server response
            $scope.handler = 'RegForm';     //Show the window

            //-------------------------Password Character Error---------------
            $scope.password_chr_error = false;
            //---------------------------------------------------------------------

            $scope.setRePass = function (repassword) {
                if(repassword==="" || typeof repassword==="undefined"){$scope.repass = false;}
                else {$scope.repass = true;}
            };

            $scope.resetSubmitted = function () {
                $scope.submitted = false;
                $scope.isEmailExist = false;
                $scope.server_error = false;
                try {
                    if ($scope.password.length !== 'undefined') {
                        if ($scope.password.length >= 8) {
                            $scope.password_chr_error = false;
                        } else {
                            $scope.password_chr_error = true;
                        }
                    }
                }catch (err){
                    $scope.password_chr_error = false;}
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
                $scope.submitted = true;
                $scope.server_error = false;
                if($scope.password_chr_error){
                    return;
                }
                if(!$scope.isComplete){return;}
                if(!($scope.regForm.email.$valid)) {return;}
                $scope.isLoading = true;
                $http({
                    method: "POST",
                    url: "http://localhost:3000/auth/register",
                    data: {firstname: $scope.firstname, lastname: $scope.lastname, email: $scope.email, password: $scope.password},
                    headers: {'Content-Type': 'application/json'}
                }).then(function (resData){
                    $scope.isLoading = false;
                    if(typeof resData.status==="undefined"){return $scope.message = "Server connection error";}
                    if(resData.status===201){
                        $scope.isEmailExist = false;
                        //Create session with the server
                        //Get the token
                        AuthService.Login(
                            resData.data.id,
                            resData.data.token,
                            resData.data.email,
                            resData.data.firstname,
                            resData.data.lastname,
                            function (callback) {
                                $('#signup_model').modal('hide');
                                console.log(callback);
                                console.log('Authentication Successful');
                                window.location.reload();
                            }
                        );
                    }
                },function (error){
                    if(error.status===400) {
                        $scope.server_error = true;
                        $scope.isLoading = false;
                        console.log(error);
                        return $scope.message = error.data.error;
                    }else if(error.status===409){
                        $scope.isLoading = false;
                        return $scope.isEmailExist = true;
                    }else if(error.status===504){
                        $scope.isLoading = false;
                        $scope.server_error = true;
                        return $scope.message = "Server connection error";
                    }else {
                        $scope.isLoading = false;
                        $scope.server_error = true;
                        $scope.message = "Server connection error";
                    }
                });
            };
        }
    });