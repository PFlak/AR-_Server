import admin from '../firebase/index';
import { Request, Response, NextFunction } from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}

class AuthMiddleware {
    async decodeToken(req: Request, res: Response, next: NextFunction) {
        const token: string | undefined = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
			const decodedValue = await admin.auth().verifyIdToken(token);
			if (decodedValue) {
				req.user = decodedValue;
				return next();
			}
			return res.status(401).json({ message: 'Unauthorized' });
		} catch (error) {
			return res.status(500).json({ message: 'Internal Server Error' });
		}
    }
}

export default new AuthMiddleware();
