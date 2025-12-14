import type React from "react"
import { useState } from "react"
import { Candy } from "lucide-react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import apiClient from "../service/apiconnector"
import { BACKEND_URL } from "../service/backendURL"
import { setToken, setUser } from "../app/auth/authSlice"
import { toast } from "react-toastify"

interface AuthFormProps {
  type: "login" | "register"
}

export function AuthForm({ type}: AuthFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch() ;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if( type === "login"){
        const {email, password } = formData;

        const response = await apiClient.post(`${BACKEND_URL}/api/auth/login`, {
            email,
            password
        })

        if(response.status === 200){
            dispatch(setUser(response.data.data));
            dispatch(setToken(response.data.token))
            navigate("/");
            toast.success(response.data.message);
        } else{
            toast.error(response.data.message);
        }
    } else{

        const { name, email, password } = formData;

        const response = await apiClient.post(`${BACKEND_URL}/api/auth/register`, {
            name,
            email,
            password
        })

        if(response.status === 201){
            dispatch(setUser(response.data.data));
            navigate("/login");
            toast.success(response.data.message);
        } else{
            toast.error(response.data.message);
        }
    }
  }

  return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl border-2 border-border/40 rounded-xl p-4">
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Candy className="h-6 w-6 text-primary" />
                    </div>
                    <h1 className="text-2xl text-black">{type === "login" ? "Welcome Back" : "Create Account"}</h1>
                    <p>
                        {type === "login"
                            ? "Enter your credentials to access your account"
                            : "Sign up to start shopping for delicious sweets"}
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <CardContent className="grid gap-4">
                        {type === "register" && (
                            <div className="grid gap-2">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    id="name"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                />
                            </div>
                        )}
                        <div className="grid gap-2">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={formData.password}
                                placeholder="Enter your Password"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                minLength={6}
                            />
                        </div>
                    </CardContent>
                    <div className="flex flex-col gap-4">
                        <Button type="submit" className="w-full">
                            {type === "login" ? "Sign In" : "Create Account"}
                        </Button>
                        <p className="text-center text-sm text-muted-foreground">
                            {type === "login" ? "Don't have an account? " : "Already have an account? "}
                        <Link
                            to={type === "login" ? "/register" : "/login"}
                            className="font-medium text-primary hover:underline"
                        >
                            {type === "login" ? "Sign up" : "Sign in"}
                        </Link>
                        </p>
                    </div>
                </form>
            </Card>
        </div>
  )
}
