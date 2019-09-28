import {pool} from '../util/db-connection';
import {ERROR_MAPPINGS} from '../util/constants';
import {handleError} from '../util/helper';
import uuidv1 from 'uuid/v1';

const createCityQuery = 'insert into CITIES(id, city_name, city_image) values (?,?,?)';

export const createCity = (cityName, cityImage) => {
    const id = uuidv1();

    return new Promise((resolve, reject) => {
        pool.query(createCityQuery, [id, cityName, cityImage], (err) => {
            if (err) {
                handleError(err.code, reject);
            } else {
                resolve(id);
            }
        })
    });
};

const getCityQuery = 'SELECT id, city_name as cityName, city_image as cityImage FROM CITIES WHERE ID = ?';

export const getCity = (cityId) => {
    return new Promise((resolve, reject) => {
        pool.query(getCityQuery, [cityId], (err, result) => {
            if (err) {
                handleError(err.code, reject);
            } else {
                resolve(result);
            }
        })
    });
};

const removeCityQuery = 'delete from cities where id=?';

export const removeCity = (cityId) => {
    return new Promise((resolve, reject) => {
        pool.query(removeCityQuery, [cityId], (err, result) => {
            if (err) {
                handleError(err.code, reject);
            } else {
                if (result.affectedRows === 0) {
                    resolve(ERROR_MAPPINGS['ENTITY_DOESNT_EXIST']);
                }
                resolve(result.affectedRows);
            }
        })
    });
};

const updateCityQuery = 'UPDATE CITIES set city_name=?, city_image=? where id=?';

export const updateCity = (cityId, cityName, cityImage) => {
    return new Promise((resolve, reject) => {
        pool.query(updateCityQuery, [cityName, cityImage, cityId], (err, result) => {
            if (err) {
                handleError(err.code, reject);
            } else {
                resolve(result);
            }
        })
    });
};


