export type GoogleUserModel = {
    name: string;
    id: string;
}

export type UserModel = {
    username: string;
    password: string;
}

export const isGoogleUserModel = (user: any): user is GoogleUserModel => {
    return user.name && user.id;
}

export const isUserModel = (user: any): user is UserModel => {
    return user.username && user.password;
}
