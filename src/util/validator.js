import {phoneRegex, userTypes} from '../util/constants';

export const isAValidPhoneNumber = (phoneNumber) => phoneNumber ? phoneNumber.match(phoneRegex): false;
export const isAValidUserType = (userType) => userTypes.includes(userType);

