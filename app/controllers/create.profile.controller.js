/**
 * Created by prasanna_d on 7/19/2017.
 */
app.controller('ProfileCreateController',['$scope','$http',function ($scope,$http) {
    $scope.test = "asdasdadsasdasd";

    $scope.createProfile = function () {
        console.log('On Create Button Triggered');
        var job_types = [];
        var price_job_types = [];
        var skills = [];

        var description = $scope.description;

        if($scope.myCheckbox){job_types.push(2);price_job_types.push($scope.price1);}
        if($scope.myCheckbox_2){job_types.push(1);price_job_types.push($scope.price2);}
        if($scope.myCheckbox_3){job_types.push(3);price_job_types.push($scope.price3);}

        if($scope.skill1){skills.push(1);}
        if($scope.skill2){skills.push(2);}
        if($scope.skill3){skills.push(3);}
        if($scope.skill4){skills.push(4);}
        if($scope.skill5){skills.push(5);}
        if($scope.skill6){skills.push(6);}
        if($scope.skill7){skills.push(7);}
        if($scope.skill8){skills.push(8);}
        if($scope.skill9){skills.push(9);}
        if($scope.skill10){skills.push(10);}
        if($scope.skill11){skills.push(11);}

        var payment_email = $scope.paypal_email;

        $http({
            method: "POST",
            url: "http://localhost:3000/profile/createProfile",
            data: {description: description, skills: skills, job_types: job_types, payment_email: payment_email, price_job_types: price_job_types}
        }).then(function (resData){
            console.log(resData);
            // $scope.isLoading = false;
            // if(typeof resData.data.status==="undefined"){return $scope.message = "Server connection error";}
            // if(resData.data.status==="success"){
            //     //Create session with the server
            //     //Get the token
            //
            //     console.log(resData.data.token);
            //
            //     AuthService.Login(
            //         resData.data.token,
            //         resData.data.email,
            //         resData.data.firstname,
            //         resData.data.lastname,
            //         function (callback) {
            //             $('#signin_model').modal('hide');
            //             console.log('Authentication Successful');
            //             window.location.reload();
            //         }
            //     );
            //
            // }else{
            //     $scope.message = "Username or password is invalid";
            //     $scope.auth_error = true;
            // }
        },function (error){
            // $scope.isLoading = false;
            // $scope.auth_error = false;
            // $scope.server_error = true;
            // $scope.message = "Server connection error";
            console.log(error);
        });
    };

}]);
