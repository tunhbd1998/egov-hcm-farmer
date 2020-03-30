import passport = require("passport");
import { isEmpty } from "lodash";
import * as jwt from "jsonwebtoken";
import {
  authorizationMiddleware,
  uploadFileMiddleware
} from "../../middlewares";
import commons from "../../commons";
import db from "../../db";

enum ROLE {
  NV_TIEP_NHAN = "nv-tiep-nhan",
  TRUONG_PHONG_BAN = "truong-phong-ban",
  NHAN_VIEN_PHONG_BAN = "nhan-vien-phong-ban"
}

const detectRole = (authInfo: any): ROLE => {
  return ROLE.NV_TIEP_NHAN;
};

export const configApis = (app): void => {
  if (!app) {
    return;
  }

  app.post("/auth/sign-in", (req, res) => {
    passport.authenticate("sign-in", { session: false }, (err, data) => {
      if (err) {
        return commons.responses.replyServerErrorRes(res);
      }

      if (isEmpty(data)) {
        return commons.responses.replyOKRes(res, { token: null });
      }

      commons.responses.replyOKRes(res, {
        token: jwt.sign(data, "egov_hcm_farmer")
      });
    })(req, res);
  });

  app.get("/security-levels", authorizationMiddleware, (req, res) => {
    db.table("security_level")
      .select("*")
      .then(rows => {
        commons.responses.replyOKRes(res, rows);
      })
      .catch(err => {
        commons.responses.replyServerErrorRes(res);
      });
  });

  app.get("/domains", authorizationMiddleware, (req, res) => {
    db.table("domain")
      .select("*")
      .then(rows => {
        commons.responses.replyOKRes(res, rows);
      })
      .catch(err => {
        commons.responses.replyServerErrorRes(res);
      });
  });

  app.get("/urgencies", authorizationMiddleware, (req, res) => {
    db.table("urgency")
      .select("*")
      .then(rows => {
        commons.responses.replyOKRes(res, rows);
      })
      .catch(err => {
        commons.responses.replyServerErrorRes(res);
      });
  });

  app.get("/document-types", authorizationMiddleware, (req, res) => {
    db.table("document_type")
      .select("*")
      .then(rows => {
        commons.responses.replyOKRes(res, rows);
      })
      .catch(err => {
        commons.responses.replyServerErrorRes(res);
      });
  });

  app.get("/process-methods", authorizationMiddleware, (req, res) => {
    db.table("process_method")
      .select("*")
      .then(rows => {
        commons.responses.replyOKRes(res, rows);
      })
      .catch(err => {
        commons.responses.replyServerErrorRes(res);
      });
  });

  app.get("/documents", authorizationMiddleware, async (req, res) => {
    const { authInfo } = req;

    if (detectRole(authInfo) === ROLE.NV_TIEP_NHAN) {
      return commons.responses.replyOKRes(
        res,
        await db.table("document").select("*")
      );
    }

    if (detectRole(authInfo) === ROLE.TRUONG_PHONG_BAN) {
      return commons.responses.replyOKRes(
        res,
        await db.table("document").select("*")
      );
    }

    if (detectRole(authInfo) === ROLE.NHAN_VIEN_PHONG_BAN) {
      return commons.responses.replyOKRes(
        res,
        await db.table("document").select("*")
      );
    }
  });

  app.post("/documents", authorizationMiddleware, async (req, res) => {
    const {
      docId,
      title,
      documentTypeId,
      securityLevelId,
      urgencyId,
      files,
      processMethodId,
      domainId,
      abstract
    } = req.body;
    const { authInfo } = req;

    const document = (
      await db.table("document").insert(
        {
          title,
          abstract,
          ["doc_id"]: docId,
          ["domain_id"]: domainId,
          ["document_type_id"]: documentTypeId,
          ["process_method_id"]: processMethodId,
          ["security_level_id"]: securityLevelId,
          ["urgency_id"]: urgencyId,
          ["creator_id"]: authInfo.staff.id
        },
        "*"
      )
    )[0];

    const documentFiles = await db.table("document_file").insert(
      files.map(file => ({
        url: file.fileUrl,
        ["file_name"]: file.filename,
        ["document_id"]: document.id
      })),
      "*"
    );

    commons.responses.replyOKRes(res, { ...document, files: documentFiles });
  });

  app.get("/documents/:id", authorizationMiddleware, (req, res) => {
    const { id } = req.params;

    db.table("document")
      .where({ id })
      .select("*")
      .then(rows => {
        commons.responses.replyOKRes(res, rows[0]);
      })
      .catch(err => {
        commons.responses.replyServerErrorRes(res);
      });
  });

  app.post(
    "/documents/:id/assign-department",
    authorizationMiddleware,
    (req, res) => {
      const { id } = req.params;
      const { departmentId, comment, files } = req.body;
    }
  );

  app.post(
    "/documents/:id/assign-staff",
    authorizationMiddleware,
    (req, res) => {
      const { id } = req.params;
      const { staffId, comment, files } = req.body;
    }
  );

  app.post("/documents/:id/resolve", authorizationMiddleware, (req, res) => {
    const { id } = req.params;
    const { staffId, comment, files } = req.body;
  });

  app.get("/departments", authorizationMiddleware, (req, res) => {
    db.table("department")
      .select("*")
      .then(rows => {
        commons.responses.replyOKRes(res, rows);
      })
      .catch(err => {
        commons.responses.replyServerErrorRes(res);
      });
  });

  app.get(
    "/departments/:id/staffs",
    authorizationMiddleware,
    async (req, res) => {
      const { id } = req.params;

      db.table("staff")
        .where({
          ["department_id"]: id
        })
        .select("*")
        .then(rows => {
          commons.responses.replyOKRes(res, rows);
        })
        .catch(err => {
          commons.responses.replyServerErrorRes(res);
        });
    }
  );

  app.post("/files", uploadFileMiddleware.single("file"), (req, res) => {
    commons.responses.replyOKRes(res, req.fileUpload);
  });
};
