import {createCity, getCity, updateCity, removeCity} from '../services/cities';

export const citiesRoute = [{
    path: '/cities/{cityName}',
    method: 'GET',
    options: {
        handler: (request, h) => {
            const {params} = request;
            const {cityName} = params;

            return getCity(cityName)
                .catch((e) => e);
        }
    }
}, {
    path: '/cities',
    method: 'POST',
    options: {
        handler: (request, h) => {
            const {payload} = request;
            const {cityName, cityImage} = payload;

            return createCity(cityName, cityImage)
                .catch(error => error);
        }
    }
}, {
    path: '/cities/{cityName}',
    method: 'PUT',
    options: {
        handler: (request, h) => {
            const {payload, params} = request;
            const {cityName: oldCityName} = params;
            const {cityName: newCityName, cityImage} = payload;

            return updateCity(oldCityName, newCityName, cityImage)
                .catch(error => error);
        }
    }
}, {
    path: '/cities/{cityName}',
    method: 'DELETE',
    options: {
        handler: (request, h) => {
            const {params} = request;
            const {cityName} = params;

            return removeCity(cityName)
                .catch(error => error);
        }
    }
}];
