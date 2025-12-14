import { Link } from "react-router-dom";
import { Candy, UserCircle, LogOut } from "lucide-react";
import  type{ NavBarProps } from "../utils/types";
import Button from '@mui/material/Button';
import { useState } from "react";


export default function Navbar({user, onLogout} : NavBarProps){

    const [open, setOpen] = useState(false);


    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link to="/" className="flex items-center gap-2 text-xl font-semibold">
                <Candy className="h-6 w-6 text-primary" />
                    <span className="text-balance">Sweet Delights</span>
                </Link>

                <div className="flex items-center gap-4">
                {user ? (
                     <div className="relative inline-block">
                        <button
                            onClick={() => setOpen(!open)}
                            className="bg-secondary p-2 rounded-md"
                        >
                            <UserCircle className="h-5 w-5" />
                            <span className="sr-only">User menu</span>
                        </button>

                        {open && (
                            <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-50">
                            <div className="px-4 py-3 flex flex-col gap-1">
                                <p className="text-sm font-medium">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.email}</p>
                                <p className="text-xs text-accent font-medium capitalize">
                                    {user.role}
                                </p>
                            </div>

                            <div className="border-t" />
                                <button
                                    onClick={onLogout}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Button variant="outlined">
                            <Link to="/login">Login</Link>
                        </Button>
                        <Button variant="contained">
                            <Link to="/register">Register</Link>
                        </Button>
                    </div>
                )}
                </div>
            </div>
        </nav>
    )
}