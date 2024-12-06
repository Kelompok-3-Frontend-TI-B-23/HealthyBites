angular.module('mainApp').controller('homeCtrl', function ($scope, $http, $location) {
  $scope.currentUser = null;
  $scope.errorMessage = '';
  $scope.showProfileModal = false;

  const token = localStorage.getItem('authToken');
  if (!token) {
    // ke halaman login jika token tidak ada
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
    // ke halaman login jika gagal mendapatkan data
    $location.path('/login');
  });


  $scope.confirmLogout = function () {
    localStorage.removeItem('authToken');
    $location.path('/login');
  };

  // Fungsi untuk membuka modal profil pengguna
  $scope.openProfilePopup = function () {
    $http.get('/api/users/home', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(function (response) {
      console.log('User profile data:', response.data);
      $scope.currentUser = response.data.user; // Simpan data pengguna di scope
      $scope.showProfileModal = true; // Menampilkan modal dengan menggunakan ng-show
    })
    .catch(function (error) {
      console.error('Error fetching user profile:', error);
      $scope.errorMessage = error.data ? error.data.error : 'Failed to fetch user data.';
      // Jika gagal mendapatkan data, arahkan ke halaman login
      $location.path('/login');
    });
  };

  $scope.closeProfilePopup = function () {
    $scope.showProfileModal = false;  // Menyembunyikan modal
    document.querySelector('.modal-backdrop').style.display = 'none';  // Menyembunyikan backdrop
  };
  
  
});
