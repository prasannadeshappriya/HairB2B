/**
 * Created by prasanna_d on 7/18/2017.
 */
app.controller('ProfileController',
    ['$scope','$http','AuthService','$location','host_url',
        function ($scope,$http,AuthService,$location,host_url) {

    //Calendar
    $scope.date_count = 0;
    var busy_dates = [];

    $scope.today = moment();
    console.log($scope.today._d);
    $scope.myMonth = moment().add(1, 'MONTH');


    $scope.highlightDays = [
        // {date: moment().date(2), css: 'holiday', selectable: false, title: 'Busy'},
        // {date: moment().date(14), css: 'holiday', selectable: false, title: 'Busy'}
    ];

    // $scope.myArrayOfDates = [moment().date(4), moment().date(5), moment().date(8)];
    $scope.myArrayOfDates = [];

    $scope.$watch('myArrayOfDates', function (newValue) {
        if (newValue) {
            $scope.date_count = newValue.length;
            if($scope.date_count>0){
                //Might have to check other conditions here
                $scope.btnBusyEnable = true;
            }else{$scope.btnBusyEnable = false;}
        }
    }, true);

    $scope.logMonthChanged = function(newMonth, oldMonth){
        console.log(newMonth + ' ' + oldMonth);
    };

    $scope.markAsBusy = function () {
           console.log($scope.myArrayOfDates);
    };

    //User details
    $scope.firstname = '';
    $scope.lastname = '';
    $scope.email = '';
    $scope.description = '';

    $scope.skill1 = false; $scope.skill4 = false; $scope.skill7 = false; $scope.skill9 = false;
    $scope.skill2 = false; $scope.skill5 = false; $scope.skill8 = false; $scope.skill10 = false;
    $scope.skill3 = false; $scope.skill6 = false; $scope.skill11 = false;

    $scope.type1 = false; $scope.type2 = false; $scope.type3 = false;

    $scope.btnBusyEnable = false; //Enable the button
    $scope.onInit = function () {
        var user = AuthService.getUser();
        if(user){
            $scope.firstname = user.firstname;
            $scope.lastname = user.lastname;
            $scope.email = user.email;

            $http({
                method: "GET",
                url: host_url + "profile/getProfile"
            }).then(function (resData){
                // console.log('Server response :');
                // console.log(resData);
                $scope.description = resData.data.description;
                for(var i=0; i<resData.data.job_types.length; i++){
                    if(resData.data.job_types[i]===1){$scope.type1=true;}
                    if(resData.data.job_types[i]===2){$scope.type2=true;}
                    if(resData.data.job_types[i]===3){$scope.type3=true;}
                }
                for(var j=0; j<resData.data.skills.length; j++){
                    if(resData.data.skills[j]===1){$scope.skill1=true;}
                    if(resData.data.skills[j]===2){$scope.skill2=true;}
                    if(resData.data.skills[j]===3){$scope.skill3=true;}
                    if(resData.data.skills[j]===4){$scope.skill4=true;}
                    if(resData.data.skills[j]===5){$scope.skill5=true;}
                    if(resData.data.skills[j]===6){$scope.skill6=true;}
                    if(resData.data.skills[j]===7){$scope.skill7=true;}
                    if(resData.data.skills[j]===8){$scope.skill8=true;}
                    if(resData.data.skills[j]===9){$scope.skill9=true;}
                    if(resData.data.skills[j]===10){$scope.skill10=true;}
                    if(resData.data.skills[j]===11){$scope.skill11=true;}
                }
            },function (error){
                $location.path('/');
                console.log('Error occurred: ' + error);
            });

        }else{
            $location.path('/');
        }
    }
}]);