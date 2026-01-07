import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth, app } from "../../routes/firebaseConfig";
import { FaEnvelope, FaLock, FaShieldAlt, FaExclamationCircle } from "react-icons/fa";

const db = getFirestore(app);

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Authenticate with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user is admin in Firestore
      const adminDocRef = doc(db, "admins", user.uid);
      const adminDoc = await getDoc(adminDocRef);

      if (!adminDoc.exists()) {
        console.error("Admin document not found for UID:", user.uid);
        setError(`Access denied. No admin document found for this account. UID: ${user.uid}`);
        await auth.signOut();
        setLoading(false);
        return;
      }

      const adminData = adminDoc.data();
      console.log("Admin data found:", adminData);
      
      // Verify admin role
      if (adminData.role !== "admin" || adminData.status !== "active") {
        console.error("Invalid role or status:", { role: adminData.role, status: adminData.status });
        setError(`Access denied. Role: ${adminData.role || "missing"}, Status: ${adminData.status || "missing"}. Both must be "admin" and "active".`);
        await auth.signOut();
        setLoading(false);
        return;
      }

      // Store admin info in localStorage for persistent login
      localStorage.setItem("adminUser", JSON.stringify({
        uid: user.uid,
        email: user.email,
        name: adminData.name || "Admin",
        role: adminData.role
      }));

      // Navigate to admin dashboard
      navigate("/admin/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      
      switch (err.code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
          setError("Invalid email or password.");
          break;
        case "auth/too-many-requests":
          setError("Too many failed attempts. Please try again later.");
          break;
        case "auth/network-request-failed":
          setError("Network error. Please check your connection.");
          break;
        default:
          setError("Login failed. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl mb-4 shadow-2xl shadow-purple-500/50">
            <FaShieldAlt className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">
            Admin <span className="text-purple-400">Portal</span>
          </h1>
          <p className="text-slate-500 font-medium">Sign in to access the dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <FaExclamationCircle className="text-red-400 text-xl flex-shrink-0 mt-0.5" />
                <p className="text-red-400 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-slate-400 text-sm font-bold uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative group">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="w-full pl-12 pr-6 py-4 rounded-xl bg-slate-800/50 border border-white/5 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-slate-400 text-sm font-bold uppercase tracking-wider">
                Password
              </label>
              <div className="relative group">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-6 py-4 rounded-xl bg-slate-800/50 border border-white/5 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-black uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Footer Info */}
          <div className="mt-6 pt-6 border-t border-white/5">
            <p className="text-slate-500 text-xs text-center font-medium">
              This is a restricted area. Unauthorized access is prohibited.
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-slate-500 hover:text-purple-400 text-sm font-medium transition-colors"
          >
            ← Back to Website
          </button>
        </div>
      </div>
    </div>
  );
}
