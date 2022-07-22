import express, { Request, Response } from 'express';
import morgan from "morgan";

import { PackageController } from './controller/packages.controller';
import { NetworkController } from './controller/network.controller';
import { ShowsController } from './controller/shows.controller';

import dbConnect from '../dbConnect';


class Server {
  private packageController: PackageController;
  private networkController: NetworkController;
  private showsController: ShowsController;

  private app: express.Application;

  constructor() {
    this.app = express(); // init the application
    this.configuration();
    this.routes();
  }

  /**
   * Method to configure the server,
   * If we didn't configure the port into the environment 
   * variables it takes the default port 3000
   */
  public configuration() {
    this.app.set('port', process.env.PORT || 3001);
    this.app.use(express.json());
    this.app.use(morgan("dev"))
  }

  /**
   * Method to configure the routes
   */
  public async routes() {
    await dbConnect();

    this.packageController = new PackageController();
    this.networkController = new NetworkController();
    this.showsController = new ShowsController();

    this.app.get("/", (req: Request, res: Response) => {
      res.send("Hello world!");
    });
    

    this.app.use(`/networks/`, this.networkController.router);
    this.app.use(`/test/`, this.packageController.router )
    this.app.use(`/packages/`, this.packageController.router);
    this.app.use(`/shows/`, this.showsController.router);
  }

  /**
   * Used to start the server
   */
  public start() {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server is listening ${this.app.get('port')} port.`);
    });
  }
}

const server = new Server(); // Create server instance
server.start(); // Execute the server
