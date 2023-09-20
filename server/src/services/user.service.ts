import { ulid } from "ulid";
import { db } from "../database/db"
import jwt from 'jsonwebtoken'
import { UserInsert } from "../database/types";

export const createGoogleUserAndGetToken = async (name: string, id: string) => {
    const user = await db.selectFrom('user').select('id').where('id', "=", id).executeTakeFirst();
    if (!user) {
        await db.insertInto('user').values({ id, username: name, passwordHash: null, salt: null }).execute();
    }
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not set')
    const token = jwt.sign({ name, id }, process.env.JWT_SECRET);
    return token;
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
        salt
    }
    await db.insertInto('user').values(insert).execute();
    return;
}

export const login = async (username: string, password: string) => {
    const user = await db.selectFrom('user').select(["id", "passwordHash", "salt"]).where('username', "=", username).executeTakeFirst();
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
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not set')
    const token = jwt.sign({ username, id: user.id }, process.env.JWT_SECRET);
    return token;
}


const hashPassword = async (password: string, salt: string) => {
    const crypto = await import('crypto');
    const passwordHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return { passwordHash, salt };
}