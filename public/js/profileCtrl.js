// Buat AngularJS module
angular.module("mainApp").controller('profileCtrl', function ($scope, $http, $location) {
    $scope.user = {};
    $scope.newPassword = '';
    $scope.confirmNewPassword = '';
  
    const token = localStorage.getItem('authToken');
    // Fungsi untuk mendapatkan profil pengguna
    $scope.getUserProfile = function () {
        const token = localStorage.getItem('authToken'); // Ambil token dari local storage
        
        // Kirim permintaan HTTP untuk mendapatkan data pengguna
        $http.get('/api/users/home', {
          headers: { Authorization: `Bearer ${token}` } // Tambahkan header otorisasi
        })
        .then(function (response) {
          console.log('User profile data:', response.data); // Log data pengguna untuk debugging
          $scope.user = response.data.user; // Simpan data pengguna di $scope.user
          $scope.showProfileModal = true; // Tampilkan modal profil (misalnya dengan ng-show)
        })
        .catch(function (error) {
          console.error('Error fetching user profile:', error); // Log error untuk debugging
          $scope.errorMessage = error.data ? error.data.error : 'Failed to fetch user data.'; // Pesan error
          
          if (error.status === 401) {
            alert('You are not logged in. Redirecting to login page...');
            $location.path('/login'); // Arahkan ke halaman login jika tidak terautentikasi
          } else {
            alert('Failed to load profile data.'); // Tampilkan pesan error umum
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