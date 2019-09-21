import {getConnection} from '../util/db-connection';
// const columnList ='CONTACT_NO, FIRST_NAME, SECOND_NAME, EMAIL, PASSWORD, IMAGE, LOGIN_FROM, CREATED_ON, ACTIVE';

const query = 'INSERT INTO FINDIA_USERS (CONTACT_NO) VALUES (?)';

export const registerNewUser = (phoneNumber) => {
    let response = '';

    getConnection().query(query, [phoneNumber], (error, results, fields) => {
        if (error) {
            response = {
                error: error.code
            };
        }
    });
    return response;
};
