import {getUserPreferences} from '../services/get-user-preferences';
import {updateUserPreferences} from '../services/update-user-preferences';

export const userPreferencesRoute = [{
    path: '/userPreferences',
    method: 'GET',
    options: {
        handler: (request, h) => {
            const {query} = request;
            const {userId} = query;

            try {
                return getUserPreferences(userId);
            } catch (e) {
                return e;
            }
        }
    }
}, {
    path: '/userPreferences',
    method: 'POST',
    options: {
        handler: (request, h) => {
           // NOT REQUIRED
        }
    }
}, {
    path: '/userPreferences',
    method: 'PUT',
    options: {
        handler: (request, h) => {
            const {query} = request;
            const {userId, city, area} = query;

            try {
                return updateUserPreferences(userId, city, area)
            } catch (e) {
                return e;
            }
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
