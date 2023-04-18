import Profile from "../pages/Profile";
import Vaults from "../pages/Vaults";
import Search from "../pages/Search";
import About from "../pages/About";
import Setup from "../pages/Setup";
import Notes from "../pages/Notes";

export const routes = [
    {name: "Профиль", to: "/profile", element: Profile},
    {name: "Хранилища", to: "/vaults", element: Vaults},
    {name: "Поиск", to: "/search", element: Search},
    {name: "Настройки", to: "/setup", element: Setup},
    {name: "Заметки", to: "/notes", element: Notes}
]

export const excludedRoutes = [
    {name: "О нас", to: "/about", element: About},
    {name: "По умолчанию", to: "/*", element: About},
]