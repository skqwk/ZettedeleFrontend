import {useEffect} from "react";
import {adminRoutes, defaultRoutes, routes} from "../router";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";

export const useNavbarRoutes = (setNavbarRoutes) => {
    const auth = useSelector(state => state.auth);
    const location = useLocation();
    return useEffect(() => {
        console.log('USE NAVBAR ROUTES');
        console.log(window.location.pathname);
        if (auth.isAuth) {
            if (auth.role === 'USER') {
                setNavbarRoutes(routes)
            } else if (auth.role === 'ADMIN') {
                setNavbarRoutes(adminRoutes);
            }
        } else {
            setNavbarRoutes(defaultRoutes);
        }
    }, [auth, location.pathname])
}