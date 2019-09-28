import {pool} from '../util/db-connection';
import {DB_ERROR_MAPPINGS} from '../util/constants';

const createCityQuery = 'insert into CITIES(city_name, city_image) values (?,?)';

export const createCity = (cityName, cityImage) => {
    return new Promise((resolve, reject) => {
        pool.query(createCityQuery, [cityName, cityImage], (err, result) => {
            if (err) {
                if (DB_ERROR_MAPPINGS[err.code])
                    reject(DB_ERROR_MAPPINGS[err.code]);
                else
                    reject(err.code);
            } else {
                resolve(result.affectedRows);
            }
        })
    });
};

const getCityQuery = 'SELECT * FROM CITIES WHERE CITY_NAME = ?';

export const getCity = (cityName) => {
    return new Promise((resolve, reject) => {
        pool.query(getCityQuery, [cityName], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    });
};

const removeCityQuery = 'delete from cities where city_name=?';

export const removeCity = (cityName) => {
    return new Promise((resolve, reject) => {
        pool.query(removeCityQuery, [cityName], (err, result) => {
            if (err) {
                if (DB_ERROR_MAPPINGS[err.code])
                    reject(DB_ERROR_MAPPINGS[err.code]);
                else
                    reject(err.code);
            } else {
                if (result.affectedRows === 0) {
                    resolve(DB_ERROR_MAPPINGS['CITY_DOESNT_EXIST']);
                }
                resolve(result.affectedRows);
            }
        })
    });
};

const updateCityQuery = 'UPDATE CITIES set city_name=?, city_image=? where city_name=?';

export const updateCity = (oldCityName, newCityName, cityImage) => {
    return new Promise((resolve, reject) => {
        pool.query(updateCityQuery, [newCityName, cityImage, oldCityName], (err, result) => {
            if (err) {
                if (DB_ERROR_MAPPINGS[err.code])
                    reject(DB_ERROR_MAPPINGS[err.code]);
                else
                    reject(err.code);
            } else {
                if (result.affectedRows === 0) {
                    resolve(DB_ERROR_MAPPINGS['CITY_DOESNT_EXIST']);
                }
                resolve(result.affectedRows);
            }
        })
    });
};


