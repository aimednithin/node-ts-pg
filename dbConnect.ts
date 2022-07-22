import { createConnection } from "typeorm";

export default async () => {
    await createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "root",
        database: "postgres",
        entities: ["build/database/entities/**/*.js"],
        synchronize: true,
        name: "shows"
    })
}