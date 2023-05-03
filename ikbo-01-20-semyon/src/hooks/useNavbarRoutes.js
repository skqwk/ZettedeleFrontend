import {useEffect} from "react";
import {adminRoutes, defaultRoutes, routes} from "../router";
import {useSelector} from "react-redux";

export const useNavbarRoutes = (setNavbarRoutes) => {
    const auth = useSelector(state => state.auth);
    return useEffect(() => {
        if (auth.isAuth) {
            if (auth.role === 'USER') {
                setNavbarRoutes(routes)
            } else if (auth.role === 'ADMIN') {
                setNavbarRoutes(adminRoutes);
            }
        } else {
            setNavbarRoutes(defaultRoutes);
        }
    }, [auth])
}