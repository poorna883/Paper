import { Request } from "express"
export interface GetFile extends Request {
  file:object // or any other type
}