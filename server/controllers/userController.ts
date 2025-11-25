import crypto, { randomUUID } from "crypto";
import { loginRequest, loginResponse, signUpRequest, signUpResponse } from "../ApiTypes";
import { signJWT } from "../auth";
import { db } from "../DataStore";
import { ExpressHandler, User } from "../types";

export const signUpController: ExpressHandler<signUpRequest, signUpResponse> = async (req, res) => {
    const { firstName, lastName, userName, email, password } = req.body;
    if (!firstName || !lastName || !userName || !email || !password) {
        return res.status(400).send({ message: "all fields are required" });
    }
    
    // Check if user with the same username or email already exists
    const existingUser = await db.getUserByEmail(email) || await db.getUserByUserName(userName);
    if (existingUser) {
        return res.status(400).send({ message: "User with the same username or email already exists" });
    }
    
    // Hash the password
    const hashedPassword = hashPassword(password);
    
    const user: User = {
        id: randomUUID(),
        firstName,
        lastName,
        userName,
        email,
        password: hashedPassword,
    }

    await db.createUser(user);
    // Generate JWT
    const jwt = signJWT({ userId: user.id });
    
    res.status(201).send({ jwt }); 
}

export const loginController: ExpressHandler<loginRequest, loginResponse> = async (req, res) => {
    const { login, password } = req.body;

    if(!login || !password) {
        return res.status(400).send({ message: "Login and password are required" } as any);
    }
    
    // Hash the provided password
    const hashedPassword = hashPassword(password);
    
    // Find the user by username or email
    const user = await db.getUserByEmail(login) || await db.getUserByUserName(login);
    if(!user || user.password !== hashedPassword) {
        return res.status(401).send({ message: "Invalid login credentials" } as any);
    }

    const jwt = signJWT({ userId: user.id.toString() });
    
    const response: loginResponse = {
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email,
        },
        jwt
    };
    
    res.status(200).send(response);
}


function hashPassword(password: string): string {
    return crypto.pbkdf2Sync(password, process.env.PASSWORD_SALT!, 1000, 64, `sha512`).toString(`hex`);
}