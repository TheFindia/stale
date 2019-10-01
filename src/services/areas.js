import {pool} from '../util/db-connection';
import {ERROR_MAPPINGS} from '../util/constants';
import uuidv1 from "uuid/v1";
import {handleError} from "../util/helper";

const getAreaByIdQuery = 'Select * from areas where id=?';

export const getAreaById = (areaId) => {
    return new Promise((resolve, reject) => pool.query(getAreaByIdQuery, [areaId], (err, result) => {
        if (err) {
            handleError(err.code, reject);
        } else {
            return resolve(result);
        }
    }));
};

const createAreaQuery = 'insert into areas(id, area_name, city_id, area_image) values(?,?,?,?)';

export const createArea = (areaName, cityId, areaImage = '') => {
    const id = uuidv1();

    return new Promise((resolve, reject) => {
        pool.query(createAreaQuery, [id, areaName, cityId, areaImage], (err, result) => {
            if (err) {
                handleError(err.code, reject);
            } else
                resolve(id);
        });
    })
};

const removeAreaQuery = 'delete from areas where id=?';

export const removeArea = (areaId) => {
    return new Promise((resolve, reject) => {
        pool.query(removeAreaQuery, [areaId], (err, result) => {
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

const updateAreaQuery = 'UPDATE AREAS set area_name=?, area_image=? where id=?';

export const updateArea = (areaId, areaName, areaImage = '') => {
    return new Promise((resolve, reject) => {
        pool.query(updateAreaQuery, [areaName, areaImage, areaId], (err, result) => {
            if (err) {
                handleError(err.code, reject);
            } else {
                resolve(result);
            }
        })
    });
};
