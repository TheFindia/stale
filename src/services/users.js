import {pool} from '../util/db-connection';
import uuidv1 from 'uuid/v1';
import {handleError} from '../util/helper';

export const getUsersByPhoneNumberAndUserType = (phoneNumber, userType) => {
    const query = 'SELECT ID as id, FIRST_NAME as firstName, SECOND_NAME as secondName, EMAIL as email, CONTACT_NO as phoneNumber FROM USERS WHERE CONTACT_NO=? AND USER_TYPE=?';

    return new Promise(function (resolve, reject) {
        pool.query(query, [phoneNumber, userType], function (err, result) {
            if (err) {
                handleError(err.code, reject);
            } else {
                resolve(result);
            }
        });
    });
};

export const getUserById = (id) => {
    const query = 'SELECT ID as id, FIRST_NAME as firstName, SECOND_NAME as secondName, EMAIL as email, CONTACT_NO as phoneNumber FROM USERS WHERE ID=?';

    return new Promise((resolve, reject) => {
        pool.query(query, [id], (err, result) => {
            if (err) {
                handleError(err.code, reject);
            } else {
                resolve(result);
            }
        });
    });
};

export const createUser = (phoneNumber, userType) => {
    const query = 'INSERT INTO USERS (ID, CONTACT_NO, USER_TYPE) VALUES (?,?,?)';

    return new Promise(function (resolve, reject) {
        const id = uuidv1();

        pool.query(query, [id, phoneNumber, userType], (err) => {
            if (err) {
                handleError(err.code, reject);
            } else {
                resolve(id);
            }
        });
    });
};

export const updateUserById = (firstName, secondName, email, id) => {
    const query = 'UPDATE USERS SET FIRST_NAME=?, SECOND_NAME=?, EMAIL=? WHERE ID=?';

    return new Promise((resolve, reject) => {
        pool.query(query, [firstName, secondName, email, id], (err, result) => {
            if (err) {
                handleError(err.code, reject);
            } else {
                resolve(result);
            }
        });
    });
};
