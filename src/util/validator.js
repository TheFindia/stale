import {phoneRegex} from '../util/constants';

export const isAValidPhoneNumber = (phoneNumber) => phoneNumber.match(phoneRegex);
