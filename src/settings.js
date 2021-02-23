import dotenv from 'dotenv';

dotenv.config();

export const dbHost = process.env.DB_HOST;
export const dbUsername = process.env.DB_USERNAME;
export const dbPwd = process.env.DB_PWD;
export const dbName = process.env.DB_NAME;

export const jwtSecret = process.env.JWT_SECRET;
