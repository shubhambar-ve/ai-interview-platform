import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const linkClasses = (path) =>
        `text-sm font-medium transition-colors ${
            location.pathname === path
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-900"
        }`;

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
                <Link
                    to={token ? "/dashboard" : "/"}
                    className="text-lg font-semibold tracking-tight text-gray-900"
                >
                    AI Interview
                </Link>

                {!token ? (
                    <nav className="flex items-center gap-8">
                        <Link
                            to="/"
                            className={linkClasses("/")}
                        >
                            Home
                        </Link>

                        <Link
                            to="/login"
                            className={linkClasses("/login")}
                        >
                            Sign In
                        </Link>

                        <Link
                            to="/signup"
                            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                        >
                            Get Started
                        </Link>
                    </nav>
                ) : (
                    <nav className="flex items-center gap-8">
                        <Link
                            to="/dashboard"
                            className={linkClasses("/dashboard")}
                        >
                            Dashboard
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="cursor-pointer text-sm font-medium text-gray-500 transition hover:text-gray-900"
                        >
                            Logout
                        </button>
                    </nav>
                )}
            </div>
        </header>
    );
}

export default Navbar;