/**
 * Created by prasanna on 7/23/17.
 */
app.controller('SearchController',
    ['$scope','$http','AuthService','$location',
        function ($scope,$http,AuthService,$location) {
            $scope.job_types = ["Stylist", "Educator", "Assistant", "Select All"];
            $scope.skill_types = ["Barber", "Makeup", "Dry cutting", "Shaving", "Hair styling",
                "Wigs cutting", "Curling", "Coloring", "Color correction", "Long hair", "Short hair", "Select All"];
            $scope.selectedName = $scope.job_types[0];
            $scope.selectedSkillName = $scope.skill_types[0];
            $scope.empty_results = false;

            $scope.beginSearch = function (skill, jobtype) {
                var jobtypes, skilltype;
                if($scope.job_types.indexOf(jobtype)===3){jobtypes = 'all'}
                else{jobtypes = ($scope.job_types.indexOf(jobtype)+1)}
                if($scope.skill_types.indexOf(skill)===11){skilltype = 'all'}
                else{skilltype = ($scope.skill_types.indexOf(skill)+1)}
                $location.path('/search').search({jobtype: jobtypes, skilltype: skilltype});
            };

            $scope.viewProfile = function (id) {
                var user = AuthService.getUser();
                if(user.id===id){
                    $location.path('/profile');
                }else {
                    $location.path('/profile/view').search({userid: id});
                }
            };

            $scope.placeOrder = function (id) {
                $location.path('/order/place').search({userid: id});
            };

            $scope.search_results = [];
            $scope.onInit = function () {
                var params = $location.search();
                var job_type = (params.jobtype);
                var skill_type = (params.skilltype);

                var query1 = 'typeid=' + job_type;
                var query2 = 'skillid=' + skill_type;
                console.log("search url: http://localhost:3000/search/simplesearch?"+ query2 + "&" + query1);
                $http({
                    method: "GET",
                    url: "http://localhost:3000/search/simplesearch?"+ query2 + "&" + query1
                }).then(function (resData){
                    console.log(resData);
                    var users = resData.data.users;
                    var stylists = resData.data.stylists;
                    var userTypes = resData.data.user_types;
                    var id; var description;
                    for(var i=0; i<users.length; i++){
                        if(typeof stylists[i].id==="undefined"){id = stylists[i][0].id;}
                        else{ id = stylists[i].id;}
                        if(typeof stylists[i].description==="undefined"){description = stylists[i][0].description;}
                        else{ description = stylists[i].description;}
                        var types= '';
                        for(var j=0; j<userTypes.length; j++){
                            if(userTypes[j].user_id===id){
                                if(types===''){
                                    types=$scope.job_types[(userTypes[j].job_id)-1];
                                }else{
                                    types=types + ', ' + $scope.job_types[(userTypes[j].job_id)-1];
                                }
                            }
                        }
                        if(description.length>200){
                            description = description.substring(0,200) + '....';
                        }

                        var disable = false;
                        var user = AuthService.getUser();
                        if(user.id===users[i][0].id){disable=true;}
                        else {disable=false;}

                        $scope.search_results.push({
                            firstname: users[i][0].firstname,
                            lastname: users[i][0].lastname,
                            acctypes: types,
                            id: users[i][0].id,
                            price: "$2400",
                            rates: "0.0",
                            location: "Sidney",
                            description: description,
                            disable: disable
                        });
                    }
                    if($scope.search_results.length===0){
                        $scope.empty_results = true;
                    }else{$scope.empty_results = false;}
                },function (error){
                    console.log('Error on searching profile: ' + error);
                });
            };

        }
]);