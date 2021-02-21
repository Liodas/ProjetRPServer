import dotenv from 'dotenv';

dotenv.config();

export const testEnvironmentVariable = process.env.TEST_ENV_VARIABLE;

export const dbUsername = process.env.DB_USERNAME;
export const dbPwd = process.env.DB_PWD;

export const jwtSecret = process.env.JWT_SECRET;
