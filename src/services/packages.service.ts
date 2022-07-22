import { getConnection, getRepository } from 'typeorm';
import { PackageEntity } from '../database/entities/packages.entity';
import { PackageRepository } from '../repository/packages.repository';

export class PackageService {
  private packageRepository: PackageRepository;

  constructor() {
    this.packageRepository = getConnection("shows").getCustomRepository(PackageRepository);
    // this.packageRepository = getRepository(PackageEntity);
  }

  public index = async () => {
    const packages = await this.packageRepository.find({
      relations: ["networks"]
    })
    return packages;
  }


  public findById = async (id: number) => {
    const packages = await this.packageRepository.findOne(id, { 
      relations: ["networks"],
     })
    return packages;
  }

  public create = async (packages: PackageEntity) => {
    const newPackage = await this.packageRepository.save(packages);
    return newPackage;
  }

  public update = async (packages: PackageEntity, id: number) => {
    const updatedPackage = await this.packageRepository.update(id, packages);
    return updatedPackage;
  }

  public delete = async (id: number) => {
    const deletedPost = await this.packageRepository.delete(id);
    return deletedPost;
  }
}