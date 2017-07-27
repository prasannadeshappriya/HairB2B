/**
 * Created by prasanna_d on 7/18/2017.
 */
app.controller('ProfileController',
    ['$scope','$http','AuthService','$location','host_url',
        function ($scope,$http,AuthService,$location,host_url) {

    var editBtn = document.getElementById('editBtn');
    var editables = document.querySelectorAll('#description');

    editBtn.addEventListener('click', function(e) {
        console.log(editables[0]);
        if (!editables[0].isContentEditable) {
            console.log('asdasd');
            editables[0].contentEditable = 'true';
            editBtn.value="Save";
        } else {
            // Disable Editing
            editables[0].contentEditable = 'false';
            // Change Button Text and Color
            editBtn.value="Edit";
            // Save the data in localStorage
            for (var i = 0; i < editables.length; i++) {
                localStorage.setItem(editables[i].getAttribute('id'), editables[i].innerHTML);
            }
        }
    });

    //User details
    $scope.firstname = '';
    $scope.lastname = '';
    $scope.email = '';
    $scope.description = '';

    $scope.skill1 = false; $scope.skill4 = false; $scope.skill7 = false; $scope.skill9 = false;
    $scope.skill2 = false; $scope.skill5 = false; $scope.skill8 = false; $scope.skill10 = false;
    $scope.skill3 = false; $scope.skill6 = false; $scope.skill11 = false;

    $scope.type1 = false; $scope.type2 = false; $scope.type3 = false;

    $scope.onInit = function () {
        console.log('this is now initializing');
        var user = AuthService.getUser();
        if(user){
            $scope.firstname = user.firstname;
            $scope.lastname = user.lastname;
            $scope.email = user.email;

            $http({
                method: "GET",
                url: host_url + "profile/getProfile"
            }).then(function (resData){
                console.log('Server response :');
                console.log(resData);
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