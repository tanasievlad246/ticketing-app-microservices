import { compare, hash, genSalt } from 'bcrypt';

export class Password {
    static async hash(password: string): Promise<string> {
        const salt = await genSalt(10);
        const hashed = await hash(password, salt);
        return `${salt}.${hashed}`;
    }

    static async compare(storedPassword: string, suppliedPassword: string): Promise<boolean> {
        const [salt, hashed] = storedPassword.split('.');
        const hashedSupplied = await hash(suppliedPassword, salt);
        return await compare(hashed, hashedSupplied); 
    }
}