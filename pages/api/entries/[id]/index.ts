import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database';
import { Entry, IEntry } from '../../../../models';

type Data = 
    | { message: string }
    | IEntry
    
export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    /* const { id } = req.query;

    if (!mongoose.isValidObjectId( id )) {
        return res.status(400).json({message: 'ID no valido' + id})
    } */

    switch ( req.method ) {

        case 'GET':
            return getEntry( req, res );

        case 'PUT':
            return updateEntry( req, res );

        case 'DELETE':
            return deleteEntry( req, res );
    
        default:
            return res.status(400).json({message: 'Metodo no existe'});
            
    }

}

const getEntry = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { id } = req.query;

    await db.connect();

    const entryById = await Entry.findById( id );

    if(!entryById) {
        await db.disconnect();
        return res.status(400).json({message: 'ID no valido' + id});
    }

    return res.status(200).json(entryById);

}

const updateEntry = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { id } = req.query;

    await db.connect();

    const entryToUpdate = await Entry.findById( id );

    if(!entryToUpdate) {
        await db.disconnect();
        return res.status(400).json({message: 'ID no valido' + id});
    }

    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status,
    } = req.body;

    try {
        
        const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true })
        await db.disconnect();
        res.status(200).json(updatedEntry!)
        
    } catch (error) {
        await db.disconnect();
        res.status(400).json({message: 'Bad request'})

    }


}

const deleteEntry = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { id } = req.query;

    await db.connect();

    const entryToDelete = await Entry.findById( id );

    if(!entryToDelete) {
        await db.disconnect();
        return res.status(400).json({message: 'ID no valido' + id});
    }

    try {
        
        const deleteEntry = await Entry.findByIdAndDelete(id)
        await db.disconnect();
        res.status(200).json(deleteEntry!)
        
    } catch (error) {
        await db.disconnect();
        res.status(400).json({message: 'Bad request'})

    }


}