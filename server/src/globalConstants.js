import dotenv from "dotenv";

dotenv.config();

export const mongoURI = 
`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
