angular.module('bbiApp', [])
  .controller('bbiCtrl', ['$scope', function ($scope) {
    // Initialize user object and result variable
    $scope.user = {
      gender: '',
      height: null
    };

    $scope.idealWeightResult = null;

    // Function to calculate ideal weight
    $scope.calculateIdealWeight = function (event) {
      if (event) event.preventDefault(); // Prevent form from reloading the page

      // Ensure height and gender are provided
      if (!$scope.user.gender || !$scope.user.height) {
        $scope.idealWeightResult = 'Mohon lengkapi semua data!';
        return;
      }

      // Calculate ideal weight based on gender
      let heightInMeters = $scope.user.height / 100;
      if ($scope.user.gender === 'male') {
        $scope.idealWeightResult = `Berat badan ideal Anda adalah ${(22 * Math.pow(heightInMeters, 2)).toFixed(1)} kg.`;
      } else if ($scope.user.gender === 'female') {
        $scope.idealWeightResult = `Berat badan ideal Anda adalah ${(21 * Math.pow(heightInMeters, 2)).toFixed(1)} kg.`;
      } else {
        $scope.idealWeightResult = 'Jenis kelamin tidak valid!';
      }
    };
  }]);
