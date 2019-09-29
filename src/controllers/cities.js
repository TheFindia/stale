import {createCity, getCityById, removeCity, updateCity} from '../services/cities';
import {validateId} from '../util/validator';
import {ERROR_MAPPINGS} from "../util/constants";

export const endpoints = [{
    path: '/cities/{id}',
    method: 'GET',
    options: {
        handler: (request, h) => {
            const {id} = request.params;

            return getCityById(id)
                .catch((e) => e);
        }
    }
}, {
    path: '/cities',
    method: 'POST',
    options: {
        payload: {
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        },
        handler: (request, h) => {
            const {cityName, cityImage} = request.payload;
            let fileName = '';

            if (cityImage) {
                fileName = cityImage.hapi['filename'];
            }

            return createCity(cityName, fileName)
                .then((id) => getCityById(id))
                .catch(error => error);
        }
    }
}, {
    path: '/cities/{id}',
    method: 'PUT',
    options: {
        payload: {
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        },
        handler: (request, h) => {
            const {id: idFromParams} = request.params;
            const {id: idFromPayload, cityName, cityImage} = request.payload;
            let fileName = '';

            if (cityImage) {
                fileName = cityImage.hapi['filename'];
            }

            validateId(idFromParams, idFromPayload);

            return updateCity(idFromParams, cityName, fileName)
                .then((result) => {
                    if (result.affectedRows === 0) {
                        return ERROR_MAPPINGS.ENTITY_DOESNT_EXIST;
                    }

                    return {
                        id: idFromPayload,
                        cityName,
                        cityImage
                    }
                })
                .catch(error => error);
        }
    }
}, {
    path: '/cities/{id}',
    method: 'DELETE',
    options: {
        handler: (request, h) => {
            const {id} = request.params;

            return removeCity(id)
                .catch(error => error);
        }
    }
}];
