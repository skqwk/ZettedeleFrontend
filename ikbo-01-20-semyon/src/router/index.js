import Profile from "../pages/Profile";
import Search from "../pages/Search";
import About from "../pages/About";
import Notes from "../pages/Notes";
import Test from "../pages/Test";

export const routes = [
    {name: "Профиль", to: "/profile", element: Profile},
    // {name: "Хранилища", to: "/vaults", element: Vaults},
    {name: "Поиск", to: "/search", element: Search},
    // {name: "Настройки", to: "/setup", element: Setup},
    {name: "Заметки", to: "/notes", element: Notes},
    {name: "Тест", to: "/test", element: Test},
]

export const excludedRoutes = [
    {name: "О нас", to: "/about", element: About},
    {name: "По умолчанию", to: "/*", element: About},
]