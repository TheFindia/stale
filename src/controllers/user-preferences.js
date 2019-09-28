import {createUserPreference, getUserPreference, updateUserPreferences} from '../services/preferences';
import {validateId} from '../util/validator';
import {ERROR_MAPPINGS} from "../util/constants";

export const userPreferencesRoute = [{
    path: '/userPreferences/{id}',
    method: 'GET',
    options: {
        handler: (request, h) => {
            const {id} = request.params;

            return getUserPreference(id)
                .catch((e) => e);
        }
    }
}, {
    path: '/userPreferences',
    method: 'POST',
    options: {
        handler: (request, h) => {
            const {userId, cityId, areaId} = request.payload;

            return createUserPreference(userId, cityId, areaId)
                .then((id) => getUserPreference(id))
                .catch((e) => e);
        }
    }
}, {
    path: '/userPreferences/{id}',
    method: 'PUT',
    options: {
        handler: (request, h) => {
            const {id: idFromParams} = request.params;
            const {id: idFromPayload, cityId, areaId} = request.payload;

            validateId(idFromParams, idFromPayload);

            return updateUserPreferences(idFromPayload, cityId, areaId)
                .then((result) => {
                    if (result.affectedRows === 0) {
                       return ERROR_MAPPINGS.ENTITY_DOESNT_EXIST;
                    }

                    return {
                        id: idFromPayload,
                        cityId,
                        areaId
                    }
                })
                .catch((e) => e);
        }
    }
}, {
    path: '/userPreferences',
    method: 'DELETE',
    options: {
        handler: (request, h) => {
            // NOT REQUIRED
        }
    }
}];
