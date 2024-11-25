angular.module('bmiApp').controller('BmiController', ['$scope', 'BmiService', function ($scope, BmiService) {
    $scope.user = {
        age: '',
        gender: 'male',
        height: 160,
        weight: 60
    };

    $scope.bmiResult = null;
    $scope.bmiClassification = null;

    $scope.calculateBMI = function () {
        const { height, weight } = $scope.user;

        if (!height || !weight || height <= 0 || weight <= 0) {
            $scope.bmiResult = "Harap masukkan data yang valid!";
            $scope.bmiClassification = "";
            return;
        }

        const result = BmiService.calculateBMI(height, weight);
        $scope.bmiResult = `BMI Anda: ${result.bmi}`;
        $scope.bmiClassification = result.classification;
    };
}]);
