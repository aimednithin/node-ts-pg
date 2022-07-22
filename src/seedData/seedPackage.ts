import { getConnection, createConnection } from "typeorm"
import packages from "./packages"
import shows from "./shows"

import { NetworkRepository } from "../repository/network.repository"
import { PackageRepository } from "../repository/packages.repository"
import { ShowRepository } from "../repository/shows.repository"


createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "postgres",
    entities: ["build/database/entities/**/*.js"],
    synchronize: true,
    name: "shows"
}).then(async () => {

    const networkRepository = getConnection("shows").getCustomRepository(NetworkRepository);
    const packageRepository = getConnection("shows").getCustomRepository(PackageRepository);
    const showRepository = getConnection("shows").getCustomRepository(ShowRepository);

   
    console.log("******** packages ***********")

    await Promise.all(packages.map(async (pckg) => {
        console.log("----package--", pckg.name)

        const pckgeRecord = await packageRepository.findOne({
            where: { name: pckg.name },
            relations: ["networks"]
        })
        console.log("----package- found--", pckgeRecord)

        if (!pckgeRecord) {

            const networks = await Promise.all(pckg?.networks.map(async (n) => {
                let networkRecord = await networkRepository.findOne({
                    title: n
                })
                console.log("----networkRecord- found-", n, networkRecord)
                if (!networkRecord) {
                    const newNetwork = {
                        title: n
                    }
                    networkRecord = await networkRepository.save(newNetwork)
                    console.log("----networkRecord- create-", networkRecord)
                }
                return networkRecord
            }))

            const record = {
                ...pckg,
                networks
            }
            console.log("---p", record)

            const p = await packageRepository.save(record)
            console.log("----package- creat-", p)
        }

    }))






})




