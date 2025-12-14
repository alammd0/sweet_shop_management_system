import Button from "@mui/material/Button";
import { Plus, Search } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import type { Sweet } from "../utils/types";
import { mockSweets } from "../utils/mockSweets";
import { useEffect, useEffectEvent, useMemo, useState } from "react";
import { SweetCard } from "../components/SweetCard";
import { SweetFormDialog } from "../components/SweetFormDialog";
import apiClient from "../service/apiconnector";
import { BACKEND_URL } from "../service/backendURL";
import { toast } from "react-toastify";


export default function Home() {

    const user = useSelector((state : RootState) => state.user.user);
    const token = useSelector( (state : RootState) => state.user.token);
    console.log(token);

    const [sweets, setSweets] = useState<Sweet[]>(mockSweets)

    const [searchQuery, setSearchQuery] = useState("")
    const [categoryFilter, setCategoryFilter] = useState<string>("all")
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingSweet, setEditingSweet] = useState<Sweet | null>(null)


    useEffect(() => {
        const fetchSweets = async () => {
            try {
                const response = await apiClient.get(`${BACKEND_URL}/api/sweets`);
                if (response.status === 200) {
                    setSweets(response.data.data);
                }
            }
            catch (error) {
                console.log(error);
            }
        }

        fetchSweets();
    }, [])

    const categories = useMemo(() => {
        const cats = Array.from(new Set(sweets.map((sweet) => sweet.category)))
        return ["all", ...cats]
    }, [sweets])

    // Filter sweets based on search and category
    const filteredSweets = useMemo(() => {
        return sweets.filter((sweet) => {
            const matchesSearch =
                sweet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                sweet.description.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesCategory = categoryFilter === "all" || sweet.category === categoryFilter
        return matchesSearch && matchesCategory
        })
    }, [sweets, searchQuery, categoryFilter])

    const handlePurchase = (id: string) => {
        const sweet = sweets.find((s) => s.id === id)
        if (sweet) {
            console.log(sweet)
        }
    }

    const handleSaveSweet = async (sweetData: Omit<Sweet, "id"> & { id?: string }) => {
        if (sweetData.id) {
            // Update existing sweet
            setSweets(sweets.map((s) => (s.id === sweetData.id ? (sweetData as Sweet) : s)))
        } else {

            const response = await apiClient.post(`${BACKEND_URL}/api/sweets`,  {
                name : sweetData.name,
                description : sweetData.description,
                category : sweetData.category,
                price : sweetData.price,
                quantity : sweetData.quantity,
                image : sweetData.image
            }, {
                headers : {
                    Authorization : `${token}`
                }
            })

            console.log(response);

            if(response.status === 201){
                // Add new sweet
                const newSweet: Sweet = {
                    ...sweetData,
                    id: response.data.data.id,
                } as Sweet    
                setSweets([...sweets, newSweet])
                toast.success(response.data.message)
            }
            else{
                toast.error(response.data.message)
            }
        }
        setEditingSweet(null)
    }

    const handleDeleteSweet = (id: string) => {
        setSweets(sweets.filter((s) => s.id !== id))
    }

    const handleEditSweet = (sweet: Sweet) => {
        setEditingSweet(sweet)
        setIsFormOpen(true)
    }

    const handleAddNew = () => {
        setEditingSweet(null)
        setIsFormOpen(true)
    }

    return (
        <div>
            
            {/* hero Section */}
            <section className="border-b from-background to-muted/20 py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl text-center">
                    <h1 className="mb-4 text-4xl font-bold tracking-tight text-balance md:text-6xl">
                        Discover Premium Sweets
                    </h1>
                    <p className="mb-8 text-lg text-muted-foreground text-pretty md:text-xl">
                        Indulge in our handcrafted collection of delicious treats, made with the finest ingredients
                    </p>
                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <Button variant="contained" >
                                    Admin Login
                                </Button>
                                <Button  variant="outlined">
                                    User Login
                                </Button>
                            </div>
               
                    </div>
                </div>
            </section>

            {/* Filters Section */}
            <section className="sticky top-16 z-40 border-b bg-background/95 py-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-1 gap-4">
                            <div className="relative flex-1 max-w-md items-center justify-center">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    placeholder="Search sweets..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                />
                            </div>

                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="w-[220px] bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            >
                                <option value="" disabled>
                                    Category
                                </option>

                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat === "all" ? "All Categories" : cat}
                                    </option>
                                ))}
                            </select>

                        </div>
                        {user?.role === "admin" && (
                            <Button onClick={handleAddNew}>
                            <Plus className="mr-2 h-4 w-4" />
                                Add Sweet
                            </Button>
                        )}
                    </div>
                </div>
            </section>


            {/* Products Grid */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    {filteredSweets.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredSweets.map((sweet) => (
                                <SweetCard
                                    key={sweet.id}
                                    sweet={sweet}
                                    isAdmin={user?.role === "admin"}
                                    onPurchase={handlePurchase}
                                    onEdit={handleEditSweet}
                                    onDelete={handleDeleteSweet}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <p className="text-lg text-muted-foreground">No sweets found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </section>

             <SweetFormDialog open={isFormOpen} onOpenChange={setIsFormOpen} sweet={editingSweet} onSave={handleSaveSweet} />
        </div>
    )
}