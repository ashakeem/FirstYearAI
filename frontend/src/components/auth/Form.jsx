import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api'// <-- your API helper
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants' // <-- your token constants
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Label } from "../ui/Label";

const Form = ({ route, method }) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const payload = method === "login" 
                ? { username, password }
                : { username, password, ...(email && { email }) }

            const res = await api.post(route, payload)
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate('/dashboard')
            } else {
                navigate('/login')
            }
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="grid h-screen place-content-center bg-white px-4">
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg">

                    {/* Dynamic heading based on mode */}
                    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                        {method === 'login' ? 'Welcome Back!' : 'Create an Account'}
                    </h1>

                    {/* Dynamic subtext based on mode */}
                    <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                        {method === 'login'
                            ? 'Log in to access personalized tech career advice, post and view community questions, and more!'
                            : 'Sign up to get started with personalized tech career advice, post and view community questions, and more!'}
                    </p>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        {error && (
                            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
                                {error}
                            </div>
                        )}

                        <div>
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1"
                                placeholder="johndoe"
                            />
                        </div>

                        {method === "signup" && (
                            <div>
                                <Label htmlFor="email">Email address (optional)</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1"
                                    placeholder="john@example.com"
                                />
                            </div>
                        )}

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1"
                            />
                        </div>

                        {method === "login" && (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-indigo-600 text-white hover:bg-indigo-500"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                method === "login" ? "Sign in" : "Create account"
                            )}
                        </Button>

                        <div className="text-center text-sm">
                            <span className="text-gray-500">
                                {method === "login" ? "Don't have an account?" : "Already have an account?"}
                            </span>
                            <a
                                href={method === "login" ? "/signup" : "/login"}
                                className="ml-1 font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                {method === "login" ? "Sign up" : "Sign in"}
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form
