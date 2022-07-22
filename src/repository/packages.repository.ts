import { EntityRepository, Repository } from "typeorm";
import { PackageEntity } from "../database/entities/packages.entity";

@EntityRepository(PackageEntity)
export class PackageRepository extends Repository<PackageEntity> {

}