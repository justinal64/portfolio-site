"use strict";

app.controller('NavCtrl', [
    '$scope', '$location', 'AuthFactory', '$rootScope',
     function($scope, $location, AuthFactory, $rootScope) {

    // is anyone logged in?
    $rootScope.userloggedin = false;
    // name if the user logged in
    $rootScope.name = "";

    $scope.login = () => {
        $location.url("/login");
    };

    $scope.dbp = () => {
        $location.url("/dbp");
    };

    $scope.kidsbible = () => {
        $location.url("/readbible");
    };

    $scope.logout = () => {
        AuthFactory.logout();
        $rootScope.userloggedin = false;
    };

    // Read the Bible Button
    $scope.readthebible = () => {
        $location.url("/readbible");
    };

}]);


