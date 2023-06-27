export const validateUsername = (username) => {
    if (!username)
        return false;

    if (username.length <= 0 || username.length > 30)
        return false;

    return true;
}

export const validatePassword = (password1, password2) => {
    if (!password1 || !password2)
        return false;
    
    if (password1 != password2)
        return false;

    if (password1.length < 10)
        return false;
    
    return true;
}