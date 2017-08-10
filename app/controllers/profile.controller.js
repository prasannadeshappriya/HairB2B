/**
 * Created by prasanna_d on 7/18/2017.
 */
app.controller('ProfileController',
    ['$scope','$http','AuthService','$location','host_url',
        function ($scope,$http,AuthService,$location,host_url) {

    //Calendar
    $scope.date_count = 0;

    $scope.today = moment();
    console.log($scope.today._d);
    $scope.myMonth = moment().add(1, 'MONTH');


    $scope.highlightDays = [];

    // $scope.myArrayOfDates = [moment().date(4), moment().date(5), moment().date(8)];
    $scope.myArrayOfDates = []; //moment("2017-07-20")

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



    $scope.checkSelection = function(event, date) {
        var i=0;
        var selectedDate = date.date._d.getYear() + '' +
                            date.date._d.getMonth() + '' +
                            date.date._d.getDate();
        for(i=0; i<$scope.highlightDays.length; i++){
            try {
                var busyDate = $scope.highlightDays[i].date._d.getYear() + '' +
                    $scope.highlightDays[i].date._d.getMonth() + '' +
                    $scope.highlightDays[i].date._d.getDate();
            }catch (err){}
            if(selectedDate===busyDate){
                $scope.highlightDays.splice(i,1);
                $scope.myArrayOfDates.push(date.date);
                break
            }
        }
    };

    //User details
    $scope.firstname = '';
    $scope.lastname = '';
    $scope.email = '';
    $scope.description = '';

    $scope.job_types = [{name: "Stylist", value: false}, {name: "Educator", value: false},
        {name: "Assistant", value: false}];

    $scope.skill_types = [{name: "Barber",value: false}, {name: "Makeup",value: false}, {name: "Dry cutting",value: false},
        {name: "Shaving",value: false}, {name: "Hair styling",value: false}, {name: "Wigs cutting",value: false},
        {name: "Curling",value: false}, {name: "Coloring",value: false}, {name: "Color correction",value: false},
        {name: "Long hair",value: false}, {name: "Short hair",value: false}];

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
                // console.log(resData);
                $scope.description = resData.data.description;
                for(var i=0; i<resData.data.job_types.length; i++){
                    $scope.job_types[i].value = true;
                }
                for(var j=0; j<resData.data.skills.length; j++){
                    $scope.skill_types[j].value=true;
                }
                $http({
                    method: "GET",
                    url: host_url + "profile/getBusyDates"
                }).then(function (resData){
                    // highlightDays
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
                    $location.path('/');
                    console.log('Error occurred: ' + error);
                });
            },function (error){
                $location.path('/');
                console.log('Error occurred: ' + error);
            });
        }else{
            $location.path('/');
        }
    };

    $scope.reset = function () {
        var user = AuthService.getUser();
        if(user){
            $http({
                method: "GET",
                url: host_url + "profile/getBusyDates"
            }).then(function (resData){
                var busy_dates = resData.data.busy_dates;
                $scope.highlightDays = [];
                $scope.myArrayOfDates = [];
                for(var i=0; i<busy_dates.length; i++){
                    $scope.highlightDays.push({
                        date: moment(busy_dates[i]),
                        css: 'holiday',
                        selectable: false,
                        title: 'Busy'
                    });
                }
            },function (error){
                $location.path('/');
                console.log('Error occurred: ' + error);
            });
        }else{
            $location.path('/');
        }
    };

    $scope.update = function () {
        if(typeof $scope.chkBusy==='undefined' || !($scope.chkBusy)){
            var ret = [];
            for (i = 0; i < $scope.highlightDays.length; i++) {
                if (typeof $scope.highlightDays[i].date._i === 'undefined') {
                    var year = $scope.highlightDays[i].date._d.getFullYear();
                    var month = $scope.highlightDays[i].date._d.getMonth();
                    month = (parseInt(month) + 1);
                    if (parseInt(month) < 10) {
                        month = '0' + month;
                    }
                    var day = $scope.highlightDays[i].date._d.getDate();
                    ret.push(year + '-' + month + '-' + day);
                } else {
                    ret.push($scope.highlightDays[i].date._i);
                }
            }
            $http({
                method: "POST",
                url: host_url + "profile/updateBusyDates",
                data: {busydates: ret}
            }).then(function (resData) {
                console.log('Busy dates are updated');
            }, function (error) {
                $location.path('/');
                console.log('Error occurred: ' + error);
            });
            $scope.myArrayOfDates = [];
        }else {
            var i = 0;
            for (i = 0; i < $scope.myArrayOfDates.length; i++) {
                $scope.highlightDays.push({
                    date: $scope.myArrayOfDates[i],
                    css: 'holiday',
                    selectable: false,
                    title: 'Busy'
                });
            }
            var ret = [];
            for (i = 0; i < $scope.highlightDays.length; i++) {
                if (typeof $scope.highlightDays[i].date._i === 'undefined') {
                    var year = $scope.highlightDays[i].date._d.getFullYear();
                    var month = $scope.highlightDays[i].date._d.getMonth();
                    month = (parseInt(month) + 1);
                    if (parseInt(month) < 10) {
                        month = '0' + month;
                    }
                    var day = $scope.highlightDays[i].date._d.getDate();
                    ret.push(year + '-' + month + '-' + day);
                } else {
                    ret.push($scope.highlightDays[i].date._i);
                }
            }
            $http({
                method: "POST",
                url: host_url + "profile/updateBusyDates",
                data: {busydates: ret}
            }).then(function (resData) {
                console.log('Busy dates are updated');
            }, function (error) {
                $location.path('/');
                console.log('Error occurred: ' + error);
            });
            $scope.myArrayOfDates = [];
        }
    };
}]);