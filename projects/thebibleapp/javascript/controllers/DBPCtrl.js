"use strict";

app.controller("DBPCtrl", function($scope, DBPFactory) {
    $scope.booksOfBibles = {};
    $scope.chapters = {};
    $scope.bookSelected = {};
    $scope.showchapters = false;
    $scope.adultbible = false;
    $scope.book = "";
    $scope.verses = {};
    // Used to determine if it is the old or new testament
    let NT = "ENGNASN2ET";
    let OT = "ENGNASO2ET";
    let testament = "";


    $scope.getBooksOfBible = () => {
        DBPFactory.getBible().then((response) => {
            response.forEach((item, index) => {
                // create an array of chapters instead of comma seperated string
                item.chapters = item.chapters.split(',');
                $scope.booksOfBibles[index] = item;
            });
        });
    };
    $scope.getBooksOfBible();

    $scope.getChapter = () => {
    };

    $scope.bookSelected = (book_id) => {
        Object.keys($scope.booksOfBibles).forEach((key, value) => {
            if($scope.booksOfBibles[key].book_id === book_id) {
                $scope.chapters = $scope.booksOfBibles[key].chapters;
                $scope.showchapters = true;
                $scope.book = book_id;
                // determine weather it's old or new testament
                if($scope.booksOfBibles[key].book_order <= 39) {
                    testament = OT;
                } else {
                    testament = NT;
                }
            }
        });
    };

    $scope.chapterLookup = (chapter_id) => {
        DBPFactory.getVerse($scope.book, chapter_id, testament).then((response) => {
            $scope.verses = response;
            $scope.adultbible = true;
        });
    };

    $scope.previous = () => {
    };

});