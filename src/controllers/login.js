import {isAValidPhoneNumber, isAValidUserType} from '../util/validator';
import {errorMessages} from '../util/constants';
import {getUsersByPhoneNumberAndUserType, registerNewUser} from '../services/users';

export const loginRoute = {
    path: '/login',
    method: 'GET',
    options: {
        handler: async (request, h) => {
            const phoneNumber = request.query.phoneNumber;
            const userType = request.query.userType;
            let errors = [];
            const validPhoneNumber = isAValidPhoneNumber(phoneNumber);
            const validUserType = isAValidUserType(userType);

            if (validPhoneNumber && validUserType) {
                // code to send otp and verify
                const user = await getUsersByPhoneNumberAndUserType(phoneNumber, userType);
                if (user) {
                    return user;
                } else {
                    const isUserRegistered = await registerNewUser(phoneNumber, userType);
                    if (isUserRegistered) {
                        return await getUsersByPhoneNumberAndUserType(phoneNumber, userType);
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
