const Redis = require("ioredis");

let redis = new Redis(
  "rediss://:547764a4c1ba4db4b4374be69757ed65@apn1-intense-ewe-30867.upstash.io:30867"
);

// export default async (req, res) => {
//     const count = await redis.incr('counter')
//     res.status(200).json({ count })
//   }

const seedProducts = async () => {
  let seed_product = await redis
    .multi()
    .hset(
      "product:1",
      "id",
      "1",
      "name",
      "Shopping Bag",
      "description",
      "A 10 inch foldable shopping bag you can bring wherever you go!",
      "price",
      "RM10.00",
      "imagePath",
      "images/shoppingBag.jpg"
    )
    .hset(
      "product:2",
      "id",
      "2",
      "name",
      "Slipper",
      "description",
      "Slipper of Size 41.",
      "price",
      "RM5.00",
      "imagePath",
      "images/slipper.jpg"
    )
    .hset(
      "product:3",
      "id",
      "3",
      "name",
      "Water Bottle",
      "description",
      "1.5 Liter water bottle",
      "price",
      "RM35.00",
      "imagePath",
      "images/bottle.jpg"
    )
    .hset(
      "product:4",
      "id",
      "4",
      "name",
      "Maggi Asam Laksa",
      "description",
      "Maggi Asam Laksa",
      "price",
      "RM5.20",
      "imagePath",
      "images/maggiAsamLaksa.jpg"
    )
    .hset(
      "product:5",
      "id",
      "5",
      "name",
      "Logitech G103 Mouse",
      "description",
      "A Logitech G103 Mouse",
      "price",
      "RM89.00",
      "imagePath",
      "images/mouse.jpg"
    )
    .sadd(
      "products",
      "product:1",
      "product:2",
      "product:3",
      "product:4",
      "product:5"
    )
    .exec();

  console.log(seed_product);

  redis.disconnect();
};

const getProducts = async () => {
  await redis
    .smembers("products")
    .then((getProducts) => console.log(getProducts));
};
getProducts();
// seedProducts();
