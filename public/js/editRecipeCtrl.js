angular.module('mainApp')
  .controller('editRecipeCtrl', function($scope, $http) {
    
    // Fetch all recipes from the database
    $http.get('/api/recipes')
      .then(function(response) {
        $scope.recipes = response.data;
      })
      .catch(function(error) {
        console.error('Error fetching recipes:', error);
      });

    // Open Edit Popup
    $scope.openEditPopup = function(recipe) {
        $scope.selectedRecipe = angular.copy(recipe);
        // Set default nutrition values if not present
        $scope.selectedRecipe.nutritionCalories = $scope.selectedRecipe.nutrition?.calories || 0;
        $scope.selectedRecipe.nutritionCarbs = $scope.selectedRecipe.nutrition?.carbs || 0;
        $scope.selectedRecipe.nutritionProtein = $scope.selectedRecipe.nutrition?.protein || 0;
        $scope.selectedRecipe.nutritionFat = $scope.selectedRecipe.nutrition?.fat || 0;

        document.getElementById('editRecipeModal').style.display = 'block';
    };
    
    // Close Edit Popup
    $scope.closeEditPopup = function() {
        $scope.selectedRecipe = angular.copy($scope.originalRecipe); 
        document.getElementById('editRecipeModal').style.display = 'none';
    };

    // Open Delete Confirmation Modal
    $scope.openDeletePopup = function(recipe) {
      $scope.selectedRecipe = recipe; // Set selected recipe for deletion
      document.getElementById('deleteRecipeModal').style.display = 'block';
    };

    // Close Delete Confirmation Modal
    $scope.closeDeletePopup = function() {
      $scope.selectedRecipe = null;
      document.getElementById('deleteRecipeModal').style.display = 'none';
    };

    // Confirm Delete Recipe
    $scope.confirmDelete = function() {
      if ($scope.selectedRecipe && $scope.selectedRecipe._id) {
        $http.delete('/api/recipes/' + $scope.selectedRecipe._id)
          .then(function(response) {
            alert('Recipe deleted successfully');
            $scope.recipes = $scope.recipes.filter(r => r._id !== $scope.selectedRecipe._id);
            $scope.closeDeletePopup(); // Close modal after successful deletion
          })
          .catch(function(error) {
            console.error('Error deleting recipe:', error);
          });
      }
    };

    // Update Recipe
    $scope.updateRecipe = function() {
      if ($scope.selectedRecipe && $scope.selectedRecipe._id) {
        $http.put('/api/recipes/' + $scope.selectedRecipe._id, $scope.selectedRecipe)
          .then(function(response) {
            alert('Recipe updated successfully');
            for (let i = 0; i < $scope.recipes.length; i++) {
              if ($scope.recipes[i]._id === $scope.selectedRecipe._id) {
                $scope.recipes[i] = angular.copy($scope.selectedRecipe);
                break;
              }
            }
            document.getElementById('editRecipeModal').style.display = 'none';
          })
          .catch(function(error) {
            console.error('Error updating recipe:', error);
          });
      } else {
        console.error('Invalid recipe selected for update');
      }
    };
  });
