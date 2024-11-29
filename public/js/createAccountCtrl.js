angular.module('mainApp').controller('createAccountCtrl', function ($scope, $http) {
    $scope.formData = {};
    $scope.successMessage = '';
    $scope.errorMessage = '';
    $scope.submitted = false;
  
    $scope.isPasswordValid = function (password) {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
      return passwordRegex.test(password);
    };
  
    $scope.isPhoneNumberValid = function (phone) {
      return /^\d{10,13}$/.test(phone);
    };
  
    $scope.createAccount = function () {
      $scope.submitted = true;
  
      if (
        !$scope.formData.username ||
        !$scope.formData.email ||
        !$scope.isPasswordValid($scope.formData.password) ||
        $scope.formData.password !== $scope.formData.confirmPassword ||
        !$scope.isPhoneNumberValid($scope.formData.phone)
      ) {
        $scope.errorMessage = 'Harap isi semua kolom dengan benar.';
        return;
      }
  
      $http.post('/api/users', $scope.formData)
        .then(function (response) {
          $scope.successMessage = 'Akun berhasil dibuat!';
          $scope.errorMessage = '';
          window.location.href = '/login.html';
        })
        .catch(function (error) {
          $scope.successMessage = '';
          const errorResponse = error.data.error || 'Terjadi kesalahan saat membuat akun. Coba lagi.';
          if (errorResponse.includes('Username')) {
            $scope.usernameError = errorResponse;
          } else {
            $scope.usernameError = '';
          }
          if (errorResponse.includes('Email')) {
            $scope.emailError = errorResponse;
          } else {
            $scope.emailError = '';
          }
          $scope.errorMessage = errorResponse;
        });
    };
  });
  