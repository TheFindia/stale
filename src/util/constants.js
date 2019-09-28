export const phoneRegex = /^[7-9]\d{9}$/;
export const userTypes = ['ADMIN','SUPER_ADMIN','USER','CLIENT'];
export const errorMessages = {
    LoginFailed: 'LOGIN_FAILED',
    RegisterFailed: 'REGISTER_FAILED',
    InvalidPhoneNumber: 'INVALID_PHONE_NUMBER',
    InvalidUserType: 'INVALID_USER_TYPE'
};

export const DB_ERROR_MAPPINGS = {
    ER_DUP_ENTRY: 'Duplicate Entry',
    ER_ROW_IS_REFERENCED_2: 'An Area is associated with this City, please delete it first',
    CITY_DOESNT_EXIST: 'City you tried to update doesn\'t exist'
};
