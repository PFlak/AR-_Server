import verifyToken from "../utils/helpers/firebaseAuthHelper";
import type { Request, Response, NextFunction } from "express";

type CustomRequest = Request & { user: string };

class AuthMiddleware {
  async decodeToken(req: CustomRequest, res: Response, next: NextFunction) {
    let token: string;
    try {
      token = req.headers.authorization!.split(" ")[1];
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decodedValue = await verifyToken(token);
      if (decodedValue) {
        req.user = decodedValue;
        return next();
      }
      return res.status(401).json({ message: "Unauthorized" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default new AuthMiddleware();
