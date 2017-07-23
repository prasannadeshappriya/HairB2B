/**
 * Created by prasanna on 7/23/17.
 */
app.controller('SearchController',
    ['$scope','$http','AuthService',
        function ($scope,$http,AuthService) {
            $scope.search_results = [];
            $scope.onInit = function () {
                //Hard Code two dummy data
                $scope.search_results.push({
                    firstname: "Prasanna",
                    lastname: "Deshappriya",
                    acctypes: "Educator, Stylist, Assistant",
                    price: "$2400",
                    rates: "0.0",
                    location: "Sidney",
                    description: "this is a test this is a test this is a test this is a test this is a test " +
                    "this is a test this is a test this is a test this is a test this is a test this is a test this is a test " +
                    "this is a test this is a test this is a test this is a test this is a test this is a test " +
                    "this is a test this is a test this is a test this is a test this is a test this is a test "
                });
                $scope.search_results.push({
                    firstname: "Hiruni",
                    lastname: "Kalanika",
                    acctypes: "Educator, Assistant",
                    price: "$300",
                    rates: "0.0",
                    location: "Sidney",
                    description: "I'm ma girl I'm ma girl I'm ma girl I'm ma girl I'm ma girl I'm ma girl " +
                    "I'm ma girl I'm ma girl I'm ma girl I'm ma girl I'm ma girl I'm ma girl I'm ma girl I'm ma girl " +
                    "I'm ma girl I'm ma girl I'm ma girl I'm ma girl I'm ma girl I'm ma girl I'm ma girl " +
                    "I'm ma girl I'm ma girl I'm ma girl I'm ma girl I'm ma girl I'm ma girl I'm ma girl I'm ma girl  "
                });
            };

        }
]);