export const initAppContext = app => {
  if (!app) {
    return;
  }

  if (!app.locals) {
    app.locals = {};
  }

  if (!app.locals.context) {
    app.locals.context = {};
  }

  app.locals.context = {
    port: process.env.PORT,
    host: process.env.HOST
  };
};
