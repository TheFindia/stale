import {poolConnection} from '../util/db-connection';

const query = 'SELECT * FROM USER_PREFERENCES WHERE USER_ID = ?';

export const getUserPreferences = (userId) => {
    return new Promise((resolve, reject) => {
        poolConnection.query(query, [userId], (err, result) => {
            if(err)
                reject(err);
            else
                resolve(result[0]);
        })
    });
};
