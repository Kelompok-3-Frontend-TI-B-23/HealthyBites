angular.module('mainApp')
  .controller('addNewsCtrl', function ($scope, $http, $location) {
    $scope.submitForm = function () {
      var formData = new FormData(document.getElementById('addNewsForm'));
      console.log([...formData.entries()]);
      $http.post('/api/news/upload', formData, {
        headers: { 'Content-Type': undefined },
        transformRequest: angular.identity
      })
      .then(function (response) {
        alert('Berita berhasil ditambahkan!');
        // $location.path('/addRecipe');
      })
      .catch(function (error) {
        alert('Gagal menambahkan berita: ' + error.data.message);
      });
    };
  });
