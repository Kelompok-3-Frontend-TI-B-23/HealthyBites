angular
  .module("newsApp", [])
  .controller("newsCtrl", function ($scope, $http) {
    // Ambil semua berita dari server
    $http
      .get("/api/news")
      .then(function (response) {
        // Simpan data berita yang diterima di $scope
        $scope.newsList = response.data;
      })
      .catch(function (error) {
        console.error("Error fetching news:", error);
      });

    // Fungsi untuk melihat detail berita berdasarkan ID
    $scope.viewNews = function (newsId) {
      console.log("Selected News ID:", newsId); // Debugging: Pastikan ID ini terdefinisi
      if (!newsId) {
        console.error("News ID is invalid!");
        return; // Jangan lanjutkan jika newsId tidak valid
      }
      $http
        .get("/api/news/" + newsId)
        .then(function (response) {
          $scope.selectedNews = response.data;
          // Modal untuk menampilkan detail berita
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
        $scope.newsList.push(response.data); // Menambahkan berita yang baru ditambahkan ke list
        $scope.newNews = {}; // Reset form setelah berhasil
      })
      .catch(function (error) {
        console.error("Error adding news:", error);
      });
    };
  });
