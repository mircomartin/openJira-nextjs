import { FC, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
	sideMenuOpen: boolean;
	isAddingEntry: boolean;
	isDraggin: boolean;
}

const UI_INITIAL_STATE: UIState = {
	sideMenuOpen: false,
	isAddingEntry: false,
	isDraggin: false,
}

export const UIProvider:FC = ({children}) => {

const [state, dispatch] = useReducer(uiReducer , UI_INITIAL_STATE)

	const openSideMenu = () => {
		dispatch({
			type: 'UI - Open Sidebar'
		})
	}

	const closeSideMenu = () => {
		dispatch({
			type: 'UI - Close Sidebar'
		})
	}

	const setIsAddingEntry = (isAdding: boolean) => {
		dispatch({
			type: 'UI - IsAddingEntry',
			payload: isAdding
		})
	}

	const startDraggin = () => {
		dispatch({ type: 'UI - Start Draggin' })
	}

	const endDraggin = () => {
		dispatch({ type: 'UI - End Draggin' })
	}

return (
	<UIContext.Provider value={{
		...state,

		//Methods
		closeSideMenu,
		openSideMenu,
		setIsAddingEntry,
		endDraggin,
		startDraggin
	}}>
		{ children }
	</UIContext.Provider>
)
}
