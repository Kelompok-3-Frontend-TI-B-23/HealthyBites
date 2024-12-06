angular.module('mainApp')
  .controller('editNutritionCtrl', function ($scope, $http) {
    $scope.nutritions = [];
    $scope.selectedNutrition = null;

    // Fetch all nutrition data
    $http.get('/api/nutrition')
      .then(function (response) {
        $scope.nutritions = response.data;
      })
      .catch(function (error) {
        console.error('Error fetching nutritions:', error);
      });

    // Open edit modal
    $scope.openEditPopup = function (nutrition) {
      $scope.selectedNutrition = angular.copy(nutrition);
      $scope.selectedNutrition.funFacts = $scope.selectedNutrition.funFacts.join(', ');
      document.getElementById('editNutritionModal').style.display = 'block';
    };

    $scope.closeEditPopup = function () {
      $scope.selectedNutrition = null;
      document.getElementById('editNutritionModal').style.display = 'none';
    };

    // Open delete modal
    $scope.openDeletePopup = function (nutrition) {
      $scope.selectedNutrition = nutrition;
      document.getElementById('deleteNutritionModal').style.display = 'block';
    };

    $scope.closeDeletePopup = function () {
      $scope.selectedNutrition = null;
      document.getElementById('deleteNutritionModal').style.display = 'none';
    };

    // Update nutrition
    $scope.updateNutrition = function () {
      if ($scope.selectedNutrition && $scope.selectedNutrition._id) {
        const updatedNutrition = {
          title: $scope.selectedNutrition.title,
          calories: $scope.selectedNutrition.calories,
          fat: $scope.selectedNutrition.fat,
          saturatedFat: $scope.selectedNutrition.saturatedFat,
          protein: $scope.selectedNutrition.protein,
          cholesterol: $scope.selectedNutrition.cholesterol,
          sodium: $scope.selectedNutrition.sodium,
          funFacts: $scope.selectedNutrition.funFacts.split(',').map(fact => fact.trim()),
        };

        $http.put('/api/nutrition/' + $scope.selectedNutrition._id, updatedNutrition)
          .then(function (response) {
            alert('Nutrition data updated successfully');
            const index = $scope.nutritions.findIndex(nutrition => nutrition._id === $scope.selectedNutrition._id);
            if (index !== -1) {
              $scope.nutritions[index] = response.data; // Update data with response
            }
            $scope.closeEditPopup();
          })
          .catch(function (error) {
            console.error('Error updating nutrition:', error);
            alert('Failed to update nutrition');
          });
      }
    };

    // Delete nutrition
    $scope.deleteNutrition = function () {
      if ($scope.selectedNutrition && $scope.selectedNutrition._id) {
        $http.delete('/api/nutrition/' + $scope.selectedNutrition._id)
          .then(function () {
            alert('Nutrition data deleted successfully');
            $scope.nutritions = $scope.nutritions.filter(nutrition => nutrition._id !== $scope.selectedNutrition._id);
            $scope.closeDeletePopup();
          })
          .catch(function (error) {
            console.error('Error deleting nutrition:', error);
            alert('Failed to delete nutrition');
          });
      }
    };
  });
