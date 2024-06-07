import jwt from 'jsonwebtoken';
import config from '../../config';
import { JwtPayload } from '../models/interfaces/jwt-payload.interface';


export function createToken(payload: JwtPayload): string {
  return jwt.sign(
    payload,
    config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  });
}
