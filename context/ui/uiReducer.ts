import { UIState } from './';

type UIActionType = 
| { type: 'UI - Open Sidebar' }
| { type: 'UI - Close Sidebar' }
| { type: 'UI - IsAddingEntry', payload: boolean }
| { type: 'UI - Start Draggin' }
| { type: 'UI - End Draggin' }


export const uiReducer = ( state: UIState, action: UIActionType ): UIState => {

    switch (action.type) {
        case 'UI - Open Sidebar':
            return {
                ...state,
                sideMenuOpen: true,
            }

        case 'UI - Close Sidebar':
            return {
                ...state,
                sideMenuOpen: false,
            }

        case 'UI - IsAddingEntry':
            return {
                ...state,
                isAddingEntry: action.payload,
            }

        case 'UI - Start Draggin':
            return {
                ...state,
                isDraggin: true,
            }

        case 'UI - End Draggin':
            return {
                ...state,
                isDraggin: false,
            }

        default:
            return state;
    }
    
}

