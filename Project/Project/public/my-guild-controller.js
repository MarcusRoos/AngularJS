angular.module('myGuildApp', []) // Läs 1 nedan
    .controller('MyGuildController', function MyGuildController($scope, $http) { // Läs 2 nedan
        $scope.guilds = null;
        $scope.guildsInfo = "Current guild members";
        $scope.length;

        $scope.getAllGuilds = function () {
            $http.get("api/guilds")
            .then(function successCallback(response) {
                        $scope.guilds = response.data;   
                        $scope.length = response.data.length;                                  
                },
                function errorCallback(response) {
                    console.log("Error getting all users: response=" + JSON.stringify(response));
                });
        };

            $scope.getAllGuilds();
    }
    );
