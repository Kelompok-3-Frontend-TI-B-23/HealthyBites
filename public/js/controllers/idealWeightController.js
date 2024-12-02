angular.module('idealWeightApp').controller('IdealWeightController', ['$scope', 'IdealWeightService', function ($scope, IdealWeightService) {
    $scope.user = {
        gender: '',
        height: null
    };

    $scope.idealWeightResult = null;

    $scope.calculateIdealWeight = function (event) {
        if (event) {
            event.preventDefault();
        }

        const { gender, height } = $scope.user;

        if (!gender || !height || height <= 0) {
            $scope.idealWeightResult = "Harap masukkan data yang valid!";
            return;
        }

        const idealWeight = IdealWeightService.calculateIdealWeight(gender, height);
        $scope.idealWeightResult = `Berat Badan Ideal Anda: ${idealWeight} kg`;
    };
}]);
