/**
 * Created by prasanna_d on 7/18/2017.
 */
app.controller('ProfileController',
    ['$scope','$http','AuthService',
        function ($scope,$http,AuthService) {

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
    $scope.firstname = 'Undefined';
    $scope.lastname = 'Undefined';
    $scope.email = 'Undefined';
    $scope.description = 'Undefined';

    $scope.onInit = function () {
        console.log('this is now initializing');
        var user = AuthService.getUser();
        if(user){
            $scope.firstname = user.firstname;
            $scope.lastname = user.lastname;
            $scope.email = user.email;

            $http({
                method: "GET",
                url: "http://localhost:3000/profile/getProfile"
            }).then(function (resData){
                console.log('Server response :');
                console.log(resData);
                $scope.description = resData.data.description;
            },function (error){
                $location.path('/');
                console.log('Error occurred: ' + error);
            });

        }else{
            $location.path('/');
        }
    }
}]);