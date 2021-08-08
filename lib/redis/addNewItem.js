import Redis from "ioredis";
import path from "path";
import fs from "fs";

export default async function addNewItem(req, res) {
  if (req.method === "POST") {
    let redis = new Redis(process.env.REDIS_URL);

    //PERFORM VALIDATION UP HERE

    const uploadFolder = path.join(__dirname, "public", "images");

    let data = req.body;

    let productNumber = await redis.scard("products");

    redis.disconnect();
    console.log(data);

    res.status(200).json({ msg: "ok" });
  }
}
