import { userProps } from "../controllers/UserController";

declare global {
  namespace Express {
    export interface Request {
      user: Partial<userProps>;
    }
  }
}
