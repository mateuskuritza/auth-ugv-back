import { DataSource } from "typeorm"

const db = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: ['src/database/entities/*'],
    migrations: ["src/database/migrations/*"],
    subscribers: [],
})

export default db