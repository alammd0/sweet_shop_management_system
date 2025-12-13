
import { Router } from "express";
import {
    createSweet, 
    updateSweet, 
    viewAllAvailableSweets,
    filterSweets,
    deleteSweet,
    getSweetById
} from "../controller/sweet.controller";
import { authMiddleware, isAdmin } from "../middleware/auth.middleware";
import { purchaseSweet, restockSweet } from "../controller/inventory.controller";

const router = Router();

router.post("/", authMiddleware, isAdmin, createSweet);
router.put("/:id", authMiddleware, isAdmin, updateSweet);
router.get("/:sweetId", authMiddleware, getSweetById);
router.get("/", authMiddleware, viewAllAvailableSweets);
router.get("/:search", authMiddleware, filterSweets);
router.delete("/:id", authMiddleware, isAdmin, deleteSweet);

router.post("/:id/purchase", authMiddleware, purchaseSweet);
router.put("/:id/restock", authMiddleware, isAdmin, restockSweet);

export default router;