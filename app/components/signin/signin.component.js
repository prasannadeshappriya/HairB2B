/**
 * Created by prasanna_d on 7/12/2017.
 */
angular.module('app')
    .component('signIn',{
        templateUrl : 'app/components/signin/signin.template.html',
        controller : function ($scope, $http, AuthService,host_url) {
            $scope.isComplete = false;      //Check all the fields are filled
            $scope.submitted = false;       //Error showing only after submit button clicked
            $scope.server_error = false;    //Check connection Errors
            $scope.isLoading = false;       //Processing image gif while server response
            $scope.handler = 'LogInForm';   //Show the window
            $scope.auth_error = false;

            $scope.resetSubmitted = function () {
                $scope.submitted = false;
                $scope.server_error = false;
                $scope.auth_error = false;
            };

            $scope.validate = function () {
                if(typeof $scope.email==="undefined" || $scope.email===""){$scope.isComplete = false;return;}
                if(typeof $scope.password==="undefined" || $scope.password===""){$scope.isComplete = false;return;}
                $scope.isComplete = true;
            };

            $scope.login = function () {
                //Reset the server error flag
                $scope.server_error = false;
                $scope.auth_error = false;
                //Let angular know data will start sending ton the server
                $scope.submitted = true;
                if(!($scope.loginForm.email.$valid)) {return;}
                $scope.isLoading = true;
                $http({
                    method: "POST",
                    url: host_url + "auth/login",
                    data: {email: $scope.email, password: $scope.password},
                    headers: {'Content-Type': 'application/json'}
                }).then(function (resData){
                    $scope.isLoading = false;
                    if(typeof resData.status==="undefined"){return $scope.message = "Server connection error";}
                    if(resData.status===200){
                        //Create session with the server
                        //Get the token
                        AuthService.Login(
                            resData.data.userid,
                            resData.data.token,
                            resData.data.email,
                            resData.data.firstname,
                            resData.data.lastname,
                            function (callback) {
                                $('#signin_model').modal('hide');
                                console.log('Authentication Successful');
                                setTimeout(function () {
                                    $scope.$digest()
                                },1000);
                                // window.location.reload();
                            }
                        );

                    }else if(resData.status===400) {
                        $scope.message = "Email address is not associated to any account";
                        $scope.auth_error = true;
                    }else{
                        $scope.message = "Username or password is invalid";
                        $scope.auth_error = true;
                    }
                },function (error){
                    if(error.status===400){
                        $scope.isLoading = false;
                        $scope.server_error = true;
                        return $scope.message = "Email address is not associated to any account";
                    }else if(error.status===401) {
                        $scope.isLoading = false;
                        $scope.message = "Username or password is invalid";
                        return $scope.auth_error = true;
                    }else {
                        $scope.isLoading = false;
                        $scope.auth_error = false;
                        $scope.server_error = true;
                        $scope.message = "Server connection error";
                    }
                });
            };
        }
    });