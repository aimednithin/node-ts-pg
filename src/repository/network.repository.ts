import { EntityRepository, Repository } from "typeorm";
import { NetworkEntity } from "../database/entities/network.entity";

@EntityRepository(NetworkEntity)
export class NetworkRepository extends Repository<NetworkEntity> {

}