import express from "express";
import { readFileSync } from "fs";

const app = express();
const port = 5000;

const data = JSON.parse(readFileSync("./division.json").toString())[0][
  "districts"
];

app.get("/api/v1/province", (req, res) => {
  const district = req.query.district.toLowerCase();
  let result;

  if (!district) {
    result = data.map((dis) => dis.name);
  } else {
    const districtFound = data.find((dis) => dis.name === district);
    if (!districtFound) {
      return res.status(400).json({ message: "District not found" });
    }
    result = districtFound["wards"].map((ward) => ward.name);
  }

  res.status(200).json({ data: result });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
