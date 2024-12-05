// Buat AngularJS module
const app = angular.module("mainApp", []);

app.controller('profileCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.user = {};
    $scope.newPassword = '';
    $scope.confirmNewPassword = '';
  
    const token = localStorage.getItem('authToken');
  
    $scope.getUserProfile = function () {
      $http.get('/profile', { headers: { Authorization: `Bearer ${token}` } })
        .then(function (response) {
          $scope.user = response.data;
        })
        .catch(function (error) {
          if (error.status === 401) {
            alert('You are not logged in. Redirecting to login page...');
            $window.location.href = '/login';
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
            $window.location.href = '/login';
          } else {
            console.error('Error updating profile:', error);
            alert('Failed to update profile.');
          }
        });
    };
  
    $scope.getUserProfile();
  }]);
  