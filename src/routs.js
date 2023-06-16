import Login from "./pages/login"
import Events from "./pages/events"
import Home from "./pages/home"
import Manager from "./pages/manager"
import Register from "./pages/register"

export const authRoutes = [
    {
        path: '/events',
        Component: Events
    },
    {
        path: "/manager",
        Component: Manager
    }
]

export const publicRoutes = [
    {
        path: "/login",
        Component: Login
    },
    {
        path: "/register",
        Component: Register
    },
    {
        path: '/',
        Component: Home
    }
]