import {isAValidPhoneNumber, isAValidUserType} from '../util/validator';
import {errorMessages} from '../util/constants';
import {createUser, getUserById, getUsersByPhoneNumberAndUserType} from '../services/users';

export const loginRoute = {
    path: '/login',
    method: 'GET',
    options: {
        handler: async (request) => {
            const phoneNumber = request.query.phoneNumber;
            const userType = request.query.userType;
            userType.toLowerCase();
            let errors = [];
            const validPhoneNumber = isAValidPhoneNumber(phoneNumber);
            const validUserType = isAValidUserType(userType);

            if (validPhoneNumber && validUserType) {
                // code to send otp and verify
                const user = await getUsersByPhoneNumberAndUserType(phoneNumber, userType)
                    .catch((err) => err);
                if (user.length) {
                    return user;
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
};
