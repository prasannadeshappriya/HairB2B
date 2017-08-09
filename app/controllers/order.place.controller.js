/**
 * Created by prasanna_d on 7/24/2017.
 */
app.controller('OrderPlaceController',
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
                    var total = (($scope.date_count)*($scope.rate))+($scope.other);
                    $scope.total = (total);
                }
            }, true);

            $scope.logMonthChanged = function(newMonth, oldMonth){
                console.log(newMonth + ' ' + oldMonth);
            };

            $scope.location = [{name: 'Sidney'}];
            $scope.selectedLocation = $scope.location[0].name;
            $scope.JobType = [{name: 'Stylist', price: 0.0, value: false},
                                {name: 'Educator', price: 0.0, value: false},
                                {name: 'Assistant', price: 0.0, value: false}];
            $scope.rate = 0.0;
            $scope.other = 100;
            $scope.total = 0.0;
            $scope.selectedJobType = $scope.JobType[0].name;

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
                    }
                },function (error){
                    if(error.status===504){
                        console.log('404 Not Found [id: ' + user_id);
                    }
                    console.log('Error on searching profile: ' + error);
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
                // var a = moment().get();
                // console.log($scope.today._d.getYear());
                // console.log($scope.today._d.getMonth());
            };
        }
]);
