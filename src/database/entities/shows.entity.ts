import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,ManyToOne,
    JoinColumn
} from "typeorm";

import { NetworkEntity as Network } from "./network.entity"

@Entity()
export class ShowEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("float")
    imdbRating: number;

    @ManyToOne(() => Network )
    network!: Network;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}