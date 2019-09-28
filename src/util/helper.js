import {ERROR_MAPPINGS} from './constants';

export const handleError = (errorCode, reject) => {
    if (ERROR_MAPPINGS[errorCode])
        reject(ERROR_MAPPINGS[errorCode]);
    else
        reject(ERROR_MAPPINGS['DEFAULT']);
};
