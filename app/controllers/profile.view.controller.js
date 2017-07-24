/**
 * Created by prasanna_d on 7/24/2017.
 */
app.controller('ProfileViewController',
    ['$scope','$http','AuthService','$location',
        function ($scope,$http,AuthService,$location) {
            $scope.onInit = function () {
                var params = $location.search();
                var user_id = (params.userid);
                console.log('hayyhayyy: ' + user_id);
            }
        }
]);