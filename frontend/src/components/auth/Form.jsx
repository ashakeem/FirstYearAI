import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api'// <-- your API helper
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants' // <-- your token constants

const Form = ({ route, method }) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    // Determine if we're in login or signup mode
    const name = method === "login" ? "Login" : "Signup"

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await api.post(route, { username, email, password }) // Call login API endpoint
            if (method === "login") {
                // handle success, e.g., store tokens
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)

                // navigate to dashboard
                navigate('/dashboard')

            } else {
                // // Call signup API endpoint
                // const response = await api.post('/signup', { email, password })
                // // handle success, e.g., store tokens
                // localStorage.setItem(ACCESS_TOKEN, response.data.accessToken)
                // localStorage.setItem(REFRESH_TOKEN, response.data.refreshToken)
                // // navigate to a protected route or dashboard
                navigate('/login')
            }
        } catch (error) {
            // Handle error (show a toast, error message, etc.)
            console.error(error)
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
                        {name === 'Login' ? 'Welcome Back!' : 'Create an Account'}
                    </h1>

                    {/* Dynamic subtext based on mode */}
                    <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                        {name === 'Login'
                            ? 'Log in to access personalized tech career advice, post and view community questions, and more!'
                            : 'Sign up to get started with personalized tech career advice, post and view community questions, and more!'}
                    </p>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="mt-6 mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                    >
                        <p className="text-center text-lg font-medium">
                            {name === 'Login' ? 'Login to your account' : 'Sign up for an account'}
                        </p>

                        {/* Email Field */}

                        {name === 'Signup' && (
                             <div>
                             <label htmlFor="email" className="sr-only">Email</label>
                             <div className="relative">
                                 <input
                                     id="email"
                                     type="email"
                                     className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs"
                                     placeholder="Enter email (optional)"
                                     value={email}
                                     onChange={(e) => setEmail(e.target.value)}
                              
                                 />
                                 <span className="absolute inset-y-0 end-0 grid place-content-center px-4 text-gray-400">
                                     {/* Icon (optional) */}
                                     <svg
                                         xmlns="http://www.w3.org/2000/svg"
                                         className="size-4"
                                         fill="none"
                                         viewBox="0 0 24 24"
                                         stroke="currentColor"
                                         width="16"
                                         height="16"
                                     >
                                         <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             strokeWidth="2"
                                             d="M16 12a4 4 0 10-8 0 4 4 0 008 0z"
                                         />
                                         <path
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             strokeWidth="2"
                                             d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 
                          0 8.268 2.943 9.542 7-1.274 4.057-5.064 
                          7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                         />
                                     </svg>
                                 </span>
                             </div>
                         </div>
                            
                        )}

                        {/* Username field */}
                        <div>
                                <label htmlFor="username" className="sr-only">Username</label>
                                <div className="relative">
                                    <input
                                        id="username"
                                        type="text"
                                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4 text-gray-400">
                                        {/* Icon (optional) */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="size-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            width="16"
                                            height="16"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 
               0 8.268 2.943 9.542 7-1.274 4.057-5.064 
               7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                       

                        {/* Password field */}
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type="password"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4 text-gray-400">
                                    {/* Icon (optional) */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        width="16"
                                        height="16"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 
                         0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 
                         0 8.268 2.943 9.542 7-1.274 4.057-5.064 
                         7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                            disabled={loading}
                        >
                            {loading
                                ? (name === 'Login' ? 'Loging in...' : 'Signing up...')
                                : (name === 'Login' ? 'Login' : 'Sign up')
                            }
                        </button>

                        {/* Toggle between Login/Signup */}
                        <p className="text-center text-sm text-gray-500">
                            {name === 'Login' ? (
                                <>
                                    No account?
                                    <button
                                        type="button"
                                        className="underline ml-1"
                                        onClick={() => navigate('/signup')}
                                    >
                                        Sign up
                                    </button>
                                </>
                            ) : (
                                <>
                                    Already have an account?
                                    <button
                                        type="button"
                                        className="underline ml-1"
                                        onClick={() => navigate('/login')}
                                    >
                                        Sign in
                                    </button>
                                </>
                            )}
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form
