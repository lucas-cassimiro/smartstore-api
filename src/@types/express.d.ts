import { userProps } from "../app/controllers/UsersController";

declare global {
  namespace Express {
    export interface Request {
      user: Partial<userProps>;
    }
  }
}
