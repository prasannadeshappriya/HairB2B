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

            $scope.dynamicSearch = function () {
                var job_types=[];
                var i;
                if($scope.job_types[3].value){
                    job_types.push('all');
                }else{
                    for(i=0; i<$scope.job_types.length; i++){
                        if($scope.job_types[i].value){
                            job_types.push(i);
                        }
                    }
                }
                var skill_types=[];
                if($scope.skill_types[11].value){
                    skill_types.push('all');
                }else{
                    for(i=0; i<$scope.skill_types.length; i++){
                        if($scope.skill_types[i].value){
                            skill_types.push(i);
                        }
                    }
                }

                $http({
                    method: "GET",
                    url: host_url + "search/dynamicSearch?jobtype="+ job_types + "&skilltype=" + skill_types
                }).then(function (resData){
                    // console.log(resData);
                    console.log('Dynamic search triggered');
                    var users = resData.data.users;
                    var stylists = resData.data.stylists;
                    var jobtypes = resData.data.jobtypes;
                    $scope.search_results = [];
                    for(var i=0; i<users.length; i++){
                        var description = '';
                        for(var j=0; j<stylists.length; j++){
                            if(users[i][0].id===stylists[j].user_id){
                                description = stylists[j].description;
                                break;
                            }
                        }
                        if(description.length>200){
                            description = description.substring(0,200) + '....';
                        }
                        var disable = false;
                        var user = AuthService.getUser();
                        if(user) {
                            if (user.email === users[i][0].email) {disable = true;}
                            else {disable = false;}
                        }
                        var types= '';
                        for(var k=0; k<$scope.job_types.length; k++){
                            if($scope.job_types[k].value){
                                if(types===''){types=$scope.job_types[k].name}
                                else{types = types + ', ' + $scope.job_types[k].name}
                            }
                        }
                        var price = 0.0;
                        for(var l=0; l<stylists.length; l++){
                            if(users[i][0].id===stylists[l].user_id){
                                for(var p=0; p<jobtypes.length; p++){
                                    console.log('asdfasdfasdf: ' + jobtypes[p][0]);
                                    console.log('asdfasdfasdf: ' + stylists[l].id);
                                    if(jobtypes[p][0]===stylists[l].id){
                                        if (price===0){
                                            price=jobtypes[p][1];
                                        }else{
                                            if(price>jobtypes[p][1]){
                                                price=jobtypes[p][1];
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        $scope.search_results.push({
                            firstname: users[i][0].firstname,
                            lastname: users[i][0].lastname,
                            acctypes: types,
                            email: users[i][0].email,
                            id: users[i][0].id,
                            price: price,
                            rates: "0.0",
                            location: "Sidney",
                            description: description,
                            disable: disable
                        });
                    }
                },function (error){
                    console.log('Error on searching profile: ' + error);
                });
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

            $scope.viewProfile = function (email,id) {
                var user = AuthService.getUser();
                if(user) {
                    console.log(user.email);
                    console.log(email);
                    if (user.email === email) {
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
                        $scope.job_types[(job_type)-1].value = true
                    }catch (err){
                        console.log(err);
                        console.log('Invalid job type:' + job_type);
                    }
                }
                if(skill_type==='all'){$scope.skill_types[11].value = true}
                else{
                    try {
                        $scope.skill_types[(skill_type)-1].value = true
                    }catch (err){
                        console.log(err);
                        console.log('Invalid skill type:' + skill_type);
                    }
                }
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
                        var price = 0;
                        for(var j=0; j<userTypes.length; j++){
                            console.log(userTypes[j]);
                            try {
                                if (typeof userTypes[j].user_id === 'undefined') {
                                    user_id = userTypes[j][0].user_id;
                                    job_id = userTypes[j][0].job_id;
                                } else {
                                    user_id = userTypes[j].user_id;
                                    job_id = userTypes[j].job_id;
                                }
                                console.log(userTypes[j][0].price);

                                if (user_id === id) {
                                    if(userTypes[j].price!=='undefined'){
                                        if(price===0){price = parseInt(userTypes[j][0].price);}
                                        else{if(price>(parseInt(userTypes[j][0].price))){price = parseInt(userTypes[j][0].price);}}
                                    }else {
                                        if(price===0){price = parseInt(userTypes[j].price);}
                                        else{if(price>(parseInt(userTypes[j].price))){price = parseInt(userTypes[j].price);}}
                                    }
                                    if (types === '') {
                                        types = $scope.job_types[(job_id) - 1].name;
                                    } else {
                                        types = types + ', ' + $scope.job_types[(job_id) - 1].name;
                                    }
                                }
                            }catch (err){}
                        }
                        console.log('price is: ' + price);
                        if(description.length>200){
                            description = description.substring(0,200) + '....';
                        }

                        var disable = false;
                        var user = AuthService.getUser();
                        if(user) {
                            if (user.email === users[i][0].email) {disable = true;}
                            else {disable = false;}
                        }

                        $scope.search_results.push({
                            firstname: users[i][0].firstname,
                            lastname: users[i][0].lastname,
                            acctypes: types,
                            email: users[i][0].email,
                            id: users[i][0].id,
                            price: price,
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