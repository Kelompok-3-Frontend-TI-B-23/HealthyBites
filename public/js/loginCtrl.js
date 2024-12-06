angular.module('mainApp').controller('loginCtrl', function ($scope, $http, $location) {
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
                const isAdmin = response.data.isAdmin;

                // Simpan token ke localStorage
                localStorage.setItem('authToken', token);

                // Alihkan ke halaman yang sesuai
                if (isAdmin) {
                    $location.path('/dashboardAdmin');
                } else {
                    $location.path('/home');
                }
            })
            .catch(function (error) {
                $scope.errorMessage = error.data.error || 'Invalid email or password. Please try again.';
            });
    };
});
