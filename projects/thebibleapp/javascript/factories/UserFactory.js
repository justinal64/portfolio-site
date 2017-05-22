"use strict";

app.factory("UserFactory", function($q, $http, FIREBASE_CONFIG) {

    let addUser = (authData) => {
        return $q((resolve, reject) => {
            console.log("authData = ", authData);
            $http.post(`${FIREBASE_CONFIG.databaseURL}/users.json`,
                JSON.stringify({
                    uid: authData.uid,
                    username: authData.name,
                    lastread: authData.lastread
                })
            )
            .success((storeUserSuccess) => {
                resolve(storeUserSuccess);
            })
            .error((storeUserError) => {
                reject(storeUserError);
            });
        });
    };

    let getUser = (userId) => {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/users.json?orderBy="uid"&equalTo="${userId}"`)
            .success((userObject) => {
                let users = [];
                Object.keys(userObject).forEach((key) => {
                    // console.log(userObject);
                    // console.log(key);
                    userObject[key].id = key;
                    // console.log(userObject);
                    users.push(userObject[key]);
                });
                resolve(users[0]);
            })
            .error((error) => {
                reject(error);
            });
        });
    };

    var editUser = function(editUser) {
        console.log("factory edit", editUser);
        return $q((resolve, reject) => {
            $http.patch(`${FIREBASE_CONFIG.databaseURL}/users/${editUser.id}.json`,
                    JSON.stringify({
                        lastread: editUser.lastread
                    })
                )
                .success((editResponse) => {
                    resolve(editResponse);
                })
                .error((editError) => {
                    reject(editError);
                });
        });
    };

    return{addUser: addUser, getUser: getUser, editUser: editUser};
});