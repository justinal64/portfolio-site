"use strict";

app.controller('AuthCtrl', function($scope, $location, $rootScope, AuthFactory, UserFactory) {
    $rootScope.user = {};
    $scope.loginContainer = true;
    $scope.registerContainer = false;
    $scope.login = {
        email: "a@a.com",
        password: "123456"
    };

    $scope.googleLoginContainer = false;

    if($location.path() === "/logout") {
        AuthFactory.logout();
        $rootScope.user = {};
        $location.url("/auth");
    }

    let logMeIn = function(loginStuff) {
        AuthFactory.authenticate(loginStuff).then((didLogin) => {
            $rootScope.userloggedin = true;
            return UserFactory.getUser(didLogin.uid);
        }).then((userCreds) => {
            $rootScope.user = userCreds;
            $scope.login = {};
            $scope.register = {};
            $location.url(`/readbible`);
        });
    };

    $scope.setLoginContainer = () => {
        $scope.loginContainer = true;
        $scope.registerContainer = false;
        $scope.googleLoginContainer = false;
    };

    $scope.setRegisterContainer = () => {
        $scope.loginContainer = false;
        $scope.registerContainer = true;
        $scope.googleLoginContainer = false;
    };

    $scope.setGoogleLoginContainer = () => {
        $scope.loginContainer = false;
        $scope.registerContainer = false;
        $scope.googleLoginContainer = true;
    };

    $scope.registerUser = (registerNewUser) => {
        // new users will start at story 0
        registerNewUser.lastread = 0;
        AuthFactory.registerWithEmail(registerNewUser).then((didRegister) => {
            registerNewUser.uid = didRegister.uid;
            return UserFactory.addUser(registerNewUser);
        }).then((registerComplete) => {
            logMeIn(registerNewUser);
        });
    };

    $scope.loginUser = (loginNewUser) => {
        logMeIn(loginNewUser);
    };

    $scope.googleLoginUser = () => {
        AuthFactory.authenticateGoogle().then((userData) => {
          // The signed-in user info.
          $rootScope.user = {
            uid: userData.uid,
            username: userData.displayName
          };
          $location.url(`/boards/list`);
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    };

});
