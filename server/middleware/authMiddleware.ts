import { verifyJWT } from "../auth";
import { ExpressHandler } from "../types";
import { db } from "../DataStore";


export const authMiddleware: ExpressHandler<any, any> = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) {
        return res.status(401).send({ message: "Unauthorized" });
    }

    try {
        const payload = await verifyJWT(token);
        const user = await db.getUserById(payload.userId);
        if(!user) {
            return res.status(401).send({ message: "Unauthorized" });
        }
        // attach user to request object
        (req as any).user = user;
        next();
    } catch (error) {
        return res.status(401).send({ message: "Invalid token" });
    }
}