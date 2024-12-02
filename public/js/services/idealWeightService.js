angular.module('idealWeightApp', []).factory('IdealWeightService', function () {
    return {
        calculateIdealWeight: function (gender, height) {
            if (gender === 'male') {
                return ((height - 100) - (0.1 * (height - 100))).toFixed(2);
            } else if (gender === 'female') {
                return ((height - 100) - (0.15 * (height - 100))).toFixed(2);
            } else {
                return "Jenis kelamin tidak valid!";
            }
        }
    };
});
