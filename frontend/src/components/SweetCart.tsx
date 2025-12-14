import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../service/apiconnector";
import { BACKEND_URL } from "../service/backendURL";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import type { Sweet } from "../utils/types";

export default function SweetCart() {

    const { id } = useParams<{ id: string }>();
    const token = useSelector((state: RootState) => state.user.token);

    const [sweet, setSweet] = useState<Sweet | null>(null);
    const [loading, setLoading] = useState(true);
    const [orderQuantity, setOrderQuantity] = useState(1);

    useEffect(() => {

        if (!id) return;

        const fetchSweet = async () => {
            try {
                const response = await apiClient.get(
                    `${BACKEND_URL}/api/sweets/${id}`,
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                );

                if (response.status === 200) {
                    setSweet(response.data.data);
                    setLoading(false);
                }
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchSweet();
    }, [id, token]);

    const handleIncrement = () => {
        if (sweet && orderQuantity < sweet.quantity) {
            setOrderQuantity(orderQuantity + 1);
        }
    };

    const handleDecrement = () => {
        if (orderQuantity > 1) {
            setOrderQuantity(orderQuantity - 1);
        }
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-500">Loading sweet details...</p>
            </div>
        );
    }

    if (!sweet) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-red-500">Sweet not found</p>
            </div>
        );
    }

    const totalPrice = sweet ? sweet.price * orderQuantity : 0;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Image */}
                {sweet.image && (
                    <img
                        src={sweet.image}
                        alt={sweet.name}
                        className="w-full h-64 object-cover"
                    />
                )}

                {/* Content */}
                <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">{sweet.name}</h1>
                        <span className="text-sm bg-gray-100 px-3 py-1 rounded-full capitalize">
                        {sweet.category}
                        </span>
                    </div>

                <p className="text-gray-600">{sweet.description}</p>

                <div className="flex justify-between items-center pt-4">
                    <p className="text-2xl font-semibold text-red-500">
                        ₹ {sweet.price}
                    </p>
                    <p
                        className={`text-sm font-medium ${
                            sweet.quantity > 0 ? "text-green-600" : "text-red-600"
                        }`}
                        >
                        {sweet.quantity > 0
                            ? `In Stock: ${sweet.quantity}`
                            : "Out of Stock"}
                    </p>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 pt-4">
                    <p className="text-lg font-medium">Quantity:</p>
                    <div className="flex items-center border rounded-md">
                        <button 
                            onClick={handleDecrement}
                            disabled={orderQuantity <= 1}
                            className="px-3 py-1 border-r disabled:opacity-50"
                        >
                            -
                        </button>
                        <span className="px-4 py-1">{orderQuantity}</span>
                        <button 
                            onClick={handleIncrement}
                            disabled={sweet.quantity <= orderQuantity}
                            className="px-3 py-1 border-l disabled:opacity-50"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Total Price */}
                <div className="flex justify-between items-center pt-4">
                    <p className="text-xl font-semibold">Total Price:</p>
                    <p className="text-2xl font-bold text-red-500">
                        ₹ {totalPrice.toFixed(2)}
                    </p>
                </div>


                {/* Actions */}
                <div className="flex gap-3 pt-4">
                    <button 
                        className="flex-1 py-2 rounded-md border hover:bg-gray-100 disabled:bg-gray-200 disabled:cursor-not-allowed"
                        disabled={sweet.quantity === 0}
                    >
                        Buy Now
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
}
