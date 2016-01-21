var app = angular.module("superCrudApp", ["ngRoute", "ngResource"]);


// factory

app.factory("Books", ["$resource", function($resource) {
	return $resource("https://super-crud.herokuapp.com/books/:bookId", 
		{bookId: "@bookId"}, {
		query: { 
			isArray: true,
			transformResponse: function(data) {
				return angular.fromJson(data).books; 
			}
		},
		update: { method:'PUT' }
	});

}]);

// routes

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider)  {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/books/index.html',
      controller: 'BooksIndexCtrl'
    })

    .when('/books/:id', {
      templateUrl: 'templates/books/show.html',
      controller: 'BooksShowCtrl'
    });

    $locationProvider
    .html5Mode({
      enabled: true,
      requireBase: false
    });
}]);


// controllers

app.controller('BooksIndexCtrl', ['$scope', 'Books', function ($scope, Books) {
  $scope.booksIndexTest = 'Connected to BooksIndexCtrl';
  // $scope.books = Books;
  $scope.allBooks = Books.query();

   $scope.addBook = function() {
		$scope.allBooks.push($scope.newBook);
		$scope.newBook = {};
	};

	$scope.updateBook = function(bookId) {
		Books.update({bookId: bookId}, $scope.updateBook, function(data) {
			$location.path("/");
		});
	};

  $scope.deleteBook = function(bookId) {
		Books.delete({bookId: bookId});
	};
}]);

app.controller('BooksShowCtrl', ['$scope', function ($scope) {
  $scope.booksShowTest = 'Connected to BooksShowCtrl';
}]);

app.controller('BooksShowCtrl', ['$scope', '$routeParams', 'Books', function ($scope, $routeParams, Books) {
  var bookId = $routeParams.id;
  $scope.book = Books.get({bookId: bookId});

  	$scope.updateBook = function(bookId) {
		Books.update({bookId: bookId}, $scope.updateBook, function(data) {
			$location.path("/");
		});
	};

  $scope.deleteBook = function(bookId) {console.log("something", bookId);
		Books.delete({bookId: bookId});
	};

}]);