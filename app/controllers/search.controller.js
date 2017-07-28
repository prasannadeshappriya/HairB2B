/**
 * Created by prasanna on 7/23/17.
 */
app.controller('SearchController',
    ['$scope','$http','AuthService','$location','host_url',
        function ($scope,$http,AuthService,$location,host_url) {
            $scope.job_types = [{name: "Stylist", value: false}, {name: "Educator", value: false},
                {name: "Assistant", value: false}, {name: "Select All", value: false}];

            $scope.skill_types = [{name: "Barber",value: false}, {name: "Makeup",value: false}, {name: "Dry cutting",value: false},
                {name: "Shaving",value: false}, {name: "Hair styling",value: false}, {name: "Wigs cutting",value: false},
                {name: "Curling",value: false}, {name: "Coloring",value: false}, {name: "Color correction",value: false},
                {name: "Long hair",value: false}, {name: "Short hair",value: false}, {name: "Select All",value: false}];

            $scope.selectedName = $scope.job_types[0].name;
            $scope.selectedSkillName = $scope.skill_types[0].name;
            $scope.empty_results = false;

            $scope.test = function (test) {
                // console.log('asdasda: ' + test);
                    // console.log($scope.job);
            };

            $scope.beginSearch = function (skill, jobtype) {
                var jobtypes, skilltype, index;
                for(index=0; index<$scope.job_types.length; index++){
                    if($scope.job_types[index].name===jobtype){
                        if(index===3){jobtypes = 'all';}else{jobtypes=(index+1);}
                        break;
                    }
                }
                for(index=0; index<$scope.skill_types.length; index++){
                    if($scope.skill_types[index].name===skill){
                        if(index===11){skilltype = 'all';}else{skilltype=(index+1);}
                        break;
                    }
                }
                $location.path('/search').search({jobtype: jobtypes, skilltype: skilltype});
            };

            $scope.viewProfile = function (id) {
                var user = AuthService.getUser();
                if(user) {
                    if (user.id === id) {
                        $location.path('/profile');
                    } else {
                        $location.path('/profile/view').search({userid: id});
                    }
                }else{$location.path('/profile/view').search({userid: id});}
            };

            $scope.placeOrder = function (id) {
                var user = AuthService.getUser();
                if(user) {
                    $location.path('/order/place').search({userid: id});
                }else{
                    $('#signin_model').modal('show');
                }
            };

            $scope.search_results = [];
            $scope.onInit = function () {
                var params = $location.search();
                var job_type = (params.jobtype);
                var skill_type = (params.skilltype);
                var index = 0;
                for(index=0; index<$scope.job_types.length; index++){$scope.job_types[index].value=false;}
                for(index=0; index<$scope.skill_types.length; index++){$scope.skill_types[index].value=false;}
                if(job_type==='all'){$scope.job_types[3].value = true}
                else{
                    try {
                        $scope.job_types[(job_type)].value = true
                    }catch (err){
                        console.log(err);
                        console.log('Invalid job type:' + job_type);
                    }
                }
                if(skill_type==='all'){$scope.skill_types[11].value = true}
                else{
                    try {
                        $scope.skill_types[(job_type)].value = true
                    }catch (err){
                        console.log(err);
                        console.log('Invalid skill type:' + skill_type);
                    }
                }
                console.log('asdasmsojasoidfjkasfd: ' + $scope.skill_types[0].name);
                var query1 = 'typeid=' + job_type;
                var query2 = 'skillid=' + skill_type;
                console.log("search url: http://localhost:3000/search/simplesearch?"+ query2 + "&" + query1);
                $http({
                    method: "GET",
                    url: host_url + "search/simplesearch?"+ query2 + "&" + query1
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
                        console.log('---------------------');
                        console.log(userTypes);
                        console.log('---------------------');
                        for(var j=0; j<userTypes.length; j++){
                            if(userTypes[j].user_id===id){
                                if(types===''){
                                    types=$scope.job_types[(userTypes[j].job_id)-1].name;
                                }else{
                                    types=types + ', ' + $scope.job_types[(userTypes[j].job_id)-1].name;
                                }
                            }
                        }
                        if(description.length>200){
                            description = description.substring(0,200) + '....';
                        }

                        var disable = false;
                        var user = AuthService.getUser();
                        if(user) {
                            if (user.id === users[i][0].id) {disable = true;}
                            else {disable = false;}
                        }

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