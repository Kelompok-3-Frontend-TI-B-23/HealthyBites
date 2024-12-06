angular.module('mainApp')
  .controller('addNutritionCtrl', function ($scope, $http, $location, $window) {
    $scope.submitForm = function () {
      var formData = new FormData(document.getElementById('addNutritionForm'));

      $http.post('/api/nutrition/upload', formData, {
        headers: { 'Content-Type': undefined },
        transformRequest: angular.identity
      })
      .then(function (response) {
        alert('Nutrisi berhasil ditambahkan!');
        $window.location.href = '/dashboardAdmin';
      })
      .catch(function (error) {
        alert('Gagal menambahkan nutrisi: ' + error.data.message);
      });
    };
  });
