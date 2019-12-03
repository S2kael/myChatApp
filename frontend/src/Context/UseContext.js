import { useContext, useEffect } from "react";

import { AppContext } from "./Context";

const useAppContext = () => {
    const [state, dispatch] = useContext(AppContext);

    useEffect(() => {

    }, [])


    function updateIsDark() {
        dispatch((draft) => {
            draft.isDark = !state.isDark;
        })
    }

    return {
        ...state,
        updateIsDark
    };
};

export { useAppContext };