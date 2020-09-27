import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class NotesService {
    async getAllNotes(id) {
        return await dbContext.Notes.find({ bugId: id })
    }
    async create(rawData) {
        let data = await dbContext.Notes.create(rawData)
        return data
    }
    async getById(id) {
        let data = await dbContext.Notes.findOne({ _id: id })
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this bug")
        }
        return data
    }

    async edit(id, userEmail, update) {
        let note = await this.getById(id)
        let data = null
        // @ts-ignore
        if (note.creatorEmail == userEmail) {
            data = await dbContext.Notes.findOneAndUpdate({ _id: id }, update, { new: true })
            if (!data) {
                throw new BadRequest("Invalid ID or you do not own this note");
            }
        }
        return data;
    }

    async delete(id, userEmail) {
        let note = await this.getById(id)
        let data = null
        // @ts-ignore
        if (note.creatorEmail == userEmail) {
            data = await dbContext.Notes.findOneAndRemove({ _id: id });
            if (!data) {
                throw new BadRequest("Invalid ID or you do not own this note");
            }
        }
        return data
    }

}

export const notesService = new NotesService()