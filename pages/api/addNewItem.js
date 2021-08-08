import Redis from "ioredis";
import path from "path";
import fs from "fs";

export default async function addNewItem(req, res) {
  if (req.method === "POST") {
    let redis = new Redis(process.env.REDIS_URL);

    //PERFORM VALIDATION UP HERE

    const uploadFolder = path.join(__dirname, "public", "images");

    let data = JSON.parse(req.body);
    let productNumber = (await redis.scard("products")) + 1;
    if (data.itemImage) {
      await redis
        .multi()
        .hset(
          `product:${productNumber}`,
          "id",
          `${productNumber}`,
          "name",
          `${data.itemName}`,
          "description",
          `${data.itemDescription}`,
          "price",
          `${data.itemPrice}`
        )
        .sadd("products", `product:${productNumber}`)
        .exec();
    } else {
      await redis
        .multi()
        .hset(
          `product:${productNumber}`,
          "id",
          `${productNumber}`,
          "name",
          `${data.itemName}`,
          "description",
          `${data.itemDescription}`,
          "price",
          `${data.itemPrice}`,
          "imagePath",
          `${data.itemImage}`
        )
        .sadd("products", `product:${productNumber}`)
        .exec();
    }

    redis.disconnect();

    res.status(200).json({ msg: "Added These Data:", ...data });
  }
}
