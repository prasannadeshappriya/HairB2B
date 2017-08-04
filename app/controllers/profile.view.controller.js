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

            $scope.skill1 = false; $scope.skill4 = false; $scope.skill7 = false; $scope.skill9 = false;
            $scope.skill2 = false; $scope.skill5 = false; $scope.skill8 = false; $scope.skill10 = false;
            $scope.skill3 = false; $scope.skill6 = false; $scope.skill11 = false;

            $scope.type1 = false; $scope.type2 = false; $scope.type3 = false;
            $scope.price1 = ''; $scope.price2 = ''; $scope.price3 = '';

            $scope.placeOrder = function (id) {
                var user = AuthService.getUser();
                if(user) {
                    $location.path('/order/place').search({userid: id});
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
                            if(jobtypeArr[i].job_id===1){$scope.type1=true; $scope.price1 = jobtypeArr[i].price;}
                            if(jobtypeArr[i].job_id===2){$scope.type2=true; $scope.price2 = jobtypeArr[i].price;}
                            if(jobtypeArr[i].job_id===3){$scope.type3=true; $scope.price3 = jobtypeArr[i].price;}
                        }
                        var skilltypeArr = resData.data.skilltypes[0];
                        for(var j=0; j<skilltypeArr.length; j++){
                            if(skilltypeArr[j].skill_id===1){$scope.skill1=true;}
                            if(skilltypeArr[j].skill_id===2){$scope.skill2=true;}
                            if(skilltypeArr[j].skill_id===3){$scope.skill3=true;}
                            if(skilltypeArr[j].skill_id===4){$scope.skill4=true;}
                            if(skilltypeArr[j].skill_id===5){$scope.skill5=true;}
                            if(skilltypeArr[j].skill_id===6){$scope.skill6=true;}
                            if(skilltypeArr[j].skill_id===7){$scope.skill7=true;}
                            if(skilltypeArr[j].skill_id===8){$scope.skill8=true;}
                            if(skilltypeArr[j].skill_id===9){$scope.skill9=true;}
                            if(skilltypeArr[j].skill_id===10){$scope.skill10=true;}
                            if(skilltypeArr[j].skill_id===11){$scope.skill11=true;}
                        }
                    }
                },function (error){
                    if(error.status===504){
                        console.log('404 Not Found [id: ' + user_id);
                    }
                    console.log('Error on searching profile: ' + error);
                });
            }
        }
]);