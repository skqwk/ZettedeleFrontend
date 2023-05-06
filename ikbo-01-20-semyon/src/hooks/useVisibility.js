import {useEffect} from "react";
import {UserService} from "../API/UserService";

export const useVisibility = (authToken, setVisibility) => {
    return useEffect(() => {
        UserService.getVisibility(authToken)
            .then(rs => {
                console.log(rs.data);
                setVisibility(rs.data.visibility === 'PUBLIC');
            })
    }, [])
}