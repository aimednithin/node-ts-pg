import { getConnection, getRepository } from 'typeorm';
import { NetworkEntity } from '../database/entities/network.entity';
import { NetworkRepository } from '../repository/network.repository';

export class NetworkService {
  private NetworkRepository: NetworkRepository;

  constructor() {
    this.NetworkRepository = getConnection("shows").getCustomRepository(NetworkRepository);
  }

  public index = async () => {
    const networks = await this.NetworkRepository.find()
    return networks;
  }

  public findById = async (id: number) => {
    const networks = await this.NetworkRepository.findOne(id)
    return networks;
  }


  public create = async (network: NetworkEntity) => {
    const newNetwork = await this.NetworkRepository.save(network);
    return newNetwork;
  }

  public update = async (network: NetworkEntity, id: number) => {
    const updatedNetwork = await this.NetworkRepository.update(id, network);
    return updatedNetwork;
  }

  public delete = async (id: number) => {
    const deletedPost = await this.NetworkRepository.delete(id);
    return deletedPost;
  }
}