import Profile from "../pages/Profile";
import Search from "../pages/Search";
import About from "../pages/About";
import Notes from "../pages/Notes";
import GraphView from "../pages/GraphView";
import Users from "../pages/Users";

export const routes = [
    {name: "Профиль", to: "/profile", element: Profile},
    {name: "Поиск", to: "/search", element: Search},
    {name: "Заметки", to: "/notes", element: Notes},
    {name: "Граф", to: "/graph", element: GraphView},
]

export const adminRoutes = [
    {name: "Профиль", to: "/profile", element: Profile},
    {name: "Пользователи", to: "/users", element: Users},
]

export const defaultRoutes = [
    {name: "Авторизация", to: "/auth", element: Profile}
]

export const excludedRoutes = [
    {name: "О нас", to: "/about", element: About},
    {name: "По умолчанию", to: "/*", element: About},
]