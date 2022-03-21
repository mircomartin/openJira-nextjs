import { DragEvent, FC, useContext } from 'react';

import { useRouter } from 'next/router';

import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Typography,
} from '@mui/material';

import { Entry } from '../../interfaces';
import { UIContext } from '../../context/ui';
import { dateFunctions } from '../../utils';

interface Props {
	entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {

	const { startDraggin, endDraggin } = useContext(UIContext)

	const onDragStart = (e:DragEvent<HTMLDivElement>) => {
		e.dataTransfer.setData('text/plain', entry._id)
		startDraggin()
	}

	const onDragEnd = () => {
		endDraggin()
	}

	const router = useRouter()

	const handleOnEntry = () => {
		router.push(`/entries/${entry._id}`)
	}

	return (
		<Card sx={{ marginBottom: 1 }} draggable onDragStart={ onDragStart } onDragEnd={ onDragEnd } onClick={ handleOnEntry }>
			<CardActionArea>
				<CardContent>
					<Typography sx={{ whiteSpace: 'pre-line' }}>
						{entry.description}
					</Typography>
				</CardContent>

				<CardActions sx={{ justifyContent: 'end', paddingRight: 2 }}>
					<Typography variant="body2">{dateFunctions.getFormatDistanceToNow(entry.createdAt)}</Typography>
				</CardActions>
			</CardActionArea>
		</Card>
	);
};
