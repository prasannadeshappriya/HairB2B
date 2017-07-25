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
            $scope.password_save_error = false;
            $scope.message = '';

            //-------------------------Show Sections
            $scope.password_reset_section = false;
            $scope.profile_reset_section = true;
            $scope.skills_jobtype_section = false;
            $scope.payment_section = false;

            //-------------------------Password Character Error
            $scope.new_password_chr_error = false;

            //Description character count
            $scope.desLength= 0;
            $scope.characters = 1000;
            $scope.chrLengthError = false;

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

            $scope.profile = function () {
                $scope.profile_reset_section = true;
                $scope.password_reset_section = false;
                $scope.skills_jobtype_section = false;
                $scope.payment_section = false;
            };

            $scope.payment = function () {
                $scope.profile_reset_section = false;
                $scope.password_reset_section = false;
                $scope.skills_jobtype_section = false;
                $scope.payment_section = true;
            };

            $scope.skills_jobtypes = function () {
                $scope.profile_reset_section = false;
                $scope.password_reset_section = false;
                $scope.skills_jobtype_section = true;
                $scope.payment_section = false;
            };

            $scope.password_reset = function () {
                $scope.password_reset_section = true;
                $scope.profile_reset_section = false;
                $scope.skills_jobtype_section = false;
                $scope.payment_section = false;
            };

            $scope.accDescription = false;
            $scope.accSkills = false;

            $scope.onInit = function () {
                console.log('Initialization completed');
                $scope.success = false;
                $scope.danger = false;
                $http({
                    method: "GET",
                    url: "http://localhost:3000/profile/getProfileStatus"
                }).then(function (resData){
                    //Profile Found
                    $scope.accDescription = true;
                    $scope.accSkills = true;
                },function (error){
                    if(error.status===404){
                        //No Profile found
                        $scope.accDescription = false;
                        $scope.accSkills = false;
                    }else {
                        console.log('Sever connection error occurred, redirecting to home');
                        $location.path('/');
                    }
                });
            };

            $scope.changePassword = function () {
                $scope.submitted = true;
                if(!$scope.isComplete){return;}
                if($scope.new_password_chr_error){return;}
                if($scope.password===$scope.newPassword){
                    $scope.password_save_error = true;
                    return;
                }else{$scope.password_save_error = false;}
                $http({
                    method: "POST",
                    url: "http://localhost:3000/profile/changePassword",
                    data: {curPassword: $scope.password, newPassword: $scope.newPassword}
                }).then(function (resData){
                    console.log(resData);
                    if(resData.status===200){
                        $scope.success = true;
                        $scope.danger = false;
                        $scope.password_save_error = false;
                    }
                },function (error){
                    if(error.status===401){
                        $scope.success = false;
                        $scope.danger = false;
                        $scope.message = "New password must be different from old password";
                        $scope.password_save_error = true;
                    }else {
                        $scope.success = false;
                        $scope.danger = true;
                        $scope.password_save_error = false;
                    }
                });
            };

            $scope.updateDesLength = function () {
                if($scope.description.length > 1000){
                    $scope.characters = $scope.description.length - 1000;
                    $scope.chrLengthError = true;
                }else{
                    $scope.characters = 1000 - $scope.description.length;
                    $scope.chrLengthError = false;
                }
            };

            $scope.reset_des_error = function () {$scope.des_error = false;};
        }
]);
