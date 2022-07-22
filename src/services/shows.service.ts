import { getConnection, getRepository } from 'typeorm';
import { ShowEntity } from '../database/entities/shows.entity';
import { ShowRepository } from '../repository/shows.repository';

import { PackageService } from "./packages.service"

export class ShowsService {
  private showRepository: ShowRepository;
  private packageService: PackageService;

  constructor() {
    this.showRepository = getConnection("shows").getCustomRepository(ShowRepository);
    this.packageService = new PackageService()
    // this.showRepository = getRepository(ShowEntity);
  }

  public index = async (query: any = {}) => {
    const { network_id, package_id, rest } = query;

    let shows = await this.showRepository.find({
      // where: query,
      relations: ["network"]
    })

    if (network_id) {
      shows = shows.filter(p => p.network.id === Number(network_id))
    }

    if (package_id) {
      const packages = await this.packageService.index();

      shows.filter(s => {
        return packages.some(p => p.networks.some(n => n.id === s.network.id))
      })

    }

    return shows;
  }

  public create = async (show: ShowEntity) => {
    const newShow = await this.showRepository.save(show);
    return newShow;
  }

  public findById = async (by: any) => {
    const shows = await this.showRepository.findOne(by)
    return shows;
  }

  public update = async (show: ShowEntity, id: number) => {
    const updatedPost = await this.showRepository.update(id, show);
    return updatedPost;
  }

  public delete = async (id: number) => {
    const deletedPost = await this.showRepository.delete(id);
    return deletedPost;
  }
}