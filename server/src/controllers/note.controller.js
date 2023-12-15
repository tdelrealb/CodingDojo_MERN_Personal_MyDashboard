import Note from '../models/note.model.js';
import Project from '../models/project.model.js';
import { v4 as uuidv4 } from 'uuid';
import { s3 } from '../config/awsS3.config.js';
import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';


//  CONTROLADOR ORIGINAL
// const createNote = async (req, res) => {
// 	const noteData = req.body;
// 	const userId = req.user._id;

// 	try {
// 		const newNote = await Note.create({ ...noteData, userId });
// 		await newNote.save();
// 		res.status(201).json({ newNote });
// 	} catch (error) {
// 		res.status(500).json({ error: 'Error creating the note.' });
// 	}
// };

//  CONTROLADOR CON AWSS3 V1
// const createNote = async (req, res) => {
// 	const noteData = req.body;
// 	const userId = req.user._id;
// 	const file = req.file;
// 	const uniqueKey = uuidv4();
// 	const folderName = 'note-images';
// 	const fileNameWithUuid = `${folderName}/${uniqueKey}-${file.originalname}`;

// 	const uploadParams = {
// 		Bucket: 'my-dashboard-bucket',
// 		Key: fileNameWithUuid,
// 		Body: file.buffer,
// 		ContentType: file.mimetype,
// 	};

// 	const uploadCommands = new PutObjectCommand(uploadParams);

// 	try {
// 		const data = await s3.send(uploadCommands);
// 		console.log('Successfully uploaded ', data);

// 		noteData.notePicture = uploadParams.Key;
		
// 		const newNote = await Note.create({ ...noteData, userId });
// 		await newNote.save();
// 		res.status(201).json({ newNote });
// 	} catch (error) {
// 		res.status(500).json({ error: 'Error creating the note.' });
// 	}
// };


//  CONTROLADOR CON AWSS3 V2
const createNote = async (req, res) => {
    const noteData = req.body;
    const userId = req.user._id;
    const file = req.file;
    const uniqueKey = uuidv4();
    const folderName = 'note-images';

    if (file) {
    const fileNameWithUuid = `${folderName}/${uniqueKey}-${file.originalname}`;

    const uploadParams = {
        Bucket: 'my-dashboard-bucket',
        Key: fileNameWithUuid,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    const uploadCommands = new PutObjectCommand(uploadParams);

    try {
        const data = await s3.send(uploadCommands);
        console.log('Successfully uploaded ', data);

        noteData.notePicture = uploadParams.Key;
    } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).json({ error: 'Error uploading file.' });
    }
    }

    try {
        const newNote = await Note.create({ ...noteData, userId });
        await newNote.save();
        res.status(201).json({ newNote });
    } catch (error) {
        console.error('Error creating the note:', error);
        res.status(500).json({ error: 'Error creating the note.' });
    }
};

//  CONTROLADOR ORIGINAL
// const getNotesByArea = async (req, res) => {
// 	const { area } = req.params;
// 	const userId = req.user._id;

// 	try {
// 		const notes = await Note.find({ userId, area });
// 		res.status(200).json({ notes });
// 	} catch (error) {
// 		res.status(500).json({ error: 'Error filtering notes by area.' });
// 	}
// };

//  CONTROLADOR CON AWSS3
const getNotesByArea = async (req, res) => {
    const { area } = req.params;
    const userId = req.user._id;

    try {
    const notes = await Note.find({ userId, area });

    
    const notesWithImageUrls = await Promise.all(notes.map(async note => {
        if (note.notePicture) {
        const command = new GetObjectCommand({
                Bucket: 'my-dashboard-bucket',
                Key: note.notePicture,
        });

        const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 }); 

        return { ...note.toObject(), imageUrl: signedUrl };
        } else {
        return note;
        }
    }));

        res.status(200).json({ notes: notesWithImageUrls });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error filtering notes by area.' });
    }
};

const searchNotes = async (req, res) => {
	const { query } = req.params;
	const userId = req.user._id;

	try {
		const notes = await Note.find({
			userId,
			$or: [
				{ title: { $regex: query, $options: 'i' } },
				{ body: { $regex: query, $options: 'i' } },
				{ label: { $regex: query, $options: 'i' } },
			],
		});
		res.status(200).json({ notes });
	} catch (error) {
		res.status(500).json({ error: 'Error searching for notes.' });
	}
};

//  CONTROLADOR ORIGINAL
// const updateNote = async (req, res) => {
// 	const { id } = req.params;
// 	const { area, title, label, body } = req.body;
// 	const userId = req.user._id;

// 	try {
// 		const note = await Note.findOne({ _id: id, userId });

// 		if (!note) {
// 			return res.status(404).json({ error: 'Note not found.' });
// 		}

// 		note.area = area;
// 		note.title = title;
// 		note.label = label;
// 		note.body = body;

// 		await note.save();
// 		res.status(200).json({ note });
// 	} catch (error) {
// 		res.status(500).json({ error: 'Error updating the note.' });
// 	}
// };

//  CONTROLADOR CON AWSS3
const updateNote = async (req, res) => {
    const noteData = req.body;
    const noteId = req.params.id;
    const userId = req.user._id;
    const file = req.file;

    try {
        const note = await Note.findOne({ _id: noteId, userId });

        if (!note) {
            return res.status(404).json({ error: 'Note not found.' });
        }

        if(file){
            
            if (note.notePicture) {
                const deleteParams = {
                    Bucket: 'my-dashboard-bucket',
                    Key: note.notePicture,
                };

                const deleteCommand = new DeleteObjectCommand(deleteParams);

                await s3.send(deleteCommand);
                console.log('Successfully deleted old image');
            }

            
            const uniqueKey = uuidv4();
            const folderName = 'note-images';
            const fileNameWithUuid = `${folderName}/${uniqueKey}-${file.originalname}`;

            const uploadParams = {
                Bucket: 'my-dashboard-bucket',
                Key: fileNameWithUuid,
                Body: file.buffer,
                ContentType: file.mimetype,
            };

            const uploadCommands = new PutObjectCommand(uploadParams);

            const data = await s3.send(uploadCommands);
            console.log('Successfully uploaded new image', data);

            noteData.notePicture = uploadParams.Key;
        }

        const updatedNote = await Note.findByIdAndUpdate(noteId, noteData, { new: true });
        res.status(200).json({ updatedNote });
    } catch (error) {
        res.status(500).json({ error: 'Error updating the note.' });
    }
};

//  CONTROLADOR ORIGINAL
// const deleteNote = async (req, res) => {
// 	const { id } = req.params;
// 	const userId = req.user._id;

// 	try {
// 		const note = await Note.findByIdAndDelete({ _id: id, userId });

// 		if (!note) {
// 			return res.status(404).json({ error: 'Note not found.' });
// 		}
// 		res.status(200).json({ message: 'Note succesfully deleted.' });
// 	} catch (error) {
// 		res.status(500).json({ error: 'Error deleting the note.' });
// 	}
// };

//  CONTROLADOR CON AWSS3
const deleteNote = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    try {
        const note = await Note.findOne({ _id: id, userId });

        if (!note) {
            return res.status(404).json({ error: 'Note not found.' });
        }

        
        if (note.notePicture) {
            const deleteParams = {
                Bucket: 'my-dashboard-bucket',
                Key: note.notePicture,
            };

            const deleteCommand = new DeleteObjectCommand(deleteParams);

            await s3.send(deleteCommand);
            console.log('Successfully deleted image');
        }

        
        await Note.findByIdAndDelete({ _id: id, userId });

        res.status(200).json({ message: 'Note successfully deleted.' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting the note.' });
    }
};

export {
	createNote,
	getNotesByArea,
	searchNotes,
	updateNote,
	deleteNote,
};
