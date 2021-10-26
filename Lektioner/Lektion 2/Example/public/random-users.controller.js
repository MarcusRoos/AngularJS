angular.module('randomUsersApp', [])
    .controller('RandomUsersController', function RandomUsersController($scope, $http) {
        // Initiera variabler för de input-element som används för att lägga till en ny användare
        $scope.firstName = "";
        $scope.lastName = "";
        $scope.email = "";
        $scope.random = false;

        // Initierar objekt för alla användare
        $scope.users = null;

        $scope.getAllUsers = function () {
            $http.get("api/users").then(
                function successCallback(response) {
                    // this callback will be called asynchronously when the response is available
                    $scope.users = response.data.users;
                },
                function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log("Error getting all users: response=" + JSON.stringify(response));
                });
        };

        $scope.addUser = function () {
            // Här bör vi först validera det användaren skrivit in i textfälten

            // Den body med data som skickas till servern
            const body = {
                random: $scope.random,
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                email: $scope.email
            }

            $http.post('/api/users/add', body).then(
                function successCallback(response) {
                    // Användaren lades till, meddela eventuellt användaren

                    // Hämta alla användare igen
                    $scope.getAllUsers();
                }
                ,
                function errorCallback(response) {
                    // Här bör vi meddela användaren om vad som gick fel på
                    // ett bättre sätt än i en alert.
                    alert(response.data.message);

                    // Skriver ut hela response till konsolen.
                    console.log("Error adding user: response=" + JSON.stringify(response));
                });
        };

        $scope.deleteUser = function (uuid) {
            // Använd $http.delete() för att skicka en begäran till vårt API
            // om att radera användaren med uuid. Nu tar vi bara bort från arrayen.

            for (let i = 0; i < $scope.users.length; i++) {
                if ($scope.users[i].uuid == uuid) {
                    $scope.users.splice(i, 1);
                    break;
                }
            }
        };

        // Hämta alla användare från API (måste lägga anropet efter deklarationen av $scope.getAllUsers)
        $scope.getAllUsers();
    }
    );