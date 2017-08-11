/**
 * Created by prasanna_d on 7/24/2017.
 */
app.controller('OrderPlaceController',
    ['$scope','$http','AuthService','$location','host_url',
        function ($scope,$http,AuthService,$location,host_url) {
            //Calendar
            $scope.date_count = 0;
            var busy_dates = [];

            $scope.min_date = moment().utc().format("YYYY-MM-DDTHH:MM:SS");
            $scope.today = moment();
            $scope.highlightDays = [];
            $scope.myArrayOfDates = [];

            $scope.$watch('myArrayOfDates', function (newValue) {
                $scope.orderDateErr = false;
                if (newValue) {
                    $scope.date_count = newValue.length;
                    var total = (($scope.date_count)*($scope.rate))+($scope.other);
                    $scope.total = (total);
                }
            }, true);

            $scope.location = [{name: 'Sidney'}];
            $scope.selectedLocation = $scope.location[0].name;
            $scope.JobType = [{name: 'Stylist', price: 0.0, value: false},
                                {name: 'Educator', price: 0.0, value: false},
                                {name: 'Assistant', price: 0.0, value: false}];
            $scope.rate = 0.0;
            $scope.other = 100;
            $scope.total = 0.0;
            $scope.selectedJobType = $scope.JobType[0].name;

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

            $scope.reset_des_error = function () {$scope.des_error = false;};
            $scope.orderDateErr = false;

            $scope.first_name = '';
            $scope.last_name = '';

            $scope.onInit = function () {
                var params = $location.search();
                var user_id = (params.userid);
                $http({
                    method: "GET",
                    url: host_url + "profile/getProfilePublic?id="+ user_id
                }).then(function (resData){
                    // console.log(resData);
                    if(resData){
                        $scope.first_name = resData.data.user[0].firstname;
                        $scope.last_name = resData.data.user[0].lastname;
                        var jobtypes = resData.data.jobtypes[0], i;
                        for(i=0; i<jobtypes.length; i++){
                            $scope.JobType[parseInt(jobtypes[i].job_id)-1].value = true;
                            $scope.JobType[parseInt(jobtypes[i].job_id)-1].price = jobtypes[i].price;
                        }
                        for(i=0; i<$scope.JobType.length; i++){
                            if($scope.JobType[i].value){
                                $scope.rate = $scope.JobType[i].price;
                                $scope.selectedJobType = $scope.JobType[i].name;
                                break;
                            }
                        }
                        $http({
                            method: "GET",
                            url: host_url + "profile/getBusyDatesPublic?id="+ user_id
                        }).then(function (resData){
                            // console.log(resData);
                            var busy_dates = resData.data.busy_dates;
                            $scope.highlightDays = [];
                            for(var i=0; i<busy_dates.length; i++){
                                $scope.highlightDays.push({
                                    date: moment(busy_dates[i]),
                                    css: 'holiday',
                                    selectable: false,
                                    title: 'Busy'
                                });
                            }
                        },function (error){
                            if(error.status===504){
                                console.log('404 Not Found [id: ' + user_id);
                                $location.path('/');
                            }
                            console.log('Error on searching profile: ' + error);
                            $location.path('/');
                        });
                    }
                },function (error){
                    if(error.status===504){
                        console.log('404 Not Found [id: ' + user_id);
                        $location.path('/');
                    }
                    console.log('Error on searching profile: ' + error);
                    $location.path('/');
                });
            };

            $scope.onClickJobType = function () {
                for(var i=0; i<$scope.JobType.length; i++){
                    if($scope.JobType[i].name===$scope.selectedJobType){
                        $scope.rate = $scope.JobType[i].price;
                        var total = (($scope.date_count)*($scope.rate))+($scope.other);
                        $scope.total = total;
                        break;
                    }
                }
            };

            $scope.proceed = function () {
                var con = true;
                if($scope.date_count===0){
                    $scope.orderDateErr = true;
                    con = false;
                }
                if($scope.description==='' || typeof $scope.description==='undefined'){
                    $scope.des_error = true;
                    con = false;
                }
                if(con){
                    console.log('Proceed');
                }
            };
        }
]);
