"use strict";

app.factory("DBPFactory", function($q, $http) {

    // This dam_id is pulling an NT english version of NAS New American Standard Bible
    var getBible = function() {
        return $q((resolve, reject) => {
            $http.get(`http://dbt.io/library/book?key=c0c769e931f78307a6c1c65cc5bd1d8c&dam_id=ENGNAS&v=2`)
            .success((response) => {
                resolve(response);
            })
            .error((errorResponse) => {
                reject(errorResponse);
            });
        });
    };

    var getChapters = function(book_id) {
        return $q((resolve, reject) => {
            $http.get(`http://dbt.io/library/chapter?key=c0c769e931f78307a6c1c65cc5bd1d8c&dam_id=ENGNAS&book_id=${book_id}&v=2`)
            .success((response) => {
                resolve(response);
            })
            .error((errorResponse) => {
                reject(errorResponse);
            });
        });
    };

    var getVerse = function(book_id, chapter_id, testament) {
        return $q((resolve, reject) => {
            $http.get(`http://dbt.io/text/verse?key=c0c769e931f78307a6c1c65cc5bd1d8c&dam_id=${testament}&book_id=${book_id}&chapter_id=${chapter_id}&v=2`)
            .success((response) => {
                resolve(response);
            })
            .error((errorResponse) => {
                reject(errorResponse);
            });
        });
    };

    return {
            getBible: getBible,
            getChapters: getChapters,
            getVerse: getVerse
        };

});
