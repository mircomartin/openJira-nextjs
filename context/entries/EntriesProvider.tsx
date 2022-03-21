import { FC, useEffect, useReducer } from 'react';

import { useSnackbar } from 'notistack';

import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces/';
import { entriesApi } from '../../apis';


export interface EntriesState {
	entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
	entries: [],
};

export const EntriesProvider: FC<EntriesState> = ({ children }) => {

	const { enqueueSnackbar } = useSnackbar();

	const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

	const addNewEntry = async (description: string) => {

		const { data } = await entriesApi.post<Entry>('/entries', {description})

		dispatch({
			type: 'Entry - Add-Entry',
			payload: data,
			
		})
	}

	const updateEntry = async ( entry: Entry, showSnackBar:boolean = false ) => {

		try {

			const { data } = await entriesApi.put<Entry>(`/entries/${entry._id}`, { description: entry.description, status: entry.status })

			dispatch({
				type: 'Entry - Entry-Updated',
				payload: data,
			})

			//Mostrar Snackbar
			if(showSnackBar){
				enqueueSnackbar('Entrada actualizada con exito',{
					variant: 'success',
					autoHideDuration: 1500,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'right'
					}
				})
			}


		} catch (error) {

			console.log(error)
			
		}
	}

	const deleteEntry = async ( entry: Entry, showSnackBar:boolean = false ) => {

		try {

			const { data } = await entriesApi.delete<Entry>(`/entries/${entry._id}`)

			dispatch({
				type: 'Entry - Entry-Delete',
				payload: data,
			})

			//Mostrar Snackbar
			if(showSnackBar){
				enqueueSnackbar('Entrada elimnada con exito',{
					variant: 'warning',
					autoHideDuration: 1500,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'right'
					}
				})
			}

			refreshEntries()


		} catch (error) {

			console.log(error)
			
		}
	}

	const refreshEntries = async() => {
		
		const { data } = await entriesApi.get<Entry[]>('/entries')

		dispatch({
			type: 'Entry - Refresh-Data',
			payload: data
		})

	}

	useEffect(() => {

		refreshEntries()

	}, [])
	

	return (
		<EntriesContext.Provider
			value={{
				...state,

				//Methods
				addNewEntry,
				deleteEntry,
				updateEntry,
			}}
		>
			{children}
		</EntriesContext.Provider>
	);
};
