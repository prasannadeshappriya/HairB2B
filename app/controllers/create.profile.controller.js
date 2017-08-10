/**
 * Created by prasanna_d on 7/19/2017.
 */
app.controller('ProfileCreateController',
    ['$scope','$http','$location', 'AuthService', 'host_url',
        function ($scope,$http,$location, AuthService, host_url) {

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

    $scope.job_types = [{name: "Stylist", value: false, price: 0.0, id: 1}, {name: "Educator", value: false, price: 0.0, id: 2},
        {name: "Assistant", value: false, price: 0.0, id: 3}];

    $scope.skill_types = [{name: "Barber",value: false, id: 1}, {name: "Makeup",value: false, id: 2}, {name: "Dry cutting",value: false, id: 3},
        {name: "Shaving",value: false, id: 4}, {name: "Hair styling",value: false, id: 5}, {name: "Wigs cutting",value: false, id: 6},
        {name: "Curling",value: false, id: 7}, {name: "Coloring",value: false, id: 8}, {name: "Color correction",value: false, id: 9},
        {name: "Long hair",value: false, id: 10}, {name: "Short hair",value: false, id: 11}];

    $scope.reset_des_error = function () {$scope.des_error = false;};
    $scope.reset_skill_error = function () {$scope.skill_error = false;};
    $scope.reset_prof_type_error = function () {$scope.prof_type_error = false;};
    $scope.reset_paypal_email_error = function () {$scope.paypal_email_error = false;};
    $scope.reset_prof_type_price_error = function () {$scope.prof_type_price_error  = false;};

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

        var i=0;
        for(i=0; i<$scope.job_types.length; i++){
            if($scope.job_types[i].value && ($scope.job_types[i].price===null ||
                                                $scope.job_types[i].price===0.0)){
                $scope.prof_type_price_error = true;
                isValidate= false;
            }
        }
        var con = true;    //Check the conditions
        for(i=0; i<$scope.job_types.length; i++){
            if($scope.job_types[i].value){
                con = false;
                break;
            }
        }
        if(con){
            $scope.prof_type_error = true;
            isValidate= false;
        }

        con = true;
        for(i=0; i<$scope.skill_types.length; i++){
            if($scope.skill_types[i].value){
                con = false;
                break;
            }
        }
        if(con){
            $scope.skill_error = true;
            isValidate= false;
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

            for(i=0; i<$scope.job_types.length; i++){
                if($scope.job_types[i].value){
                    job_types.push($scope.job_types[i].id);
                    price_job_types.push($scope.job_types[i].price);
                }
            }

            for(i=0; i<$scope.skill_types.length; i++){
                if($scope.skill_types[i].value){
                    skills.push($scope.skill_types[i].id);
                }
            }

            var payment_email = $scope.paypal_email;

            $http({
                method: "POST",
                url: host_url + "profile/createProfile",
                data: {description: description, skills: skills, job_types: job_types, payment_email: payment_email, price_job_types: price_job_types}
            }).then(function (resData){
                // console.log(resData);
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
