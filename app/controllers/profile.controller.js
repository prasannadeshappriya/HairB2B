/**
 * Created by prasanna_d on 7/18/2017.
 */
app.controller('ProfileController',['$scope','$http',function ($scope,$http) {
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

    $scope.onInit = function () {
        // $http({
        //     method: "GET",
        //     url: "http://localhost:3000/profile/getProfile"
        // }).then(function (resData){
        //     console.log(resData);
        //     // $scope.isLoading = false;
        //     // if(typeof resData.data.status==="undefined"){return $scope.message = "Server connection error";}
        //     // if(resData.data.status==="success"){
        //     //     //Create session with the server
        //     //     //Get the token
        //     //
        //     //     console.log(resData.data.token);
        //     //
        //     //     AuthService.Login(
        //     //         resData.data.token,
        //     //         resData.data.email,
        //     //         resData.data.firstname,
        //     //         resData.data.lastname,
        //     //         function (callback) {
        //     //             $('#signin_model').modal('hide');
        //     //             console.log('Authentication Successful');
        //     //             window.location.reload();
        //     //         }
        //     //     );
        //     //
        //     // }else{
        //     //     $scope.message = "Username or password is invalid";
        //     //     $scope.auth_error = true;
        //     // }
        // },function (error){
        //     // $scope.isLoading = false;
        //     // $scope.auth_error = false;
        //     // $scope.server_error = true;
        //     // $scope.message = "Server connection error";
        // });
    }
}]);