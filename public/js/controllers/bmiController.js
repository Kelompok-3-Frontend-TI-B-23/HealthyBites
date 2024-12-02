angular.module('bmiApp').controller('BmiController', ['$scope', 'BmiService', function ($scope, BmiService) {
    $scope.user = {
        age: null,
        gender: '',
        height: null,
        weight: null
    };

    $scope.bmiResult = null;
    $scope.bmiClassification = null;

    $scope.calculateBMI = function (event) {
        // Prevent default form submission
        if (event) {
            event.preventDefault();
        }

        const { height, weight } = $scope.user;

        // Validate inputs
        if (!height || !weight || height <= 0 || weight <= 0) {
            $scope.bmiResult = "Harap masukkan data yang valid!";
            $scope.bmiClassification = "";
            return;
        }

        const result = BmiService.calculateBMI(height, weight);
        $scope.bmiResult = `BMI Anda : ${result.bmi}`;
        $scope.bmiClassification = result.classification;
    };
}]);
