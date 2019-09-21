import {getConnection} from '../util/db-connection';

const query = 'SELECT ACTIVE FROM FINDIA_USERS WHERE CONTACT_NO = ?';

export const getUser = (phoneNumber) => {
    let response = '';

    getConnection().query(query, [phoneNumber], (error, results, fields) => {
        if (error) {
            response = {
                error: error.code
            };
        }
        response = results[0] ? results[0].ACTIVE : '';
    });
    return response;
};
