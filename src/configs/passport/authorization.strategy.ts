import * as passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import db from "../../db";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "egov_hcm_farmer",
  ignoreExpiration: false
};

export const configAuthorizateStrategy = (): void => {
  passport.use(
    "authorization",
    new JwtStrategy(options, (payload, done) => {
      const { id, staff_id } = payload;

      db.table("staff")
        .where({ id: staff_id })
        .select("id", "name", "department_id", "position_id")
        .then(async rows => {
          const position = (
            await db
              .table("position")
              .where({ id: rows[0].position_id })
              .select("id", "name")
          )[0];
          const department = (
            await db
              .table("department")
              .where({ id: rows[0].department_id })
              .select("id", "name")
          )[0];
          done(null, {
            ...payload,
            staffInfo: {
              ...rows[0],
              position,
              department
            }
          });
        });
    })
  );
};
