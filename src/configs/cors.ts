import * as cors from "cors";

export function configCors(app) {
  app.use(cors());
}
