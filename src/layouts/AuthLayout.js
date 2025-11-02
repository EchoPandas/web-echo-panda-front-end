import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
const AuthLayout = () => {
    return (_jsxs("div", { children: [_jsx("h1", { children: "Auth Layout" }), _jsx(Outlet, {})] }));
};
export default AuthLayout;
