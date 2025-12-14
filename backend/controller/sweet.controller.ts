import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import fs from "fs";
import { uploadImage } from "../utils/fileUpload";

export const createSweet = async (req : Request, res : Response) => { 
    try {
        const { name, description, category, price, quantity, image} = req.body;


        if(!name || !description || !category || !price || !quantity){
            return res.status(400).json({
                message : "Please provide all the required fields"
            })
        }

        const sweet = await prisma.sweet.create({
            data : {
                name : name,
                description : description,
                category : category,
                price : price,
                quantity : quantity,
                image : image,
                userId : req.userId as string
            }
        })

        if(!sweet){
            return res.status(400).json({
                message : "Something went wrong here"
            })
        }

        return res.status(201).json({
            message : "Sweet created successfully",
            data : sweet
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message : "Something is wrong"
        })
    }
}

export const updateSweet = async (req : Request, res : Response) => {
    try{
        const { name, description, category, price, quantity, image} = req.body;
        const { id } = req.params;

        const findSweet = await prisma.sweet.findUnique({
            where : {
                id : id as string
            }
        })

        if(!findSweet){
            return res.status(400).json({
                message : "Sweet not found"
            })
        }

        const updateTitle  = {
            name : findSweet.name,
            description : findSweet.description,
            category : findSweet.category,
            image : findSweet.image,
            price : findSweet.price,
            quantity : findSweet.quantity
        }

        if(name){
            updateTitle.name = name ;
        }

        if(description){
            updateTitle.description = description;
        }

        if(category){
            updateTitle.category = category;
        }

        if(price){
            updateTitle.price = price;
        }

        if(quantity){
            updateTitle.quantity = quantity;
        }

        if(image){
            updateTitle.image = image;
        }


        const sweet = await prisma.sweet.update({
            where : {
                id : id as string
            },
            data : {
                ...updateTitle,
            }
        })

        return res.status(200).json({
            message : "Sweet updated successfully",
            data : sweet
        })
    }
    catch(error){
        return res.status(500).json({
            message : "Something is wrong"
        })
    }
}

export const viewAllAvailableSweets = async (req : Request, res : Response) => {
    try{
        const sweets = await prisma.sweet.findMany();

        // console.log(sweets);

        return res.status(200).json({
            message : "Sweets retrieved successfully",
            data : sweets
        })
    }
    catch(error){
        return res.status(500).json({
            message : "Something is wrong"
        })
    }
}

export const getSweetById = async (req : Request, res : Response) => {
    try{
        const { sweetId } = req.params;

        const findSweet = await prisma.sweet.findUnique({
            where : {
                id : sweetId as string
            }
        })

        if(!findSweet){
            return res.status(400).json({
                message : "Sweet not found"
            })
        }

        return res.status(200).json({
            message : "Sweet retrieved successfully",
            data : findSweet
        })
    }
    catch(error){
        return res.status(500).json({
            message : "Something is wrong"
        })
    }
}

// search for sweet ny name, category, and price range 
export const filterSweets = async (req: Request, res: Response) => {
    try {
        const { name, category, price } = req.body;

        const where: any = {
            quantity: { gt: 0 } // filter out sweets with 0 quantity
        };

        if (name) {
            where.name = {
                contains: name,
                mode: "insensitive"
            };
        }


        if (category) {
            where.category = category;
        }

        if (price) {
            where.price = {};
            if (price.min !== undefined) {
                where.price.gte = Number(price.min);
            }
            if (price.max !== undefined) {
                where.price.lte = Number(price.max);
            }
        }

        const sweets = await prisma.sweet.findMany({ where });

        return res.status(200).json({
            count: sweets.length,
            data: sweets
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Something is wrong"
        });
    }
};

export const deleteSweet = async (req : Request, res : Response) => {
    try{
        const { id } = req.params;

        const findSweet = await prisma.sweet.findUnique({
            where : {
                id : id as string
            }
        })

        if(!findSweet){
            return res.status(400).json({
                message : "Sweet not found"
            })
        }

        const sweet = await prisma.sweet.delete({
            where : {
                id : id as string
            }
        })

        return res.status(200).json({
            message : "Sweet deleted successfully",
            data : sweet
        })
    }
    catch(error){
        return res.status(500).json({
            message : "Something is wrong"
        })
    }
}