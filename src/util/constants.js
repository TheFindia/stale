export const phoneRegex = /^[7-9]\d{9}$/;
export const userTypes = ['admin', 'superAdmin', 'user', 'client'];
export const errorMessages = {
    LoginFailed: 'LOGIN_FAILED',
    RegisterFailed: 'REGISTER_FAILED',
    InvalidPhoneNumber: 'INVALID_PHONE_NUMBER',
    InvalidUserType: 'INVALID_USER_TYPE',
    ExistsAlready: 'EXISTS_ALREADY'
};

export const ERROR_MAPPINGS = {
    ER_DUP_ENTRY: 'DUPLICATE_ENTRY',
    ER_ROW_IS_REFERENCED_2: 'ROW_REFERENCED_CANNOT_BE_DELETED',
    ENTITY_DOESNT_EXIST: 'ENTITY_DOESNT_EXIST',
    DEFAULT: 'ERROR_OCCURRED',
    INVALID_PAYLOAD: 'INVALID_PAYLOAD',
    ER_BAD_NULL_ERROR: 'CANNOT_NULL'
};
