angular
  .module("mainApp")
  .controller("nutritionCtrl", function ($scope, $http) {
    // Get all nutrition data from the server
    $http
      .get("/api/nutrition")
      .then(function (response) {
        // Store the received nutrition data in $scope
        $scope.nutrition = response.data;
        // Initialize filters
        $scope.caloriesFilter = '';
        $scope.nutrientsFilter = '';
        $scope.searchQuery = '';
        $scope.filteredNutrition = $scope.nutrition; // Initial filtered nutrition data
      })
      .catch(function (error) {
        console.error("Error fetching nutrition data:", error);
      });

    // Function to filter nutrition data based on search query and selected filters
    $scope.filterNutrition = function () {
      $scope.filteredNutrition = $scope.nutrition.filter(function (item) {
        // Filter by search query (name or other properties)
        const matchesSearch = !$scope.searchQuery || item.name.toLowerCase().includes($scope.searchQuery.toLowerCase());

        const matchesCalories =
          !$scope.caloriesFilter ||
          ($scope.caloriesFilter === 'low' && item.calories <= 200) ||
          ($scope.caloriesFilter === 'medium' && item.calories > 201 && item.calories <= 300) ||
          ($scope.caloriesFilter === 'high' && item.calories > 300);

        // Filter by specific nutrients (e.g., protein, carbs, fat)
        const matchesNutrients =
          !$scope.nutrientsFilter ||
          item.nutrients.toLowerCase().includes($scope.nutrientsFilter.toLowerCase());

        return matchesSearch && matchesCalories && matchesNutrients;
      });
    };

    // Watch the filter values and update filtered nutrition data
    $scope.$watchGroup(
      ['caloriesFilter', 'nutrientsFilter', 'searchQuery'],
      function () {
        $scope.filterNutrition();
      }
    );

    // View more details about a selected nutrition item
    $scope.viewNutrition = function (nutritionId) {
      console.log("Selected Nutrition ID:", nutritionId); // Debugging: Ensure the ID is defined
      if (!nutritionId) {
        console.error("Nutrition ID is invalid!");
        return; // Don't proceed if nutritionId is invalid
      }
      $http
        .get("/api/nutrition/" + nutritionId)
        .then(function (response) {
          $scope.selectedNutrition = response.data;
          const modal = new bootstrap.Modal(document.getElementById('nutritionDetailModal'));
          modal.show();
        })
        .catch(function (error) {
          console.error("Error fetching nutrition detail:", error);
        });
    };
  });
