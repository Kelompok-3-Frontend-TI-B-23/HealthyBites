// Module mainApp
const app = angular.module('mainApp', []);
angular.module('bmiApp', []);

// Controller untuk Create Account
app.controller('createAccountCtrl', function ($scope, $http) {
  $scope.formData = {};
  $scope.successMessage = '';
  $scope.errorMessage = '';
  $scope.submitted = false;

  // Validasi password
  $scope.isPasswordValid = function (password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  // Validasi nomor telepon
  $scope.isPhoneNumberValid = function (phone) {
    return /^\d{10,13}$/.test(phone);
  };

  // Submit form
  $scope.createAccount = function () {
    $scope.submitted = true;

    // Lakukan validasi form sebelum mengirimkan data ke controller
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
        // Redirect ke halaman login
        window.location.href = '/login.html';
      })
      .catch(function (error) {
        $scope.successMessage = '';
        // Tangani error untuk username, email, atau error lainnys
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

  

// Controller untuk Login
app.controller('loginCtrl', function ($scope, $http) {
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

                // Simpan token di localStorage
                const token = response.data.token;
                localStorage.setItem('authToken', token);

                // Redirect ke halaman home
                window.location.href = '/home.html';
            })
            .catch(function (error) {
                $scope.errorMessage = error.data.error || 'Invalid email or password. Please try again.';
            });
    };
});


app.controller('homeCtrl', function ($scope, $http) {
    $scope.currentUser = null;
    $scope.errorMessage = '';

    // Ambil token dari localStorage
    const token = localStorage.getItem('authToken');
    if (!token) {
        // Redirect ke login jika token tidak ada
        window.location.href = '/login.html';
        return;
    }

    // Ambil data pengguna dari backend
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
    


    // Fungsi logout
    $scope.logout = function () {
        localStorage.removeItem('authToken');
        window.location.href = '/login.html';
    };
});



  
