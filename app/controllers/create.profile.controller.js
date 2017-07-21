/**
 * Created by prasanna_d on 7/19/2017.
 */
app.controller('ProfileCreateController',
    ['$scope','$http','$location', 'AuthService',
        function ($scope,$http,$location, AuthService) {

    //Error showing flags
    $scope.des_error = false;
    $scope.skill_error = false;
    $scope.prof_type_error = false;
    $scope.paypal_email_error = false;
    $scope.prof_type_price_error = false;
    $scope.isStartCreate= false;

    //User details
    $scope.firstname = '';
    $scope.lastname = '';
    $scope.email = '';

    //Description character count
    $scope.desLength= 0;
    $scope.characters = 1000;
    $scope.chrLengthError = false;

    $scope.updateDesLength = function () {
        if($scope.description.length > 1000){
            $scope.characters = $scope.description.length - 1000;
            $scope.chrLengthError = true;
        }else{
            $scope.characters = 1000 - $scope.description.length;
            $scope.chrLengthError = false;
        }
    };

    $scope.onInit = function () {
        var user = AuthService.getUser();
        if(user){
            $scope.firstname = user.firstname;
            $scope.lastname = user.lastname;
            $scope.email = user.email;
        }else{
            $location.path('/');
        }
    };

    $scope.createProfile = function () {
        //Display the loading image
        $scope.isStartCreate = true;

        //Reset error flags
        $scope.des_error = false;
        $scope.prof_type_price_error = false;
        $scope.skill_error = false;
        $scope.prof_type_error = false;
        $scope.paypal_email_error = false;

        //Starting data validation
        console.log('On Create Button Triggered, Starting validate');
        var isValidate = true;

        if($scope.chrLengthError){isValidate = false;}

        if(typeof $scope.description === 'undefined' || $scope.description === ''){
            $scope.des_error = true;
            isValidate = false;
        }

        if((typeof $scope.myCheckbox === 'undefined' &&
            typeof $scope.myCheckbox_2 === 'undefined' &&
            typeof $scope.myCheckbox_3 === 'undefined') ||
            !($scope.myCheckbox ||
            $scope.myCheckbox_2 ||
            $scope.myCheckbox_3)){
            $scope.prof_type_error = true;
            isValidate = false;
        }

        if($scope.myCheckbox && (typeof $scope.price1=== 'undefined' || $scope.price1 ==='')){
            $scope.prof_type_price_error = true; isValidate= false;
        }

        if($scope.myCheckbox_2 && (typeof $scope.price2=== 'undefined' || $scope.price2 ==='')){
            $scope.prof_type_price_error = true; isValidate= false;
        }

        if($scope.myCheckbox_3 && (typeof $scope.price3=== 'undefined' || $scope.price3 ==='')){
            $scope.prof_type_price_error = true; isValidate= false;
        }

        if((typeof $scope.skill1 === 'undefined' && typeof $scope.skill2 === 'undefined' &&
            typeof $scope.skill3 === 'undefined' && typeof $scope.skill4 === 'undefined' &&
            typeof $scope.skill5 === 'undefined' && typeof $scope.skill6 === 'undefined' &&
            typeof $scope.skill7 === 'undefined' && typeof $scope.skill8 === 'undefined' &&
            typeof $scope.skill9 === 'undefined' && typeof $scope.skill10 === 'undefined' &&
            typeof $scope.skill11 === 'undefined') ||
                        !($scope.skill1 ||
                        $scope.skill1 || $scope.skill4 || $scope.skill7 || $scope.skill10 ||
                        $scope.skill2 || $scope.skill5 || $scope.skill8 || $scope.skill11 ||
                        $scope.skill3 || $scope.skill6 || $scope.skill9)){
            $scope.skill_error = true;
            isValidate = false;
        }

        if(typeof $scope.paypal_email === 'undefined' || $scope.paypal_email === ''){
            $scope.paypal_email_error = true;
            isValidate = false;
        }

        if(isValidate){
            var job_types = [];
            var price_job_types = [];
            var skills = [];

            var description = $scope.description;

            if($scope.myCheckbox){job_types.push(2);price_job_types.push($scope.price1);}
            if($scope.myCheckbox_2){job_types.push(1);price_job_types.push($scope.price2);}
            if($scope.myCheckbox_3){job_types.push(3);price_job_types.push($scope.price3);}

            if($scope.skill1){skills.push(1);} if($scope.skill2){skills.push(2);}
            if($scope.skill3){skills.push(3);} if($scope.skill4){skills.push(4);}
            if($scope.skill5){skills.push(5);} if($scope.skill6){skills.push(6);}
            if($scope.skill7){skills.push(7);} if($scope.skill8){skills.push(8);}
            if($scope.skill9){skills.push(9);} if($scope.skill10){skills.push(10);}
            if($scope.skill11){skills.push(11);}

            var payment_email = $scope.paypal_email;

            $http({
                method: "POST",
                url: "http://localhost:3000/profile/createProfile",
                data: {description: description, skills: skills, job_types: job_types, payment_email: payment_email, price_job_types: price_job_types}
            }).then(function (resData){
                console.log(resData);
                $scope.isStartCreate = false;
                $location.path('/profile');
            },function (error){
                $scope.isStartCreate = false;
                console.log('Error on creating profile: ' + error);
                $scope.des_error = false;
                $scope.prof_type_price_error = false;
                $scope.skill_error = false;
                $scope.prof_type_error = false;
                $scope.paypal_email_error = false;
            });
        }else{
            //Reset the loading image
            $scope.isStartCreate = false;
        }
    };
}]);
