angular
  .module("mainApp")
  .controller("newsCtrl", function ($scope, $http) {
    // Ambil semua berita dari server
    $http
      .get("/api/news")
      .then(function (response) {
        $scope.newsList = response.data;
        console.log($scope.newsList);
      })
      .catch(function (error) {
        console.error("Error fetching news:", error);
      });

    // Fungsi untuk melihat detail berita berdasarkan ID
    $scope.viewNews = function (newsId) {
      console.log("Selected News ID:", newsId);
      if (!newsId) {
        console.error("News ID is invalid!");
        return;
      }
      $http
        .get("/api/news/" + newsId)
        .then(function (response) {
          $scope.selectedNews = response.data;
          const modal = new bootstrap.Modal(document.getElementById('newsDetailModal'));
          modal.show();
        })
        .catch(function (error) {
          console.error("Error fetching news detail:", error);
        });
    };

    // Fungsi untuk menambahkan berita baru
    $scope.addNews = function () {
      const formData = new FormData();
      formData.append("title", $scope.newNews.title);
      formData.append("content", $scope.newNews.content);
      formData.append("source", $scope.newNews.source);
      formData.append("image", $scope.newNews.image);

      $http.post("/api/news", formData, {
        headers: { 'Content-Type': undefined }
      })
      .then(function (response) {
        alert("News added successfully!");
        $scope.newsList.push(response.data);
        $scope.newNews = {};
      })
      .catch(function (error) {
        console.error("Error adding news:", error);
      });
    };

    // Fungsi filter case-insensitive
    $scope.caseInsensitiveFilter = function (news) {
      if (!$scope.searchQuery) return true; // Tampilkan semua jika query kosong
      const query = $scope.searchQuery.toLowerCase(); // Query pencarian ke huruf kecil
      return news.title.toLowerCase().includes(query); // Periksa kecocokan pada title
    };

    // Inisialisasi query pencarian
    $scope.searchQuery = "";
  });
