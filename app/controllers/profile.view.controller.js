/**
 * Created by prasanna_d on 7/24/2017.
 */
app.controller('ProfileViewController',
    ['$scope','$http','AuthService','$location','host_url',
        function ($scope,$http,AuthService,$location,host_url) {
            $scope.firstname = '';
            $scope.lastname = '';
            $scope.description = '';
            $scope.email = '';

            $scope.job_types = [{name: "Stylist", value: false, price: 0.0}, {name: "Educator", value: false, price: 0.0},
                {name: "Assistant", value: false, price: 0.0}];

            $scope.skill_types = [{name: "Barber",value: false}, {name: "Makeup",value: false}, {name: "Dry cutting",value: false},
                {name: "Shaving",value: false}, {name: "Hair styling",value: false}, {name: "Wigs cutting",value: false},
                {name: "Curling",value: false}, {name: "Coloring",value: false}, {name: "Color correction",value: false},
                {name: "Long hair",value: false}, {name: "Short hair",value: false}];

            $scope.placeOrder = function (id) {
                var user = AuthService.getUser();
                if(user) {
                    var params = $location.search();
                    var user_id = (params.userid);
                    $location.path('/order/place').search({userid: user_id});
                }else{
                    $('#signin_model').modal('show');
                }
            };

            $scope.$watch(AuthService.isLoginStatus, function (newValue) {
                if(newValue){
                    var user = AuthService.getUser();
                    if(user){
                        if(user.email === $scope.email){
                            $location.path('/profile');
                        }
                    }
                }
            },true);

            $scope.highlightDays = [];

            $scope.onInit = function () {
                var params = $location.search();
                var user_id = (params.userid);
                $http({
                    method: "GET",
                    url: host_url + "profile/getProfilePublic?id="+ user_id
                }).then(function (resData){
                    if(resData){
                        $scope.firstname = resData.data.user[0].firstname;
                        $scope.lastname = resData.data.user[0].lastname;
                        $scope.description = resData.data.stylist[0].description;
                        $scope.email = resData.data.user[0].email;
                        var jobtypeArr = resData.data.jobtypes[0];
                        for(var i=0; i<jobtypeArr.length; i++){
                            $scope.job_types[(jobtypeArr[i].job_id)-1].value=true;
                            $scope.job_types[(jobtypeArr[i].job_id)-1].price=jobtypeArr[i].price;
                        }
                        var skilltypeArr = resData.data.skilltypes[0];
                        for(var j=0; j<skilltypeArr.length; j++){
                            $scope.skill_types[(skilltypeArr[j].skill_id)-1].value = true;
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
            }
        }
]);