import { ulid } from "ulid";
import { db } from "../database/db"
import jwt from 'jsonwebtoken'
import { UserInsert } from "../database/types";
import { TokenPayload } from "../middleware/jwt.middleware";

export const createGoogleUserAndGetToken = async (name: string, id: string) => {
    let user = await db.selectFrom('user').select(['id', 'isAdmin']).where('id', "=", id).executeTakeFirst();
    if (!user) {
        await db.insertInto('user').values({ id, username: name, passwordHash: null, salt: null, isAdmin: 0 }).execute();
        user = await db.selectFrom('user').select(['id', 'isAdmin']).where('id', "=", id).executeTakeFirst();
    }
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not set')
    return createToken(name, user!.id, user!.isAdmin == 1);

}


export const createUser = async (username: string, password: string) => {
    const user = await db.selectFrom('user').select('username').where('username', "=", username).executeTakeFirst();
    if (user) {
        throw {
            status: 400,
            message: 'Username already exists'
        }
    }
    const salt = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const passwordHash = await hashPassword(password, salt);
    let insert: UserInsert = {
        id: ulid(),
        username,
        passwordHash: passwordHash.passwordHash,
        salt,
        isAdmin: 0
    }
    await db.insertInto('user').values(insert).execute();
    return;
}

export const login = async (username: string, password: string) => {
    const user = await db.selectFrom('user').select(["id", "passwordHash", "salt", "isAdmin"]).where('username', "=", username).executeTakeFirst();
    if (!user) {
        throw {
            status: 401,
            message: 'Invalid username or password'
        }
    }

    const { passwordHash, salt } = user;
    if (!salt || !passwordHash) throw new Error('Salt or passwordHash not set')
    const hashedPassword = await hashPassword(password, salt);
    if (hashedPassword.passwordHash !== passwordHash) {
        throw {
            status: 401,
            message: 'Invalid username or password'
        }
    }
    return createToken(username, user.id, user.isAdmin == 1);
}

const createToken = async (username: string, id: string, isAdmin?: boolean) => {
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not set')
    let payload: TokenPayload = {
        username,
        sub: id,
        iat: Math.floor(Date.now() / 1000) - 30,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7 * 365)
    }
    if (isAdmin) {
        payload.isAdmin = true;
    }
    return jwt.sign(payload, process.env.JWT_SECRET);
}

const hashPassword = async (password: string, salt: string) => {
    const crypto = await import('crypto');
    const passwordHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return { passwordHash, salt };
}