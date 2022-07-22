import { Router, Response, Request } from "express";
import { NetworkEntity } from "../database/entities/network.entity";
import { NetworkService } from "../services/network.service"; // import service

export class NetworkController {
  public router: Router;
  private networkService: NetworkService;

  constructor() {
    this.networkService = new NetworkService(); // Create a new instance of PostController
    this.router = Router();
    this.routes();
  }

  public index = async (req: Request, res: Response) => {
    const networks = await this.networkService.index();
    res.send(networks).json();
  }

  public findById = async (req: Request, res: Response) => {
    const id = req['params']['id'];
    const networks = await this.networkService.findById(Number(id));
    res.send(networks).json();
  }

  public create = async (req: Request, res: Response) => {
    const post = req['body'] as NetworkEntity;
    const newPost = await this.networkService.create(post);
    res.send(newPost);
  }

  public update = async (req: Request, res: Response) => {
    const network = req['body'] as NetworkEntity;
    const id = req['params']['id'];

    res.send(this.networkService.update(network, Number(id)));
  }

  public delete = async (req: Request, res: Response) => {
    const id = req['params']['id'];
    res.send(this.networkService.delete(Number(id)));
  }

  /**
   * Configure the routes of controller
   */
  public routes() {
    this.router.get('/', this.index);
    this.router.get('/:id', this.findById);
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}