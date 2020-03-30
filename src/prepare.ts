import db from "./db";

export default async function prepare() {
  await db.table("document").delete();
  await db.table("user").delete();
  await db.table("staff").delete();
  await db.table("position").delete();
  await db.table("department").delete();
  await db.table("domain").delete();
  await db.table("document_type").delete();
  await db.table("security_level").delete();
  await db.table("urgency").delete();
  await db.table("process_method").delete();

  const positions = await db.table("position").insert(
    [
      {
        ["name"]: "Truong phong ban"
      },
      {
        ["name"]: "Nhan vien tiep nhan ho so"
      },
      {
        ["name"]: "Nhan vien phong ban"
      }
    ],
    ["id", "name"]
  );

  console.log("positions", positions);

  const ptn = (
    await db.table("department").insert(
      {
        ["name"]: "Phong tiep nhan"
      },
      "*"
    )
  )[0];
  const nvPtn = (
    await db.table("staff").insert(
      {
        ["name"]: "Tiep nhan ABC",
        ["department_id"]: ptn["id"],
        ["position_id"]: positions[1].id
      },
      "*"
    )
  )[0];

  const depA = (
    await db.table("department").insert(
      {
        ["name"]: "department A"
      },
      ["id"]
    )
  )[0];
  console.log("department", depA);

  const tpA = (
    await db.table("staff").insert(
      {
        ["name"]: "nguyen van a",
        ["department_id"]: depA["id"],
        ["position_id"]: positions[0].id
      },
      "*"
    )
  )[0];
  const nvPA = (
    await db.table("staff").insert(
      {
        ["name"]: "nguyen van b",
        ["department_id"]: depA["id"],
        ["position_id"]: positions[2].id
      },
      "*"
    )
  )[0];

  const uNvPtn = (
    await db.table("user").insert(
      {
        ["username"]: "nvptn",
        ["password"]: "nvptn",
        ["staff_id"]: nvPtn.id
      },
      "*"
    )
  )[0];
  const uTpA = (
    await db.table("user").insert(
      {
        ["username"]: "tpa",
        ["password"]: "tpa",
        ["staff_id"]: tpA.id
      },
      "*"
    )
  )[0];
  const uNvPA = (
    await db.table("user").insert(
      {
        ["username"]: "nvpa",
        ["password"]: "nvpa",
        ["staff_id"]: nvPA.id
      },
      "*"
    )
  )[0];
}
