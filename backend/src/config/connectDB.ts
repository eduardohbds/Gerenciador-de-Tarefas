import { Pool } from "pg";
import chalk from "chalk";
import fs from "fs";
import path from "path";

const pool = new Pool({
    user: "users",
    host: "localhost",
    database: "users_auth",
    password: "hardpassalwaysok",
});

// const schemaFilePath = path.resolve(__dirname, "../schema/user.schema.sql");
// const schemaSQL = fs.readFileSync(schemaFilePath, "utf-8");

const schemaFilePath = path.resolve(__dirname,"../user.schema.sql");
const schemaSQL = fs.readFileSync(schemaFilePath,"utf-8");

const createTables = async () => {
    try {
        const result = await pool.query(
            `SELECT EXIST (
            SELECT 1
            FROM information_schema.tables
            WHERE table_schema = 'users' AND table_name = 'users')`
        );

        const tableExists = result.rows[0].exists;

        if (!tableExists) {
            await pool.query(schemaSQL);
            console.log(chalk.greenBright("Tables created successfully"));
        } else {
            console.log(chalk.yellow("Users table already exists"));
        }
    } catch (error) {
        console.error(chalk.red("Error creating tables:"), error);
    }
}

const connectDB = async () => {
    try {
        await pool.connect();
        console.log(chalk.greenBright("Database connected successfully"));

        await createTables();
    } catch (error) {
        console.error(chalk.red("Error connecting to database:"), error);
    }
}

export default connectDB;