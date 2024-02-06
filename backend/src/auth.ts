import { User } from "./entities/User";

export type ContextType = {
  req: any;
  res: any;
  user?: User;
};

// file will be used to stock jwt token into cookies
