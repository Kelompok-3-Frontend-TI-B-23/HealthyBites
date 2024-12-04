angular.module('mainApp')
  .controller('editRecipeCtrl', function($scope, $http) {
    
    // Mengambil semua resep dari database
    $http.get('/api/recipes')
      .then(function(response) {
        $scope.recipes = response.data;
      })
      .catch(function(error) {
        console.error('Error fetching recipes:', error);
      });

    // Menampilkan popup edit
    $scope.openEditPopup = function(recipe) {
        $scope.selectedRecipe = angular.copy(recipe);
        $scope.selectedRecipe.nutritionCalories = $scope.selectedRecipe.nutrition.calories || 0;
        $scope.selectedRecipe.nutritionCarbs = $scope.selectedRecipe.nutrition.carbs || 0;
        $scope.selectedRecipe.nutritionProtein = $scope.selectedRecipe.nutrition.protein || 0;
        $scope.selectedRecipe.nutritionFat = $scope.selectedRecipe.nutrition.fat || 0;
      
        document.getElementById('editRecipeModal').style.display = 'block';
      };
      
    // Fungsi untuk menutup modal 
    $scope.closeEditPopup = function() {
        $scope.selectedRecipe = angular.copy($scope.originalRecipe); 
        document.getElementById('editRecipeModal').style.display = 'none';
      };
    // Fungsi untuk membuka modal delete
    $scope.openDeletePopup = function(recipe) {
        $scope.selectedRecipe = recipe; // Menyimpan resep yang dipilih
        document.getElementById('deleteRecipeModal').style.display = 'block';
      };
  
      // Fungsi untuk menutup modal delete
      $scope.closeDeletePopup = function() {
        $scope.selectedRecipe = null; 
        document.getElementById('deleteRecipeModal').style.display = 'none';
      };

    // Fungsi untuk menghapus resep
    $scope.deleteRecipe = function() {
      if ($scope.selectedRecipe && $scope.selectedRecipe._id) {
        $http.delete('/api/recipes/' + $scope.selectedRecipe._id)
          .then(function(response) {
            alert('Recipe deleted successfully');
            $scope.recipes = $scope.recipes.filter(recipe =>
              recipe._id !== $scope.selectedRecipe._id
            );
            document.getElementById('deleteRecipeModal').style.display = 'none';
          })
          .catch(function(error) {
            console.error('Error deleting recipe:', error);
          });
      } else {
        console.error('Invalid recipe selected for deletion');
      }
    };

    $scope.updateRecipe = function() {
        if ($scope.selectedRecipe && $scope.selectedRecipe._id) {
          $scope.selectedRecipe.nutrition = {
            calories: $scope.selectedRecipe.nutritionCalories,
            carbs: $scope.selectedRecipe.nutritionCarbs,
            protein: $scope.selectedRecipe.nutritionProtein,
            fat: $scope.selectedRecipe.nutritionFat
          };
      
          $http.put('/api/recipes/' + $scope.selectedRecipe._id, $scope.selectedRecipe)
            .then(function(response) {
              alert('Recipe updated successfully');
              // Memperbarui daftar resep di UI
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
