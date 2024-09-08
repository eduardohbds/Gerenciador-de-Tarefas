import { Request, Response } from "express";
import { pool } from "../config/connectDB";
import bcrypt from "bcryptjs";

export const register = async (req: Request, res: Response) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({
                message: "Please provide all user details",
            });
        }

        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (user.rows.length > 0) {
            return res.status(400).json({
                message: "User with this email already exists",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const query = `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            `;
        await pool.query(query, [username, email, hashedPassword]);

        return res.status(200).json({
            message: "User registered successfully",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide all user details",
            });
        }

        const user = await pool.query("SELECT * FROM users WHERE email = $1", [
            email,
        ]);

        if (user.rows.length === 0) {
            return res.status(400).json({
                message: "User does not exist",
            });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            return res.status(400).json({
                message: "Invalid password",
            });
        }

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user.rows[0].id,
                username: user.rows[0].username,
                email: user.rows[0].email,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}


