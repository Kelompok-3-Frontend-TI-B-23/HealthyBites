angular.module('mainApp')
  .controller('addRecipeCtrl', function ($scope, $http, $location) {
    $scope.submitForm = function () {
      var formData = new FormData(document.getElementById('addRecipeForm'));

      $http.post('/api/recipes/upload', formData, {
        headers: { 'Content-Type': undefined },
        transformRequest: angular.identity
      })
      .then(function (response) {
        alert('Resep berhasil ditambahkan!');
        // $location.path('/addRecipe');
      })
      .catch(function (error) {
        alert('Gagal menambahkan resep: ' + error.data.message);
      });
    };
  });
