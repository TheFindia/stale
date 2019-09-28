import {ERROR_MAPPINGS, phoneRegex, userTypes} from '../util/constants';

export const isAValidPhoneNumber = (phoneNumber) => phoneNumber ? phoneNumber.match(phoneRegex): false;
export const isAValidUserType = (userType) => userTypes.includes(userType);

export const validateId = (idFromParams, idFromPayload) => {
    if (idFromParams !== idFromPayload) {
        return ERROR_MAPPINGS['INVALID_PAYLOAD'];
    }
};
