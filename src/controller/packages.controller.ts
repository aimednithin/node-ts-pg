import { Router, Response, Request } from "express";
import { PackageEntity } from "../database/entities/packages.entity";
import { PackageService } from "../services/packages.service"; // import service

export class PackageController {
  public router: Router;
  private packageService: PackageService;

  constructor() {
    this.packageService = new PackageService(); // Create a new instance of PostController
    this.router = Router();
    this.routes();
  }

  public index = async (req: Request, res: Response) => {
    const packages = await this.packageService.index();
    res.send(packages).json();
  }

  public findById = async (req: Request, res: Response) => {
    const id = req['params']['id'];
    const packages = await this.packageService.findById(Number(id));
    res.send(packages).json();
  }

  public create = async (req: Request, res: Response) => {
    const packages = req['body'] as PackageEntity;
    const newPackage = await this.packageService.create(packages);
    res.send(newPackage);
  }

  public update = async (req: Request, res: Response) => {
    const post = req['body'] as PackageEntity;
    const id = req['params']['id'];

    res.send(this.packageService.update(post, Number(id)));
  }

  public delete = async (req: Request, res: Response) => {
    const id = req['params']['id'];
    res.send(this.packageService.delete(Number(id)));
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