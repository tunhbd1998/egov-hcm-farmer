import * as knex from "knex";

export default knex({
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    database: "egov_hcm_farmer",
    user: "admin",
    password: "admin"
  },
  debug: true
});
