import { compare, hash, genSalt } from 'bcrypt';

export class Password {
    static async hash(password: string): Promise<string> {
        const salt = await genSalt(10);
        const hashed = await hash(password, salt);
        return `${salt}.${hashed}`;
    }

    static async compare(storedPassword: string, suppliedPassword: string): Promise<boolean> {
        const [salt, hashed] = Password.splitStringAtFirstDot(storedPassword);
        return await compare(suppliedPassword, hashed);
    }

    private static splitStringAtFirstDot(inputString: string) {
        const dotIndex = inputString.indexOf('.');

        if (dotIndex === -1) {
          return [inputString];
        } else {
          const firstPart = inputString.substring(0, dotIndex);
          const secondPart = inputString.substring(dotIndex + 1);

          return [firstPart, secondPart];
        }
    }
}