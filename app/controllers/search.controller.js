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
                console.log($scope.job_types.indexOf(skill));
                // $location.path('/search?jobtype=2&skilltype=4');
                $location.path('/search').search({jobtype: $scope.job_types.indexOf(jobtype), skilltype: $scope.skill_types.indexOf(skill)});
            };

            $scope.search_results = [];
            $scope.onInit = function () {
                var params = $location.search();
                var job_type = (params.jobtype+1);
                var skill_type = (params.skilltype+1);
                console.log(job_type);
                console.log(skill_type);

                var query1;
                var query2;
                if(job_type==4){query1 = 'typeid=all';}
                else{query1 = 'typeid=' + job_type;}
                if(skill_type==12){query2 = 'skillid=all';}
                else{query2 = 'skillid=' + skill_type;}
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
                        $scope.search_results.push({
                            firstname: users[i][0].firstname,
                            lastname: users[i][0].lastname,
                            acctypes: types,
                            price: "$2400",
                            rates: "0.0",
                            location: "Sidney",
                            description: description
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