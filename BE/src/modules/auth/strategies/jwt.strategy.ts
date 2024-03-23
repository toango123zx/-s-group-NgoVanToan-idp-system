import { _jwtService } from "../config/jwt.config";

export const createJwt = async (payload: any): Promise<string> => {
    try {
        const token = _jwtService.signAsync(payload);
        
        return token;
    } catch (error) {
        throw new Error(error);
    }
}

export const verifyJwt = async (token: any) => {
    try {
        const payload = await _jwtService.verify(token);

        delete payload.iat;
        delete payload.exp;
        
        return payload;
    } catch (error) {
        return false;
    }
}