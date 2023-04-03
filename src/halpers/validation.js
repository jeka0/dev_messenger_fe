import validator from 'validator';

function validateEmail(email){
    if(!email){
        return {
            isValid: false,
            message: "Email is required"
        };
    }
    if(!validator.isEmail(email)){
        return{
            isValid: false,
            message: "Email is not valid"
        };
    }
    return{
        isValid: true,
        message: ""
    };
}

function validatePassword(password){
    if(password === ""){
        return {
            isValid: false,
            message: "Password is required"
        };
    }
    return{
        isValid: true,
        message: ""
    };
}

export {validateEmail, validatePassword}