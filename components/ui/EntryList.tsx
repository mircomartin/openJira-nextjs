import { DragEvent, FC, useContext, useMemo } from 'react';

import { List, Paper } from '@mui/material';

import { EntriesContext } from '../../context/entries/';
import { UIContext } from '../../context/ui';

import { EntryCard } from './';
import { EntryStatus } from '../../interfaces/';
import styles from './Entry.List.module.css';

interface Props {
	status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
	const { entries, updateEntry } = useContext(EntriesContext);
	const { isDraggin, endDraggin } = useContext(UIContext);

	const entriesByStatus = useMemo(
		() => entries.filter((e) => e.status === status),
		[entries],
	);

	const allowDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const id = e.dataTransfer.getData('text');
		
		const entry = entries.find((e) => e._id === id)!;
		entry.status = status;
		updateEntry(entry);
		endDraggin();
	};

	return (

		<div
			onDrop={onDropEntry}
			onDragOver={allowDrop}
			className={isDraggin ? styles.draggin : ''}
		>
			<Paper
				sx={{
					height: 'calc(100vh - 180px)',
					overflow: 'scroll',
					backgroundColor: 'transparent',
					padding: '3px 5px',
				}}
			>
				<List sx={{ opacity: isDraggin ? 0.3 : 1, transition: 'all 0.3s' }}>
					{entriesByStatus.map((entry) => (
						<EntryCard key={entry._id} entry={entry} />
					))}
				</List>
			</Paper>
		</div>
	);
};
