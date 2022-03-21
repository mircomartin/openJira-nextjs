import { createContext } from 'react';


interface ContextProps {
    sideMenuOpen: boolean;
    isAddingEntry: boolean;
    isDraggin: boolean;

    //Methods
    closeSideMenu: () => void;
    endDraggin: () => void;
    openSideMenu: () => void;
    setIsAddingEntry: (isAdding: boolean) => void;
    startDraggin: () => void;
}


export const UIContext = createContext({} as ContextProps )