import { ChangeEvent, useContext, useState } from 'react';

import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import AddIcon from '@mui/icons-material/SaveAltOutlined';
import { Box, Button, TextField } from '@mui/material';

import { EntriesContext } from '../../context/entries/';
import { UIContext } from '../../context/ui/';

export const NewEntry = () => {
	const { addNewEntry } = useContext(EntriesContext);
	const { setIsAddingEntry, isAddingEntry } = useContext(UIContext);

	const [inputValue, setInputValue] = useState('');
	const [isTouch, setIsTouch] = useState(false);

	const onTextFieldChanged = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setInputValue(e.target.value);
	};

	const handleSave = () => {
		if (inputValue.length === 0) return;

		addNewEntry(inputValue);

		setIsAddingEntry(false);
		setIsTouch(false);
		setInputValue('');
	};

	return (
		<Box sx={{ marginBottom: 1, paddingX: 2 }}>
			{isAddingEntry ? (
				<>
					<TextField
						fullWidth
						sx={{ marginTop: 2, marginBottom: 1 }}
						placeholder="Nueva Entrada"
						autoFocus
						label="Nueva Entrada"
						helperText={
							inputValue.length <= 0 && isTouch && 'Ingrese un valor'
						}
						error={inputValue.length <= 0 && isTouch}
						value={inputValue}
						onChange={onTextFieldChanged}
						onBlur={() => setIsTouch(true)}
					/>
					<Box display="flex" justifyContent="space-between">
						<Button variant="text" onClick={() => setIsAddingEntry(false)}>
							Cancelar
						</Button>
						<Button
							variant="outlined"
							color="secondary"
							endIcon={<SaveAltOutlinedIcon />}
							onClick={handleSave}
						>
							Guardar
						</Button>
					</Box>
				</>
			) : (
				<Button
					startIcon={<AddIcon />}
					fullWidth
					variant="outlined"
					onClick={() => setIsAddingEntry(true)}
				>
					Agregar Tarea
				</Button>
			)}
		</Box>
	);
};
