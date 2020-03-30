enum HTTP_CODE {
  INTERNAL_ERROR = 500,
  BAD_REQUEST = 400,
  OK = 200,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNAUTHORIZATED = 401
}
export const replyServerErrorRes = (res: any) => {
  res
    .status(HTTP_CODE.INTERNAL_ERROR)
    .send("Server Error")
    .end();
};

export const replyBadRequestRes = (res: any) => {
  res
    .status(HTTP_CODE.BAD_REQUEST)
    .send("Bad Request")
    .end();
};

export const replyForbiddenRes = (res: any) => {
  res
    .status(HTTP_CODE.FORBIDDEN)
    .send("Forbidden")
    .end();
};

export const replyNotFoundRes = (res: any) => {
  res
    .status(HTTP_CODE.NOT_FOUND)
    .send("Not Found")
    .end();
};

export const replyUnauthorizatedRes = (res: any) => {
  res
    .status(HTTP_CODE.UNAUTHORIZATED)
    .send("Unauthorizated")
    .end();
};

export const replyOKRes = (res: any, dataObj: any) => {
  res
    .status(HTTP_CODE.OK)
    .json(dataObj || {})
    .end();
};
