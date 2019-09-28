import {createUser, getUserById, getUsersByPhoneNumberAndUserType, updateUserById} from '../services/users';
import {errorMessages} from '../util/constants';
import {isAValidPhoneNumber, isAValidUserType, validateId} from '../util/validator';

export const usersRoute = [
    {
        path: '/users/{id}',
        method: 'GET',
        options: {
            handler: async (request) => {
                const id = request.params.id;
                return await getUserById(id)
                    .catch((err) => err);
            }
        }
    },
    {
        path: '/users/{id}',
        method: 'PUT',
        options: {
            handler: async (request) => {
                const id = request.params.id;
                const {
                    id: idFromPayload,
                    firstName,
                    secondName,
                    email
                } = request.payload;
                validateId(id, idFromPayload);
                return await updateUserById(firstName, secondName, email, id)
                    .then((result) => {
                        if (result.affectedRows === 0)
                            return errorMessages.ENTITY_DOESNT_EXIST;
                        else
                            return {
                                id,
                                firstName,
                                secondName,
                                email
                            }
                    })
                    .catch((err) => err);
            }
        }
    },
    {
        path: '/users',
        method: 'POST',
        options: {
            handler: async (request) => {
                const {
                    phoneNumber,
                    userType
                } = request.payload;
                let errors = [];
                userType.toLowerCase();
                const validPhoneNumber = isAValidPhoneNumber(phoneNumber);
                const validUserType = isAValidUserType(userType);


                if (validPhoneNumber && validUserType) {
                    const user = await getUsersByPhoneNumberAndUserType(phoneNumber, userType)
                        .catch((err) => err);
                    if (user.length) {
                        return errorMessages.ExistsAlready;
                    } else {
                        const userId = await createUser(phoneNumber, userType)
                            .catch((err) => err);
                        if (userId) {
                            return await getUserById(userId)
                                .catch((err) => err);
                        }
                    }
                } else {
                    if (!validPhoneNumber) {
                        errors.push({
                            errorMessage: errorMessages.InvalidPhoneNumber
                        });
                    }
                    if (!validUserType) {
                        errors.push({
                            errorMessage: errorMessages.InvalidUserType
                        });
                    }
                }
                return errors;
            }
        }
    }
];
