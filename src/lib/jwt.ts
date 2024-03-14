import jwt from "jsonwebtoken"

export const createToken = (payload: string | object | Buffer) => {
    return jwt.sign(payload, process.env.SECRET || "mysecret", { expiresIn: "1h" })
}