import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { bugsService } from "../services/BugsService";
// import { notesService } from "../services/NotesService";

export class BugsController extends BaseController {
    constructor() {
        super("api/bugs")
        this.router
            .use(auth0provider.getAuthorizedUserInfo)
            .get('', this.getAll)
            .get('/:id', this.getById)
            .post('', this.create)
            .put('/:id', this.edit)
    }
    async getAll(req, res, next) {
        try {
            let data = await bugsService.getAll(req.query)
            return res.send(data)
        } catch (error) {
            next(error)
        }
    }
    async getById(req, res, next) {
        try {
            let data = await bugsService.getById(req.params.id, req.userInfo.email)
            return res.send(data)
        } catch (error) {
            next(error)
        }
    }
    // async getNotes(req, res, next) {
    //     try {
    //         let data = await notesService.getAll(req.params.id)
    //         return res.send(data)
    //     } catch (error) {
    //         next(error)
    //     }
    // }
    async create(req, res, next) {
        try {
            req.body.creatorEmail = req.userInfo.email
            let data = await bugsService.create(req.body)
            return res.status(201).send(data)
        } catch (error) { next(error) }
    }
    async edit(req, res, next) {
        try {
            let data = await bugsService.edit(req.params.id, req.userInfo.email, req.body)
            return res.send(data)
        } catch (error) { next(error) }
    }
}