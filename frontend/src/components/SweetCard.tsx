
import { ShoppingCart, Pencil, Trash2 } from "lucide-react"
import type { Sweet } from "../utils/types"
import Button from "@mui/material/Button"

interface SweetCardProps {
    sweet: Sweet
    isAdmin?: boolean
    onPurchase?: (id: string) => void
    onEdit?: (sweet: Sweet) => void
    onDelete?: (id: string) => void
}

export function SweetCard({ sweet, isAdmin = false, onPurchase, onEdit, onDelete }: SweetCardProps) {
  return (
        <div className="group overflow-hidden transition-all hover:shadow-lg shadow-xl rounded-md w-11/12 mx-auto h-full flex flex-col justify-between">
            <div className="p-0">
                <div className="relative aspect-square overflow-hidden bg-muted">
                    <img
                        src={sweet.image || "/placeholder.svg"}
                        alt={sweet.name}
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {sweet.quantity === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                            <Button variant="outlined" color="error" className="text-sm px-4 py-2">
                                Out of Stock
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-lg text-balance leading-tight">{sweet.name}</h3>
                    <span className="shrink-0">
                        {sweet.category}
                    </span>
                </div>
                <p className="text-sm text-muted-foreground text-pretty mb-3">{sweet.description}</p>
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">₹ {sweet.price.toFixed(2)}</span>
                    <span className="text-sm text-muted-foreground">Stock: {sweet.quantity}</span>
                </div>
            </div>

            <div className="p-4 flex items-center justify-between mt-auto pt-0">
                {isAdmin ? (
                    <>
                        <Pencil className="mr-2 h-4 w-4 text-shadow-black" onClick={() => onEdit?.(sweet)} />
                        <Trash2 onClick={() => onDelete?.(sweet.id)} className="mr-2 h-4 w-4 text-red-700" />
                    </>
                ) : (
                <Button variant="outlined" className="w-full" disabled={sweet.quantity === 0} onClick={() => onPurchase?.(sweet.id)}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {sweet.quantity === 0 ? "Out of Stock" : "Purchase"}
                </Button>
                )}
            </div>

        </div>
  )
}
