import {useEffect} from "react";


export const useVaults = (nowVault, vaults, setNotes) => {
    return useEffect(() => {
        setNotes(extractNotes(nowVault, vaults));
    }, [nowVault]);
}

const extractNotes = (nowVault, vaults) => {
    return nowVault
        ? vaults[nowVault].notes
        : [];
}