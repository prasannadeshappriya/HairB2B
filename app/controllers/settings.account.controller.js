/**
 * Created by prasanna on 7/23/17.
 */
app.controller('AccSettingsController',
    ['$scope','$http','AuthService','host_url','$location',
        function ($scope,$http,AuthService,host_url,$location) {
            $scope.job_types = [{name: "Stylist", value: false, price: 0.0}, {name: "Educator", value: false, price: 0.0},
                {name: "Assistant", value: false, price: 0.0}];

            $scope.skill_types = [{name: "Barber",value: false}, {name: "Makeup",value: false}, {name: "Dry cutting",value: false},
                {name: "Shaving",value: false}, {name: "Hair styling",value: false}, {name: "Wigs cutting",value: false},
                {name: "Curling",value: false}, {name: "Coloring",value: false}, {name: "Color correction",value: false},
                {name: "Long hair",value: false}, {name: "Short hair",value: false}];

            $scope.submitted = false;       //Error showing only after submit button clicked
            $scope.isComplete = false;      //Check all the fields are filled
            $scope.repass = false;          //Check password match only after user retype password
            $scope.des_error = false;       //Check account description is empty or not

            //-------------------------Show Success/Danger alert boxes
            $scope.success = false;
            $scope.danger = false;
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

            $scope.resetAlertBoxes = function () {
                $scope.success = false;
                $scope.danger = false;
                $scope.message = '';
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

                var user = AuthService.getUser();
                if(user){
                    $http({
                        method: "GET",
                        url: host_url + "profile/getAccountAndSettings"
                    }).then(function (resData){
                        console.log('Getting user saved information');
                        // console.log(resData);
                        var jobtypes = resData.data.jobtypes;
                        var skilltypes = resData.data.skilltypes;
                        var i=0;
                        for(i=0; i<$scope.job_types.length; i++){
                            $scope.job_types[i].value = false;
                        }
                        for(i=0; i<jobtypes.length; i++){
                            $scope.job_types[(jobtypes[i].job_id)-1].value = true;
                            $scope.job_types[(jobtypes[i].job_id)-1].price = jobtypes[i].price;
                        }
                        for(i=0; i<$scope.skill_types.length; i++){
                            $scope.skill_types[i].value = false;
                        }
                        for(i=0; i<skilltypes.length; i++){
                            $scope.skill_types[(skilltypes[i].skill_id)-1].value = true;
                        }
                    },function (error){
                        $location.path('/');
                        console.log('Error occurred: ' + error);
                    });

                }else{
                    $location.path('/');
                }

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
                $scope.success = false;
                $scope.danger = false;
                $http({
                    method: "GET",
                    url: host_url + "profile/getProfileStatus"
                }).then(function (resData){
                    //Profile Found
                    $scope.accDescription = true;
                    $scope.accSkills = true;

                    $http({
                        method: "GET",
                        url: host_url + "profile/getProfileForEdit"
                    }).then(function (resData) {
                        //Profile Found
                        $scope.description = resData.data.stylist.description;
                        $scope.characters = (1000-$scope.description.length);
                    },function (error) {
                        console.log('Sever error occurred, redirecting to home');
                        $location.path('/');
                    });
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

            $scope.saveProfile = function () {
                $scope.des_error = false;
                if($scope.description.length===0 || typeof $scope.description==='undefined'){
                    $scope.des_error = true;
                }
                if(!($scope.des_error) && !($scope.chrLengthError)) {
                    $http({
                        method: "POST",
                        url: host_url + "profile/updateProfile",
                        data: {description: $scope.description}
                    }).then(function (resData) {
                        $scope.success = true;
                        $scope.message = 'Profile updated successfully!';
                    }, function (error) {
                        console.log('Error: ' + error);
                    });
                }
            };

            $scope.changePassword = function () {
                $scope.success = false;
                $scope.danger = false;
                $scope.submitted = true;
                if(!$scope.isComplete){return;}
                if($scope.new_password_chr_error){return;}
                if($scope.password===$scope.newPassword){
                    $scope.danger = true;
                    $scope.message = "New password must be different from old password";
                    return;
                }
                $http({
                    method: "POST",
                    url: host_url + "profile/changePassword",
                    data: {curPassword: $scope.password, newPassword: $scope.newPassword}
                }).then(function (resData){
                    console.log(resData);
                    if(resData.status===200){
                        $scope.success = true;
                        $scope.message = "Your password changed successfully!";
                        $scope.danger = false;
                        //Reset all password fields
                        $scope.submitted = false;
                        $scope.password = "";
                        $scope.newPassword = "";
                        $scope.reNewPassword = "";

                    }
                },function (error){
                    if(error.status===401){
                        $scope.success = false;
                        $scope.danger = true;
                        $scope.message = "Current password is invalid!";
                    }else {
                        $scope.success = false;
                        $scope.danger = true;
                        $scope.message = "Server Error";
                    }
                });
            };

            $scope.job_type_err = false;
            $scope.skill_error = false;
            $scope.saveSkillsJobTypes = function () {
                var i;
                $scope.job_type_err = true;
                for(i=0; i<$scope.job_types.length; i++){
                    if($scope.job_types[i].value){$scope.job_type_err = false;break;}
                }
                $scope.skill_error = true;
                for(i=0; i<$scope.skill_types.length; i++){
                    if($scope.skill_types[i].value){$scope.skill_error = false;break;}
                }

                if(!($scope.job_type_err) && !($scope.skill_error)){
                    // console.log('Can Update');
                    var skill_types_arr = [];
                    for(i=0; i<$scope.skill_types.length; i++){
                        if($scope.skill_types[i].value){skill_types_arr.push(i+1);}
                    }
                    var job_types_arr = [];
                    for(i=0; i<$scope.job_types.length; i++){
                        if($scope.job_types[i].value){
                            var tmp = [];
                            tmp.push(i+1, $scope.job_types[i].price);
                            job_types_arr.push(tmp);
                        }
                    }
                    $http({
                        method: "POST",
                        url: host_url + "profile/updateProfileSkillsTypes",
                        data: {job_types_arr: job_types_arr, skill_types_arr: skill_types_arr}
                    }).then(function (resData){
                        // console.log(resData);
                        if(resData.status===200){
                            $scope.success = true;
                            $scope.message = "Profile updated successfully!";
                            $scope.danger = false;
                        }
                    },function (error){
                        $scope.success = false;
                        $scope.danger = true;
                        $scope.message = "Server Error";
                    });
                }
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
