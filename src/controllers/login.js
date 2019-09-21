import {isAValidPhoneNumber} from '../util/validator';
import {errorMessages} from '../util/constants';
import {registerNewUser} from '../services/register-new-user';
import {getUser} from '../services/get-user';

export const loginRoute = {
    path: '/login',
    method: 'POST',
    options: {
        handler: (request, h) => {
            const phoneNumber = request.payload.phoneNumber;
            let errors = [];

            if (isAValidPhoneNumber(phoneNumber)) {
                // code to send otp and verify
                const response = getUser(phoneNumber);
                console.log('response', response);

                if (response.error) {
                    errors.push({
                        errorMessage: errorMessages.LoginFailed
                    });
                }
                if (response === 1) { // this is failing, need to debug
                    // update user to active=0
                } else {
                    return registerNewUser(phoneNumber);
                }
            }
            else {
                errors.push({
                    errorMessage: errorMessages.InvalidPhoneNumber
                });
            }
            return errors;
        }
    }
};

