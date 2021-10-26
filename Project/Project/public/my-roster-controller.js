angular.module('myGuildApp', []) // Läs 1 nedan
    .controller('MyGuildController', function MyGuildController($scope, $http) { 
        $scope.name = "";
        $scope.active = "";
        $scope.rank = "";
        $scope.value;
        $scope.country = "";
        $scope.myRosters = null;
        $scope.myInfo = "The current roster";
        $scope.length;


        $scope.getMyRosters = async function () {
            $http.get("api/myRosters")
            .then(function successCallback(response) {
                    $scope.myRosters = response.data;
                    $scope.length = response.data.length;
                    for (let i=0; i<$scope.myRosters.length; i++){
                            if($scope.myRosters[i].active == "NO"){
                        $scope.length--;
                        }
                    }
                },
                function errorCallback(response) {
                    console.log("Error getting all users: response=" + JSON.stringify(response));
                });
        };
            
            $scope.getMyRosters();
    }
    );