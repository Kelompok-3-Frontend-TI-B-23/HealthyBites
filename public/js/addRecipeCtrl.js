// angular.module('mainRecipe', [])
//   .controller('addRecipeCtrl', ['$scope', '$http', function($scope, $http) {

//     // Model untuk menyimpan data resep
//     $scope.recipe = {
//       title: '',
//       duration: '',
//       difficulty: 'Easy',
//       description: '',
//       calories: '',
//       serving: '',
//       ingredients: '',
//       steps: '',
//       nutritionCalories: '',
//       nutritionCarbs: '',
//       nutritionProtein: '',
//       nutritionFat: ''
//     };

//     // Fungsi untuk mengirimkan resep
//     $scope.submitRecipe = function() {
//       // Mengonversi ingredients dan steps ke dalam format array
//       $scope.recipe.ingredients = $scope.recipe.ingredients.split(',').map(function(item) { return item.trim(); });
//       $scope.recipe.steps = $scope.recipe.steps.split(',').map(function(item) { return item.trim(); });

//       // Membuat FormData untuk mengirim data gambar bersama data JSON
//       var formData = new FormData();
//       formData.append("recipe", JSON.stringify($scope.recipe));
//       if ($scope.image) {
//         formData.append("image", $scope.image);
//       }

//       // Mengirimkan data ke backend
//       $http.post('/api/recipes/upload', formData, {
//         headers: { 'Content-Type': undefined }
//       }).then(function(response) {
//         alert("Recipe uploaded successfully!");
//         console.log(response.data);
//       }, function(error) {
//         alert("Error uploading recipe.");
//         console.log(error);
//       });
//     };

//     // Fungsi untuk menangani file input
//     $scope.setFile = function(files) {
//       if (files && files.length) {
//         $scope.image = files[0];
//       }
//     };
//   }]);
