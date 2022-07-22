import { getConnection, createConnection } from "typeorm"
import packages from "./packages"
import shows from "./shows"
import dbConnect from "../../dbConnect"

import { NetworkRepository } from "../repository/network.repository"
import { PackageRepository } from "../repository/packages.repository"
import { ShowRepository } from "../repository/shows.repository"

dbConnect().then(async () => {

    const networkRepository = getConnection("shows").getCustomRepository(NetworkRepository);
    const packageRepository = getConnection("shows").getCustomRepository(PackageRepository);
    const showRepository = getConnection("shows").getCustomRepository(ShowRepository);

    console.log("seeding shows \n")


    for (let i = 0; i < shows.length; i++) {
        const show = shows[i]

        let showRecord = await showRepository.findOne({
            title: show.title
        })

        if (showRecord === undefined) {

            let networkRecord = await networkRepository.findOne({
                title: show.network
            })

            if (networkRecord === undefined || !networkRecord) {
                networkRecord = await networkRepository.save({ title: show.network })
            }

            const record = { ...show, network: networkRecord }
            showRecord = await showRepository.save(record)
        }



    }

    console.log("seeding packages \n")

    await Promise.all(packages.map(async (pckg) => {
        const pckgeRecord = await packageRepository.findOne({
            where: { name: pckg.name },
            relations: ["networks"]
        })

        if (!pckgeRecord) {

            const networks = await Promise.all(pckg?.networks.map(async (n) => {
                let networkRecord = await networkRepository.findOne({
                    title: n
                })
                if (!networkRecord) {
                    const newNetwork = {
                        title: n
                    }
                    networkRecord = await networkRepository.save(newNetwork)
                }
                return networkRecord
            }))

            const record = {
                ...pckg,
                networks
            }

            await packageRepository.save(record)
        }

    }))


    console.log("seeding complete")

})




