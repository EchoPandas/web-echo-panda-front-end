import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../routes/firebaseConfig";

const auth = getAuth(app);
const db = getFirestore(app);

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export default function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        // Check if user is authenticated with Firebase
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (!user) {
            // No user logged in, redirect to login
            navigate("/admin/login", { replace: true });
            setIsChecking(false);
            return;
          }

          // Check if user is admin in Firestore
          const adminDocRef = doc(db, "admins", user.uid);
          const adminDoc = await getDoc(adminDocRef);

          if (!adminDoc.exists()) {
            // User exists but not an admin
            console.error("Not an admin user");
            await auth.signOut();
            localStorage.removeItem("adminUser");
            navigate("/admin/login", { replace: true });
            setIsChecking(false);
            return;
          }

          const adminData = adminDoc.data();

          // Verify admin role and status
          if (adminData.role !== "admin" || adminData.status !== "active") {
            console.error("Admin account is inactive or lacks privileges");
            await auth.signOut();
            localStorage.removeItem("adminUser");
            navigate("/admin/login", { replace: true });
            setIsChecking(false);
            return;
          }

          // Admin is authorized
          setIsAuthorized(true);
          setIsChecking(false);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Auth check error:", error);
        navigate("/admin/login", { replace: true });
        setIsChecking(false);
      }
    };

    checkAdminAuth();
  }, [navigate, location]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 font-medium">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
