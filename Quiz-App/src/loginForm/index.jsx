"use client"
import { useState } from "react"
import Button from "../../Buttons/SecondaryBtn"
import Link from "next/link"
import axios from "axios"
import API_BASE from "@/app/utils/api"
import { AiOutlineEye } from "react-icons/ai"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { useRouter } from "next/navigation"
import { CgSpinner } from "react-icons/cg"

function LoginForm() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [visibility, setVisibility] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false);
    const router = useRouter()


    const login = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setError("Email or password fields cannot be empty.");
            return;
        }

        setError(false);
        try {
            setLoading(true);
            const response = await axios.post(`${API_BASE}/login`, {
                email_address: formData.email,
                password: formData.password
            });
            console.log("login successful", response.data);
            const oneHour = 60 * 60 * 1000;
            const expires = new Date(Date.now() + oneHour).toUTCString();
            document.cookie = `access_token=${response.data.data.access_token}; path=/; samesite=strict; expires=${expires}`;
            router.push("/dashboard/onboarding");
        } catch (error) {
            if (error.response && error.response.status === 404 && error.response.data.detail === "User email not verified") {
                setError("Email not verified. Please check you inbox and verify your email")
            } else {
                setError("Email or password incorrect");
            }
            console.log("log in failed", error);
        } finally {
            setLoading(false);
        }
    }


    const toggleVisibility = () => setVisibility(!visibility);


    const handleInputChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
        if (error) {
            setError(false);
        }
    };


    const inputClass = `w-full border-2 p-3 rounded-xl 
    ${error ? 'border-red-400 ring-red-400 focus:border-red-700' : 'ring-[#8ac3ff8a] focus:border-primary'}  ring-[#61aeff8f] 
    focus:border-primary focus:ring-[3px] focus:outline-none`;

    return (
        <form onSubmit={login}>
            <p className="font-bold text-3xl"> Sign In </p>
            <p className="text-xl">  Sign in to access your account</p>

            <div className="flex flex-col gap-2 mt-2">
                <p className="text-lg"> Email  </p>
                <input
                    className={inputClass}
                    type="email"
                    value={formData.email}
                    placeholder="Enter your email address"
                    onChange={handleInputChange('email')}
                />

                <p className="text-lg"> Password </p>
                <div className="flex items-center relative">
                    <input
                        className={inputClass}
                        type={visibility ? "text" : "password"}
                        value={formData.password}
                        placeholder="Password"
                        onChange={handleInputChange('password')}
                    />
                    {visibility ?
                        <AiOutlineEye className="absolute right-0 mx-2 text-gray-500 bg-white hover:cursor-pointer"
                            onClick={toggleVisibility} size={30} /> :
                        <AiOutlineEyeInvisible className="absolute right-0 mx-2 text-gray-500 bg-white hover:cursor-pointer"
                            onClick={toggleVisibility} size={30} />}
                </div>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}


            <p className="mt-2 text-lg"> Forgot Password? <span className="text-primary font-semibold">Reset</span> </p>

            <div className="mt-[-30px]">
                {loading ? (
                    <button className="bg-primary text-white px-4 py-2 mt-10 w-full rounded-xl flex 
                 items-center justify-center hover:opacity-80" disabled>
                        <CgSpinner className="animate-spin" size={28} />
                    </button>
                ) : <Button text="Login" />
                }
            </div>

            <p className="mt-3 text-lg"> New to MVI Tracking?
                <Link href={"/authentication/welcome"} className="text-primary font-semibold hover:underline"> Sign Up</Link></p>
        </form>
    )
}

export default LoginForm