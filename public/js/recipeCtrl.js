angular
  .module("mainApp")
  .controller("recipeCtrl", function ($scope, $http) {
    // Get all recipes from the server
    $http
      .get("/api/recipes")
      .then(function (response) {
        // Store the received recipe data in $scope
        $scope.recipes = response.data || []; // Ensure it's an array even if response is empty
        // Initialize filters
        $scope.durationFilter = '';
        $scope.difficultyFilter = '';
        $scope.caloriesFilter = '';
        $scope.searchQuery = '';
        $scope.filteredRecipes = $scope.recipes; // Initial filtered recipes
      })
      .catch(function (error) {
        console.error("Error fetching recipes:", error);
      });

    // Function to filter recipes based on search query and selected filters
    $scope.filterRecipes = function () {
      // Check if $scope.recipes is an array before filtering
      if (Array.isArray($scope.recipes)) {
        $scope.filteredRecipes = $scope.recipes.filter(function (recipe) {
          // Filter by search query (title or other properties)
          const matchesSearch = !$scope.searchQuery || recipe.title.toLowerCase().includes($scope.searchQuery.toLowerCase());

          // Filter by duration (0-30, 31-60, 61+)
          const matchesDuration =
            !$scope.durationFilter ||
            ($scope.durationFilter === 'singkat' && recipe.duration <= 30) ||
            ($scope.durationFilter === 'sedang' && recipe.duration > 30 && recipe.duration <= 60) ||
            ($scope.durationFilter === 'lama' && recipe.duration > 60);

          // Filter by difficulty (mudah, sedang, sulit)
          const matchesDifficulty =
            !$scope.difficultyFilter || recipe.difficulty.toLowerCase() === $scope.difficultyFilter.toLowerCase();

          // Filter by calories (0-300, 301-600, 601+)
          const matchesCalories =
            !$scope.caloriesFilter ||
            ($scope.caloriesFilter === 'rendah' && recipe.calories <= 300) ||
            ($scope.caloriesFilter === 'sedang' && recipe.calories > 300 && recipe.calories <= 600) ||
            ($scope.caloriesFilter === 'tinggi' && recipe.calories > 600);

          return matchesSearch && matchesDuration && matchesDifficulty && matchesCalories;
        });
      } else {
        console.error("Recipes data is not an array or is undefined.");
      }
    };

    // Watch the filter values and update filtered recipes
    $scope.$watchGroup(
      ['durationFilter', 'difficultyFilter', 'caloriesFilter', 'searchQuery'],
      function () {
        $scope.filterRecipes();
      }
    );

    $scope.viewRecipe = function (recipeId) {
      console.log("Selected Recipe ID:", recipeId); // Debugging: Pastikan id ini terdefinisi
      if (!recipeId) {
        console.error("Recipe ID is invalid!");
        return; // Jangan lanjutkan jika recipeId tidak valid
      }
      $http
        .get("/api/recipes/" + recipeId)
        .then(function (response) {
          $scope.selectedRecipe = response.data;
          const modal = new bootstrap.Modal(document.getElementById('recipeDetailModal'));
          modal.show();
        })
        .catch(function (error) {
          console.error("Error fetching recipe detail:", error);
        });
    };
  });
