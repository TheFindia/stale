import {poolConnection} from '../util/db-connection';

const updateQuery = 'update user_preferences set area=?,city=? where user_id = ?';

export const updateUserPreferences = (userId, area, city) => {
    return new Promise((resolve, reject) => {
        poolConnection.query(updateQuery, [area, city, userId], (err, result) => {
            if(err)
                reject(err);
            else {
                resolve(result.affectedRows);
            }
        })
    });
};
