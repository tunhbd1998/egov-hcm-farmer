import * as passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import db from "../../db";

export const configSignInStrategy = (): void => {
  passport.use(
    "sign-in",
    new LocalStrategy(
      { session: false },
      (username: string, password: string, done: Function): void => {
        db.table("user")
          .where({ username, password })
          .select("id", "staff_id")
          .then(rows => {
            done(null, rows[0]);
          })
          .catch(err => {
            done(err, null);
          });
      }
    )
  );
};
