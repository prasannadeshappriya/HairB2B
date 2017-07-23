/**
 * Created by prasanna on 7/23/17.
 */
app.controller('AccSettingsController',
    ['$scope','$http','AuthService',
        function ($scope,$http,AuthService) {
            $scope.submitted = false;       //Error showing only after submit button clicked
            $scope.server_error = false;    //Check connection Errors
            $scope.isComplete = false;      //Check all the fields are filled
            $scope.repass = false;          //Check password match only after user retype password

            //-------------------------Show Success/Danger alert boxes
            $scope.success = false;
            $scope.danger = false;

            //-------------------------Password Character Error---------------
            $scope.new_password_chr_error = false;

            $scope.resetSubmitted = function () {
                $scope.submitted = false;
                $scope.server_error = false;
                try {
                    if ($scope.newPassword.length !== 'undefined') {
                        if ($scope.newPassword.length === 0) {
                            $scope.new_password_chr_error = false;
                        } else if ($scope.newPassword.length >= 8) {
                            $scope.new_password_chr_error = false;
                        } else {
                            $scope.new_password_chr_error = true;
                        }
                    }
                } catch (err) {
                    $scope.new_password_chr_error = false;
                }
            };

            $scope.setRePass = function () {
                if($scope.newPassword==="" || typeof $scope.newPassword==="undefined"){$scope.repass = false;}
                else {$scope.repass = true;}
            };

            $scope.validate = function () {
                if (typeof $scope.password === "undefined" || $scope.password === "") {
                    $scope.isComplete = false;return;
                }
                if (typeof $scope.newPassword === "undefined" || $scope.newPassword === "") {
                    $scope.isComplete = false;return;
                }
                if($scope.newPassword !== $scope.reNewPassword){$scope.isComplete = false;return;}
                $scope.isComplete = true;
            };

            profile_section = function () {
                console.log('asdasdasd');
            };

            onInit = function () {
                console.log('Initialization completed');
                $scope.success = false;
                $scope.danger = false;
            };

            $scope.submit = function () {
                $scope.submitted = true;
                if(!$scope.isComplete){return;}
                if($scope.new_password_chr_error){return;}
                console.log('test');
            };
        }
]);
