"use strict";

app.controller("ReadBibleCtrl", function($scope, BibleFactory, $filter, $rootScope, $location, UserFactory, AuthFactory) {
    $scope.bible = {};
    $scope.data = {};
    let textToSpeech = 'http://api.voicerss.org/?key=f6271e886a224fb1aa5061c768c91141&hl=en-us&src=';

    // This is used to determine what tab is shown
    if($rootScope.user === undefined) {
        $scope.data.selectedIndex = 0;
    } else {
        $scope.data.selectedIndex = $rootScope.user.lastread;
    }

    // this updates the lastread page each time the user switches tabs
    $scope.lastread = (bible) => {
        if($rootScope.user !== undefined) {
            let editUser = {};
            UserFactory.getUser($rootScope.user.uid).then((response) => {
                editUser = {
                    id: response.id,
                    lastread: bible.id.substring(5) // this removes story from the id
                };
            }).then(() => {
                UserFactory.editUser(editUser);
            });
        }
    };

    let getKidsBible = () => {
        BibleFactory.getKidsBible().then((response) => {
            $scope.bibles = response;
        });
    };
    // populate array with all verses from db
    getKidsBible();

    $scope.next = () => {
        BibleFactory.getTextToSpeech().then((response) => {
            $scope.spokenText = response;
        });

    };

    $scope.play = (story) => {
        let audio = document.getElementById("readAudiobible");
        audio.src = textToSpeech + story;
        audio.play();
    };

});
