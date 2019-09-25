import {getUsersById, updateUsersById} from '../services/users';

export const usersRoute = [{
    path: '/users/{id}',
    method: 'GET',
    options: {
        handler: async (request) => {
            const id = request.params.id;
            return await getUsersById(id);
        }
    }
}, {
    path: '/users/{id}',
    method: 'PUT',
    options: {
        handler: async (request) => {
            const id = request.params.id;
            const {
                firstName,
                secondName,
                email
            } = request.payload;
            return await updateUsersById(firstName, secondName, email, id);
        }
    }
}];
