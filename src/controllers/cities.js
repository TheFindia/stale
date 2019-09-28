import {createCity, getCity, removeCity, updateCity} from '../services/cities';
import {validateId} from '../util/validator';
import {ERROR_MAPPINGS} from "../util/constants";

export const citiesRoute = [{
    path: '/cities/{id}',
    method: 'GET',
    options: {
        handler: (request, h) => {
            const {id} = request.params;

            return getCity(id)
                .catch((e) => e);
        }
    }
}, {
    path: '/cities',
    method: 'POST',
    options: {
        handler: (request, h) => {
            const {cityName, cityImage} = request.payload;

            return createCity(cityName, cityImage)
                .then((id) => getCity(id))
                .catch(error => error);
        }
    }
}, {
    path: '/cities/{id}',
    method: 'PUT',
    options: {
        handler: (request, h) => {
            const {id: idFromParams} = request.params;
            const {id: idFromPayload, cityName, cityImage} = request.payload;

            validateId(idFromParams, idFromPayload);

            return updateCity(idFromParams, cityName, cityImage)
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
