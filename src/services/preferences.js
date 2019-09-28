import {pool} from '../util/db-connection';
import {handleError} from '../util/helper';
import uuidv1 from 'uuid/v1';

const query = 'SELECT id, city_id as cityId, user_id as userId, area_id as areaId FROM USER_PREFERENCES WHERE id = ?';

export const getUserPreference = (userPreferenceId) => {
    return new Promise((resolve, reject) => {
        pool.query(query, [userPreferenceId], (err, result) => {
            if (err)
                handleError(err.code, reject);
            else
                resolve(result);
        })
    });
};

const updateQuery = 'update user_preferences set area_Id=?,city_=? where user_id = ?';

export const updateUserPreferences = (userId, areaId, cityId) => {
    return new Promise((resolve, reject) => {
        pool.query(updateQuery, [areaId, cityId, userId], (err, result) => {
            if (err)
                handleError(err.code, reject);
            else {
                resolve(result);
            }
        })
    });
};

const createUserPreferenceQuery = 'insert into user_preferences (id, user_id, city_id, area_id) values(?,?,?,?)';

export const createUserPreference = (userId, cityId, areaId) => {
    const id = uuidv1();

    return new Promise((resolve, reject) => {
        pool.query(createUserPreferenceQuery, [id, userId, cityId, areaId], (err, result) => {
            if (err)
                handleError(err.code);
            else
                resolve(result.affectedRows);

        })
    })
};

