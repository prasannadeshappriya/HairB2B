/**
 * Created by prasanna_d on 7/21/2017.
 */
app.controller('ProfileEditController',
    ['$scope','$http','$location', 'AuthService',
        function ($scope,$http,$location, AuthService) {
                $scope.onInit = function () {
                    console.log('Profile Edit Page, onInit() Function Triggered');
                }
        }
]);