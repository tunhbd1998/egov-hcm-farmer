import * as express from "express";
import { join } from "path";
import {
  configBodyParser,
  configApis,
  configPassport,
  configGlobalMiddlewares,
  configCors,
  initAppContext
} from "./configs";
import prepare from "./prepare";

const app = express();

app.use(express.static(join(__dirname, "../public")));
initAppContext(app);
configBodyParser(app);
configCors(app);
configPassport(app);
configGlobalMiddlewares(app);
configApis(app);

const { port } = app.locals.context;

app.listen(port, () => {
  // prepare();
  console.log("Server is running on port", port);
});
