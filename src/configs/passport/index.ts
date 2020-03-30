import * as passport from "passport";
import { configSignInStrategy } from "./sign-in.strategy";
import { configAuthorizateStrategy } from "./authorization.strategy";

export const configPassport = (app): void => {
  if (!app) {
    return;
  }

  app.use(passport.initialize());
  configSignInStrategy();
  configAuthorizateStrategy();
};
