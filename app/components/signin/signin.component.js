/**
 * Created by prasanna_d on 7/12/2017.
 */
angular.module('app')
    .component('signIn',{
        templateUrl : 'app/components/signin/signin.template.html',
        controller : function ($scope, $http, AuthService) {
            $scope.isComplete = false;      //Check all the fields are filled
            $scope.submitted = false;       //Error showing only after submit button clicked
            $scope.server_error = false;    //Check connection Errors
            $scope.isLoading = false;       //Processing image gif while server response
            $scope.handler = 'LogInForm';   //Show the window
            $scope.flag = AuthService;

            $scope.resetSubmitted = function () {
                $scope.submitted = false;
                $scope.server_error = false;
            };

            $scope.validate = function () {
                if(typeof $scope.email==="undefined" || $scope.email===""){$scope.isComplete = false;return;}
                if(typeof $scope.password==="undefined" || $scope.password===""){$scope.isComplete = false;return;}
                $scope.isComplete = true;
            };

            $scope.example = function () {
                console.log(AuthService.getUser().token);
            };
            $scope.example2 = function () {
                AuthService.Logout();
                console.log('example2: ' + AuthService.isLogin);
                console.log('example2: ' + $scope.$parent.login_status);
            };

            $scope.login = function () {
                //Reset the server error flag
                $scope.server_error = false;
                //Let angular know data will start sending ton the server
                $scope.submitted = true;
                if(!($scope.loginForm.email.$valid)) {return;}
                $scope.isLoading = true;
                $http({
                    method: "POST",
                    url: "http://localhost:3000/auth/login",
                    data: {email: $scope.email, password: $scope.password},
                    headers: {'Content-Type': 'application/json'}
                }).then(function (resData){
                    $scope.isLoading = false;
                    if(typeof resData.data.status==="undefined"){return $scope.message = "Server connection error";}
                    if(resData.data.status==="success"){
                        //Create session with the server
                        //Get the token

                        console.log(resData.data.token);

                        AuthService.Login(resData.data.token, resData.data.email, function (callback) {
                            console.log('request: ' + callback);
                            console.log('request: ' + AuthService.isLogin);
                            console.log('request: ' + $scope.$parent.login_status);
                        });
                    }else{
                        console.log('Username or password is invalid');
                    }
                },function (error){
                    $scope.isLoading = false;
                    $scope.server_error = true;
                    $scope.message = "Server connection error";
                });
            };
        }
    });