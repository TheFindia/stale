import {pool} from '../util/db-connection';
import uuidv1 from 'uuid/v1';
// const columnList ='CONTACT_NO, FIRST_NAME, SECOND_NAME, EMAIL, PASSWORD, IMAGE, LOGIN_FROM, CREATED_ON, ACTIVE';

export const getUsersByPhoneNumberAndUserType = (phoneNumber, userType) => {
    const query = 'SELECT ID, FIRST_NAME, SECOND_NAME, EMAIL, CONTACT_NO FROM USERS WHERE CONTACT_NO=? AND USER_TYPE=?';

    return new Promise(function (resolve, reject) {
        pool.query(query, [phoneNumber, userType], function (err, result) {
            if (!err) resolve(result[0]);
            else reject(err);
        });
    });
};

export const registerNewUser = (phoneNumber, userType) => {
    const query = 'INSERT INTO USERS (ID, CONTACT_NO, USER_TYPE) VALUES (?,?,?)';

    return new Promise(function (resolve, reject) {
        const id = uuidv1();

        pool.query(query, [id, phoneNumber, userType], function (err, result) {
            if (!err) resolve(result.affectedRows);
            else reject(err);
        });
    });
};

export const getUsersById = (id) => {
    const query = 'SELECT ID, FIRST_NAME, SECOND_NAME, EMAIL, CONTACT_NO FROM USERS WHERE ID=?';

    return new Promise(function (resolve, reject) {
        pool.query(query, [id], function (err, result) {
            if (!err) resolve(result[0]);
            else reject(err);
        });
    });
};

// export const updateUsersById = (firstName = '', secondName = '', email = '', id) => {
// //     const query = 'INSERT INTO USERS (FIRST_NAME, SECOND_NAME, EMAIL) VALUES (?,?,?) WHERE ID=?';
// //
// //     return new Promise(function (resolve, reject) {
// //         pool.query(query, [firstName, secondName, email, id], function (err, result) {
// //             if (!err) resolve(result.affectedRows);
// //             else reject(err);
// //         });
// //     });
// // };
