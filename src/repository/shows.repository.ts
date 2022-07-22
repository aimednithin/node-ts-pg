import { EntityRepository, Repository } from "typeorm";
import { ShowEntity } from "../database/entities/shows.entity";

@EntityRepository(ShowEntity)
export class ShowRepository extends Repository<ShowEntity> {

}
