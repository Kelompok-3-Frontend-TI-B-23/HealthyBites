angular.module('mainApp').controller('homeCtrl', function ($scope, $http) {
    $scope.currentUser = null;
    $scope.errorMessage = '';
  
    const token = localStorage.getItem('authToken');
    if (!token) {
      window.location.href = '/login.html';
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
      window.location.href = '/login.html';
    });
  
    $scope.logout = function () {
      localStorage.removeItem('authToken');
      window.location.href = '/login.html';
    };
  });
  