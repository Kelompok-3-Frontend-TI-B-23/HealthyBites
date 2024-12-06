// Buat AngularJS module
angular.module("mainApp").controller('profileCtrl', function ($scope, $http, $location) {
    $scope.user = {};
    $scope.newPassword = '';
    $scope.confirmNewPassword = '';
  
    const token = localStorage.getItem('authToken');
    // Fungsi untuk mendapatkan profil pengguna
    $scope.getUserProfile = function () {
      // Kirim permintaan HTTP ke backend untuk mengambil data pengguna
      $http.get('/profile', { headers: { Authorization: `Bearer ${token}`} })
          .then(function (response) {
              // Simpan data pengguna yang diterima ke dalam $scope.user
              $scope.user = response.data.user;
          })
          .catch(function (error) {
              if (error.status === 401) {
                  alert('You are not logged in. Redirecting to login page...');
                  $location.path('/login');
              } else {
                  console.error('Error fetching user profile:', error);
                  alert('Failed to load profile data.');
              }
          });
    };
  
    $scope.updateUserProfile = function () {
      if ($scope.newPassword !== $scope.confirmNewPassword) {
        alert('New password and confirmation password do not match!');
        return;
      }
  
      const updatedData = {
        username: $scope.user.username,
        phone: $scope.user.phone,
      };
  
      if ($scope.newPassword) {
        updatedData.password = $scope.newPassword;
      }
  
      $http.put('/profile', updatedData, { headers: { Authorization: `Bearer ${token}` } })
        .then(function (response) {
          alert('Profile updated successfully!');
          $scope.getUserProfile();
        })
        .catch(function (error) {
          if (error.status === 401) {
            alert('You are not logged in. Redirecting to login page...');
            $location.path('/login');
          } else {
            console.error('Error updating profile:', error);
            alert('Failed to update profile.');
          }
        });
    };
  
    $scope.getUserProfile();
  });