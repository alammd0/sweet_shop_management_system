import type React from "react"
import { useState, useEffect } from "react"
import type { Sweet } from "../utils/types"

interface SweetFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sweet?: Sweet | null
  onSave: (sweet: Omit<Sweet, "id"> & { id?: string }) => void
}

export function SweetFormDialog({ open, onOpenChange, sweet, onSave }: SweetFormDialogProps) {

    console.log(sweet);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
        image: "",
    })

    useEffect(() => {
        if (sweet) {
            setFormData({
                name: sweet.name,
                description: sweet.description,
                price: sweet.price.toString(),
                quantity: sweet.quantity.toString(),
                category: sweet.category,
                image: sweet.image,
            })
        } else {
            setFormData({
                name: "",
                description: "",
                price: "",
                quantity: "",
                category: "",
                image: "",
            })
        }
    }, [sweet, open])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave({
            id: sweet?.id,
            name: formData.name,
            description: formData.description,
            price: Number.parseFloat(formData.price),
            quantity: Number.parseInt(formData.quantity),
            category: formData.category,
            image: formData.image || "/colorful-candy-display.png",
        })
        onOpenChange(false)
    }

    return (
        open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-white rounded-lg w-full max-w-[525px] p-6">
                    {/* Header */}
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold">
                            {sweet ? "Edit Sweet" : "Add New Sweet"}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            {sweet
                            ? "Update the details of this sweet."
                            : "Add a new sweet to your inventory."}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    className="border rounded-md px-3 py-2"
                                    value={formData.name}
                                    onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    className="border rounded-md px-3 py-2"
                                    value={formData.description}
                                    onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <label htmlFor="price">Price (₹)</label>
                                    <input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        className="border rounded-md px-3 py-2"
                                        value={formData.price}
                                        onChange={(e) =>
                                            setFormData({ ...formData, price: e.target.value })
                                        }
                                        required    
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <label htmlFor="quantity">Quantity</label>
                                    <input
                                        id="quantity"
                                        type="number"
                                        className="border rounded-md px-3 py-2"
                                        value={formData.quantity}
                                        onChange={(e) =>
                                            setFormData({ ...formData, quantity: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <label htmlFor="category">Category</label>
                                <input
                                    id="category"
                                    className="border rounded-md px-3 py-2"
                                    value={formData.category}
                                    onChange={(e) =>
                                    setFormData({ ...formData, category: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <label htmlFor="image">Image URL (optional)</label>
                                <input
                                    id="image"
                                    type="url"
                                    className="border rounded-md px-3 py-2"
                                    value={formData.image}
                                    onChange={(e) =>
                                    setFormData({ ...formData, image: e.target.value })
                                    }
                                    placeholder="/colorful-candy-display.png"
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => onOpenChange(false)}
                                className="border px-4 py-2 rounded-md"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="bg-black text-white px-4 py-2 rounded-md"
                            >
                                {sweet ? "Update" : "Add"} Sweet
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
}