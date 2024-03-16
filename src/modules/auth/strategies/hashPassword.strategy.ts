import * as bcrypt from 'bcrypt';
import { _passwordHashingRounds } from '../config/auth.config';

export const passwordHashing = async (password: string): Promise<string> => {
    const saltRounds = _passwordHashingRounds;
    return bcrypt.hashSync(password, saltRounds);
}

export const comparePassword = async (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
}