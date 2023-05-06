import {useSelector} from "react-redux";

export const useProfile = () => {
    return useSelector(state => state.profile.name)
};