import "reflect-metadata"
import { setupServer } from "./server";
import { db } from "./database";


db.initialize().then(setupServer)