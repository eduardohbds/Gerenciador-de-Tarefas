import { Request,Response } from "express";

export const register = async (req:Request,res:Response) => {
    try {
        return res.status(200).json({
            message:"User registered",
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error",
        })
    }
}

export const login = async (req:Request,res:Response) => {
    try {
        return res.status(200).json({
            message:"User logged in successfully",
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error",
        })
    }
}