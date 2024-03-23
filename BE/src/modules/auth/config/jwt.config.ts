import { JwtService } from "@nestjs/jwt"
import * as dotenv from "dotenv"
dotenv.config()

export const _jwtSecretAccessKey = process.env.JWT_SECRET_ACCESS_KEY
// export const _jwtSecretRefreshKey = process.env.JWT_SECRET_REFRESH_KEY
export const _expiresInAccessKey = process.env.EXPIRES_IN_ACCESS_KEY
// export const _expiresInRefreshKey = process.env.EXPIRES_IN_RESFRESH_KEY

export const _jwtService = new JwtService({
    secret: _jwtSecretAccessKey,
    signOptions: {
        algorithm: "HS256",
        expiresIn: _expiresInAccessKey,
        encoding: "utf-8",    
    },
    verifyOptions: {
        algorithms: ["HS256"],
    }
})