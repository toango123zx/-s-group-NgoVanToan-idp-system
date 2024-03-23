import * as dotenv from "dotenv"
dotenv.config()

export const _passwordHashingRounds = Number.parseInt(process.env.PASSWORD_HASHING_ROUNDS) || 10;