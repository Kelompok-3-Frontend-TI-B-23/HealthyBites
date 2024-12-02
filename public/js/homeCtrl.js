angular.module('mainApp').controller('homeCtrl', function ($scope, $http, $location) {
  $scope.currentUser = null;
  $scope.errorMessage = '';

  const token = localStorage.getItem('authToken');
  if (!token) {
    // Mengalihkan ke halaman login jika token tidak ada
    $location.path('/login');
    return;
  }

  $http.get('/api/users/home', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`
    }
  })
  .then(function (response) {
    console.log('User data:', response.data);
    $scope.currentUser = response.data.user;
  })
  .catch(function (error) {
    console.error('Error fetching user data:', error);
    $scope.errorMessage = error.data.error || 'Failed to fetch user data.';
    // Mengalihkan ke halaman login jika gagal mendapatkan data
    $location.path('/login');
  });

  $scope.logout = function () {
    // Menghapus token dan mengalihkan pengguna ke halaman login
    localStorage.removeItem('authToken');
    $location.path('/login');
  };
});
