import type{ Request, Response } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res : Response) => {
    try {
        const { name, email, password, role } = req.body; 

        // console.log(req.body);

        if(!name || !email || !password || !role){
            return res.status(400).json({
                message : "Please provide all the required fields"
            })
        }

        const existingUser = await prisma.user.findUnique({
            where :{
                email
            }
        });

        if(existingUser){
            return res.status(400).json({
                message : "Email is already in use"
            })
        }

        const hasedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data : {
                name,
                email,
                password : hasedPassword,
                role
            }
        })

        return res.status(201).json({
            message : "User created successfully",
            data : { 
                name : user.name,
                email : user.email,
                role : user.role
            }
        })
    }
    catch(error){
        return res.status(500).json({
            message : "Something is wrong"
        })
    }
}

export const login = async (req: Request, res : Response) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                message : "Please provide all the required fields"
            })
        }

        const user = await prisma.user.findUnique({
            where : {
                email
            }
        })

        if(!user){
            return res.status(400).json({
                message : "Email is not in use"
            })
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({
                message : "Password is incorrect"
            })
        }

        const payload = {
            userId : user.id,
            role : user.role
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
            expiresIn : "1h"
        });

        return res.status(200).json({
            message : "User logged in successfully",
            token
        })
    }
    catch(error){
        return res.status(500).json({
            message : "Something is wrong"
        })
    }
}