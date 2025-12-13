
import { prisma } from "../lib/prisma";
import type{ Request, Response } from "express";

export const purchaseSweet = async (req: Request, res: Response) => {
    try{
        const sweetId = req.params.id;

        if(!sweetId){
            return res.status(400).json({
                message : "Sweet not found"
            })
        }

        const updateSweet = await prisma.$transaction(async (tx) => {
            const sweet = await tx.sweet.findUnique({
                where : {
                    id : sweetId as string
                }
            })

            if(!sweet){
                return res.status(400).json({
                    message : "Sweet not found"
                })
            }

            if(sweet.quantity <= 0){
                return res.status(400).json({
                    message : "Sweet is out of stock"
                })
            }

            const updateSweet = await tx.sweet.update({
                where : {
                    id : sweetId as string
                },
                data : {
                    quantity : sweet.quantity - 1
                }
            })

            return updateSweet;
        })

        return res.status(200).json({
            message : "Sweet purchased successfully",
            data : updateSweet
        })

    }
    catch(error){
        return res.status(500).json({
            message : "Something is wrong"
        })
    }
}

export const restockSweet = async (req: Request, res: Response) => {
    try{
        const sweetId = req.params.id;
        const quantity = req.body.quantity;

        if(!sweetId || !quantity || quantity <= 0){
            return res.status(400).json({
                message : "Sweet not found"
            })
        }

        const updateSweet = await prisma.sweet.update({
            where : {
                id : sweetId as string
            },
            data : {
                quantity : {
                    increment : quantity
                }
            }
        })

        return res.status(200).json({
            message : "Sweet restocked successfully",
            data : updateSweet
        })

    }
    catch(error){
        return res.status(500).json({
            message : "Something is wrong"
        })
    }
}