import jwt from 'jsonwebtoken';

export class JwtHelper {
    private static readonly secretKey: string = process.env.JWT_SECRET_KEY || 'DEFAULT_SECRET_KEY';

    static generateAccessToken(payload: any): string {
        const expiresIn = "1h";
        return jwt.sign(payload, JwtHelper.secretKey, { expiresIn });
    }

    static generateRefreshToken(payload: any): string {
        const expiresIn = "7d";
        return jwt.sign(payload, JwtHelper.secretKey, { expiresIn });
    }

    static verifyToken(token: string): any {
        try {
            return jwt.verify(token, JwtHelper.secretKey);
        } catch (err) {
            throw new Error("Error in verifyToken");
        }             
    }

    static decodeToken(token: string): any {
        try {
            return jwt.decode(token, { complete: true });
        } catch (err) {
            throw new Error("Error in decodeToken")
        }
    }
}