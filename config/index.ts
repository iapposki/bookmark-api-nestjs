import * as dotenv from 'dotenv'
dotenv.config()

export const config = {
    postgresURL : process.env['DATABASE_URL'] || ""
}