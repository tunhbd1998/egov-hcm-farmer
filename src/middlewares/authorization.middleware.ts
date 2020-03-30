import * as passport from "passport";
import { isEmpty } from "lodash";
import commons from "../commons";

export const authorizationMiddleware = async (
  req,
  res,
  next
): Promise<void> => {
  passport.authenticate(
    "authorization",
    { session: false },
    (err, authInfo) => {
      if (err) {
        console.log("authorizationMiddleware:error:", err);
        return commons.responses.replyServerErrorRes(res);
      }

      if (isEmpty(authInfo)) {
        return commons.responses.replyUnauthorizatedRes(res);
      }

      console.log("auth info", authInfo);
      req.authInfo = authInfo;
      next();
    }
  )(req, res, next);
};
