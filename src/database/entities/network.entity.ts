import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
    OneToMany,
    OneToOne, JoinColumn
} from "typeorm";

import { PackageEntity as Package } from "./packages.entity"
import { ShowEntity as Show } from "./shows.entity"

@Entity()
export class NetworkEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn()
    title: string;

    // @OneToMany(() => Show, (show: Show) => show.network) 
    // @JoinColumn()
    // show!: Show

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}