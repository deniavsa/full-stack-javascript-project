import jwt, { SignOptions } from 'jsonwebtoken';
import config from 'config';

export const signJwt = (
    payload: Object,
    key: 'accessTokenPrivateKey',
    options: SignOptions = {}
) => {
    const privateKey = config.get<string>(key)
    console.log("privateKey:::", privateKey)
    return jwt.sign(payload, privateKey);
};

export const verifyJwt = <T>(
    token: string,
    key: 'accessTokenPrivateKey', 
): T | null => {
    try {
        const privateKey = config.get<string>(key)

        console.log("privateKey:::", privateKey)

        return jwt.verify(token, privateKey) as T;
    } catch (error) {
        return null;
    }
};
