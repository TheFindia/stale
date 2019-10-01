import {createArea, getAreaById, removeArea, updateArea} from '../services/areas';
import {validateId} from "../util/validator";
import {ERROR_MAPPINGS} from "../util/constants";

export const endpoints = [{
    path: '/areas/{id}',
    method: 'GET',
    options: {
        handler: async (request) => {
            const {id} = request.params;

            return await getAreaById(id)
                .catch((e) => e);
        }
    }
}, {
    path: '/areas',
    method: 'POST',
    options: {
        payload: {
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        },
        handler: async (request) => {
            const {areaName, cityId, areaImage} = request.payload;

            let fileName = '';

            if (areaImage) {
                fileName = areaImage.hapi['filename'];
            }
            return await createArea(areaName, cityId, fileName)
                .then((id) => getAreaById(id))
                .catch((e) => e);
        }
    }
}, {
    path: '/areas/{id}',
    method: 'PUT',
    options: {
        payload: {
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        },
        handler: (request, h) => {
            const {id: idFromParams} = request.params;
            const {id: idFromPayload, areaName, areaImage} = request.payload;
            let fileName = '';

            if (areaImage) {
                fileName = areaImage.hapi['filename'];
            }

            validateId(idFromParams, idFromPayload);

            return updateArea(idFromParams, areaName, fileName)
                .then((result) => {
                    if (result.affectedRows === 0) {
                        return ERROR_MAPPINGS.ENTITY_DOESNT_EXIST;
                    }

                    return {
                        id: idFromPayload,
                        areaName,
                        areaImage
                    }
                })
                .catch(error => error);
        }
    }
}, {
    path: '/areas/{id}',
    method: 'DELETE',
    options: {
        handler: (request, h) => {
            const {id} = request.params;

            return removeArea(id)
                .catch(error => error);
        }
    }
}];
