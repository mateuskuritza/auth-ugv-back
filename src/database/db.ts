import { DataSource } from "typeorm"
import { User } from "./entities/User"

export const db = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: [User],
    migrations: ["./migrations/"],
    subscribers: [],
})