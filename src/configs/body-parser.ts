import * as bodyParser from "body-parser";

export const configBodyParser = (app): void => {
  if (!app) {
    return;
  }

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
};
