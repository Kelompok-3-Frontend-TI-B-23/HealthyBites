angular.module("mainApp").controller("recipeDetailCtrl", function ($scope, $http, $routeParams) {
  const recipeId = $routeParams.recipeId; // Ambil parameter recipeId dari URL

  // Ambil data resep berdasarkan ID
  $http
    .get(`/api/recipes/${recipeId}`)
    .then(function (response) {
      $scope.recipe = response.data; // Simpan data resep ke dalam $scope
    })
    .catch(function (error) {
      console.error("Error fetching recipe details:", error);
    });
});
