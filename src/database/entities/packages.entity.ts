import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,ManyToMany,
    JoinColumn, JoinTable,
    ManyToOne
} from "typeorm";
import { NetworkEntity as Network } from "./network.entity"

@Entity()
export class PackageEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column("float")
    price: number;


    // @ManyToOne(() => Network, network => network.packages)
    // @JoinTable()
    // networks!: Array<Network>;


    @ManyToMany(_type => Network)
    @JoinTable()
    networks!: Array<Network>

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}