import jwt from "jsonwebtoken"
import { JWTObject } from "./ApiTypes"

export function signJWT(obj: JWTObject): string {
    return jwt.sign(obj, getJWTSecret(), {
        expiresIn: "7d"
    })
}

export function verifyJWT(token: string): JWTObject {
    return jwt.verify(token, getJWTSecret()) as JWTObject
}

function getJWTSecret(): string {
    const secret = process.env.JWT_SECRET
    if (!secret) {
        // throw new Error("JWT Secret is not defined in environment variables")
        console.error("JWT Secret is not defined in environment variables")
        process.exit(1)
    }
    return secret
}