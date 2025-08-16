import jwt, { SignOptions } from 'jsonwebtoken';


export const signAccessToken = (userId: string) => {
    try {
        const payload = { _id: userId };
        const secret = process.env.JWT_SECRET as string;
        const options: SignOptions = {
            expiresIn: '1h',
        };

        const token = jwt.sign(payload, secret, options);
        return token;
    } catch (error: any) {
        console.error('Error signing access token:', error);
        throw new Error('Failed to sign access token: ' + error.message);
    }
};
