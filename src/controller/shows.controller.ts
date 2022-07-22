import { Router, Response, Request } from "express";
import { ShowEntity } from "../database/entities/shows.entity";
import { ShowsService } from "../services/shows.service"; // import service

export class ShowsController {
  public router: Router;
  private showsService: ShowsService; 

  constructor(){
    this.showsService = new ShowsService(); // Create a new instance of PostController
    this.router = Router();
    this.routes();
  }

  public index = async (req: Request, res: Response) => {
    const query = req['query']
    const shows = await this.showsService.index(query);
    res.send(shows).json();
  } 

  public findById = async (req: Request, res: Response) => {
    const id = req['params']['id'];
    const shows = await this.showsService.findById(Number(id));
    res.send(shows).json();
  }

  public create = async (req: Request, res: Response) => {
    const show = req['body'] as ShowEntity;
    const newShow = await this.showsService.create(show);
    res.send(newShow);
  }

  public update = async (req: Request, res: Response) => {
    const show = req['body'] as ShowEntity;
    const id =  req['params']['id'];
    
    res.send(this.showsService.update(show, Number(id)));
  }

  public delete = async (req: Request, res: Response) => {
    const id =  req['params']['id'];
    res.send(this.showsService.delete(Number(id)));
  } 

  /**
   * Configure the routes of controller
   */
  public routes(){
    this.router.get('/', this.index);
    this.router.get('/:id', this.findById);
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}