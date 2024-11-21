const app = angular.module("userApp", []);

app.controller("userController", function ($scope, $http) {
    console.log("AngularJS and controller loaded successfully!");

    $scope.user = {};
    $scope.message = "";

    $scope.addUser = function () {
    $http
        .post("/api/users/add", $scope.user)
        .then(function (response) {
        $scope.message = response.data.message;
        $scope.user = {}; // reset form jadi kosong
        })
        .catch(function (error) {
        $scope.message = error.data.message || "Error";
        });
    };
});