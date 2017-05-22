"use strict";

app.factory("BibleFactory", function($q, $http, FIREBASE_CONFIG) {


    var getKidsBible = function() {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/biblestories.json`)
            .success((response) => {
                let pins = [];
                Object.keys(response).forEach((key) => {
                    response[key].id = key;
                    pins.push(response[key]);
                });
                resolve(pins);
            })
            .error((errorResponse) => {
                reject(errorResponse);
            });
        });
    };

    var getTextToSpeech = function(book_id, chapter_id, testament) {
        return $q((resolve, reject) => {
            $http.get(`http://api.voicerss.org/?key=f6271e886a224fb1aa5061c768c91141&hl=en-us&src=Hello,%20world!`)
            .success((response) => {
                resolve(response);
            })
            .error((errorResponse) => {
                reject(errorResponse);
            });
        });
    };



    return {
            getKidsBible: getKidsBible,
            getTextToSpeech: getTextToSpeech
        };

});
