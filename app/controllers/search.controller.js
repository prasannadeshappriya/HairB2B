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

            $scope.beginSearch = function (skill, jobtype) {
                console.log($scope.job_types.indexOf(skill));
                // $location.path('/search?jobtype=2&skilltype=4');
                $location.path('/search').search({jobtype: $scope.job_types.indexOf(jobtype), skilltype: $scope.skill_types.indexOf(skill)});
            };

            $scope.search_results = [];
            $scope.onInit = function () {
                var params = $location.search();
                var job_type = params.jobtype;
                var skill_type = params.skilltype;
                console.log(job_type);
                console.log(skill_type);
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