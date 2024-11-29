angular.module('mainApp').controller('loginCtrl', function ($scope, $http) {
    $scope.formData = {};
    $scope.errorMessage = '';
    $scope.submitted = false;
  
    $scope.login = function () {
      $scope.submitted = true;
  
      if (!$scope.formData.email || !$scope.formData.password) {
        $scope.errorMessage = 'Please fill all fields.';
        return;
      }
  
      $http.post('/api/users/login', $scope.formData)
        .then(function (response) {
          $scope.errorMessage = '';
          const token = response.data.token;
          localStorage.setItem('authToken', token);
          window.location.href = '/home.html';
        })
        .catch(function (error) {
          $scope.errorMessage = error.data.error || 'Invalid email or password. Please try again.';
        });
    };
  });
  