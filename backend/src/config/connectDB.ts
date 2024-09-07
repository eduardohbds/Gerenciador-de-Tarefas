import { Pool } from "pg";

const connectDB = async () => {
    const pool = new Pool({
        user: "users",
        host: "localhost",
        database: "users_auth",
        password: "hardpassalwaysok",
    });

    pool.query("SELECT NOW()",(err,res) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Database connected successfully");
        }
    });
}
