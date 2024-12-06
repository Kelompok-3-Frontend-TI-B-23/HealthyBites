angular.module('mainApp')
  .controller('editNewsCtrl', function($scope, $http) {
    
    // Fetch all news from the database
    $http.get('/api/news')
      .then(function(response) {
        $scope.news = response.data;
      })
      .catch(function(error) {
        console.error('Error fetching news:', error);
      });

    // Open Edit Popup
    $scope.openEditPopup = function(news) {
        $scope.selectedNews = angular.copy(news);
        // Set default nutrition values if not present
        document.getElementById('editNewsModal').style.display = 'block';
    };
    
    // Close Edit Popup
    $scope.closeEditPopup = function() {
        $scope.selectedNews = angular.copy($scope.originalNews); 
        document.getElementById('editNewsModal').style.display = 'none';
    };

    // Open Delete Confirmation Modal
    $scope.openDeletePopup = function(news) {
      $scope.selectedNews = news; // Set selected news for deletion
      document.getElementById('deleteNewsModal').style.display = 'block';
    };

    // Close Delete Confirmation Modal
    $scope.closeDeletePopup = function() {
      $scope.selectedNews = null;
      document.getElementById('deleteNewsModal').style.display = 'none';
    };

    // Confirm Delete News
    $scope.confirmDelete = function() {
      if ($scope.selectedNews && $scope.selectedNews._id) {
        $http.delete('/api/news/' + $scope.selectedNews._id)
          .then(function(response) {
            alert('News deleted successfully');
            $scope.news = $scope.news.filter(r => r._id !== $scope.selectedNews._id);
            $scope.closeDeletePopup(); // Close modal after successful deletion
          })
          .catch(function(error) {
            console.error('Error deleting News:', error);
          });
      }
    };

    // Update News
    $scope.updateNews = function() {
      if ($scope.selectedNews && $scope.selectedNews._id) {
        $http.put('/api/news/' + $scope.selectedNews._id, $scope.selectedNews)
          .then(function(response) {
            alert('News updated successfully');
            for (let i = 0; i < $scope.news.length; i++) {
              if ($scope.news[i]._id === $scope.selectedNews._id) {
                $scope.news[i] = angular.copy($scope.selectedNews);
                break;
              }
            }
            document.getElementById('editNewsModal').style.display = 'none';
          })
          .catch(function(error) {
            console.error('Error updating news:', error);
          });
      } else {
        console.error('Invalid news selected for update');
      }
    };
  });
