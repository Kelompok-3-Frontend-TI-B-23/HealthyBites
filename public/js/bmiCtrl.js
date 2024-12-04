angular.module('mainApp').controller('bmiCtrl', ['$scope', function ($scope) {
  $scope.user = {
    age: null,
    gender: '',
    height: null,
    weight: null
  };

  $scope.bmiResult = null;
  $scope.bmiClassification = null;

  $scope.calculateBMI = function (event) {
    event.preventDefault();

    const { height, weight } = $scope.user;

    if (!height || !weight || height <= 0 || weight <= 0) {
      $scope.bmiResult = "Harap masukkan data yang valid!";
      $scope.bmiClassification = "";
      return;
    }

    const bmi = (weight / (height * height) * 10000).toFixed(2);
    let classification;

    if (bmi < 16) {
      classification = "Severe Thinness";
    } else if (bmi >= 16 && bmi < 17) {
      classification = "Moderate Thinness";
    } else if (bmi >= 17 && bmi < 18.5) {
      classification = "Mild Thinness";
    } else if (bmi >= 18.5 && bmi < 25) {
      classification = "Normal";
    } else if (bmi >= 25 && bmi < 30) {
      classification = "Overweight";
    } else if (bmi >= 30 && bmi < 35) {
      classification = "Obese Class I";
    } else if (bmi >= 35 && bmi < 40) {
      classification = "Obese Class II";
    } else {
      classification = "Obese Class III";
    }

    $scope.bmiResult = `BMI Anda : ${bmi}`;
    $scope.bmiClassification = classification;

    const modal = new bootstrap.Modal(document.getElementById('bmiModal'));
    modal.show();
  };
}]);
