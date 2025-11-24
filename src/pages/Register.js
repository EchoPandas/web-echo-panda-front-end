var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../routes/firebaseConfig";
import { useNavigate } from "react-router-dom";
import BgImage from "../assets/registerBG.png";
const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => (Object.assign(Object.assign({}, prev), { [name]: value })));
    };
    const handleEmailRegister = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            setLoading(false);
            return;
        }
        try {
            // Check if user already exists in localStorage
            const existingUser = localStorage.getItem("user");
            if (existingUser) {
                let parsed;
                try {
                    parsed = JSON.parse(existingUser);
                }
                catch (_a) {
                    // If parsing fails, treat as no existing user
                    parsed = null;
                }
                if (parsed &&
                    typeof parsed === "object" &&
                    "email" in parsed &&
                    typeof parsed.email === "string" &&
                    parsed.email === formData.email) {
                    setError("An account with this email already exists");
                    setLoading(false);
                    return;
                }
            }
            // Store user data in localStorage (temporary until backend is ready)
            const userData = {
                username: formData.username,
                email: formData.email,
                registeredAt: new Date().toISOString(),
            };
            // Save to localStorage
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("userPassword", formData.password); // Store password securely
            localStorage.setItem("isAuthenticated", "true");
            console.log("Registration success - stored in localStorage", userData);
            // Navigate to home after successful registration
            void navigate("/");
        }
        catch (err) {
            if (err instanceof Error)
                console.error("Registration error", err.message);
            else
                console.error("Registration error", err);
            setError("Failed to register. Please try again.");
        }
        finally {
            setLoading(false);
        }
    };
    const handleGoogleRegister = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield signInWithPopup(auth, googleProvider);
            console.log("Registered with Google:", result.user);
            void navigate("/");
        }
        catch (err) {
            if (err instanceof Error)
                console.error(err.message);
            else
                console.error(err);
            setError("Failed to sign up with Google");
        }
    });
    return (_jsxs("div", { className: "min-h-screen flex items-center justify-center p-5 relative overflow-hidden", style: {
            backgroundImage: `url(${BgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }, children: [_jsx("div", { className: "absolute inset-0 bg-black/30 backdrop-blur-sm" }), _jsxs("div", { className: "relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-5xl p-10 border border-white/20", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-4xl font-bold text-white mb-2 drop-shadow-lg", children: "Create Account" }), _jsx("p", { className: "text-white/80 text-sm", children: "Join Echo Panda today" })] }), _jsx("div", { className: "mb-6 max-w-xl mx-auto", children: _jsxs("button", { onClick: () => void handleGoogleRegister(), disabled: loading, className: `w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white/95 backdrop-blur-sm rounded-xl text-base font-semibold text-gray-800 transition-all duration-300 shadow-lg border border-white/40 ${loading
                                ? "opacity-60 cursor-not-allowed"
                                : "hover:bg-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"}`, children: [!loading && (_jsxs("svg", { className: "w-6 h-6", viewBox: "0 0 24 24", children: [_jsx("path", { fill: "#4285F4", d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" }), _jsx("path", { fill: "#34A853", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }), _jsx("path", { fill: "#FBBC05", d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" }), _jsx("path", { fill: "#EA4335", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" })] })), _jsx("span", { children: loading ? "Signing up..." : "Sign up with Google" })] }) }), _jsx("div", { className: "relative my-6 max-w-xl mx-auto", children: _jsx("div", { className: "relative flex justify-center text-sm", children: _jsx("span", { className: "px-4 bg-transparent text-white/70 font-medium", children: "Or sign up with email" }) }) }), _jsxs("form", { onSubmit: handleEmailRegister, className: "max-w-4xl mx-auto", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "username", className: "block text-sm font-semibold text-white/90 mb-2", children: "Username" }), _jsx("input", { type: "text", id: "username", name: "username", value: formData.username, onChange: handleInputChange, required: true, className: "w-full px-4 py-3.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-white/50 focus:bg-white/25 outline-none transition-all duration-200", placeholder: "Choose a username" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-semibold text-white/90 mb-2", children: "Email" }), _jsx("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleInputChange, required: true, className: "w-full px-4 py-3.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-white/50 focus:bg-white/25 outline-none transition-all duration-200", placeholder: "your.email@example.com" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-semibold text-white/90 mb-2", children: "Password" }), _jsx("input", { type: "password", id: "password", name: "password", value: formData.password, onChange: handleInputChange, required: true, className: "w-full px-4 py-3.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-white/50 focus:bg-white/25 outline-none transition-all duration-200", placeholder: "At least 6 characters" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "confirmPassword", className: "block text-sm font-semibold text-white/90 mb-2", children: "Confirm Password" }), _jsx("input", { type: "password", id: "confirmPassword", name: "confirmPassword", value: formData.confirmPassword, onChange: handleInputChange, required: true, className: "w-full px-4 py-3.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-white/50 focus:bg-white/25 outline-none transition-all duration-200", placeholder: "Re-enter your password" })] })] }), error && (_jsx("div", { className: "p-3.5 bg-red-500/20 backdrop-blur-sm border border-red-400/40 rounded-xl text-red-100 text-sm text-center font-medium shadow-lg mt-4", children: error })), _jsx("div", { className: "flex w-full justify-center", children: _jsx("button", { type: "submit", disabled: loading, className: ` p-6 mt-6  py-4 bg-white text-gray-800 rounded-xl font-bold text-base shadow-xl transition-all duration-300 border border-white/90 ${loading
                                        ? "opacity-60 cursor-not-allowed"
                                        : "hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"}`, children: loading ? "Creating Account..." : "Create Account" }) })] }), _jsx("div", { className: "text-center pt-6 border-t border-white/20 mt-6 max-w-xl mx-auto", children: _jsxs("p", { className: "text-sm text-white/70", children: ["Already have an account?", " ", _jsx("a", { href: "/login", className: "text-white font-bold hover:text-purple-200 transition-colors duration-200 underline underline-offset-2", children: "Log in" })] }) })] })] }));
};
export default Register;
