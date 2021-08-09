import Redis from "ioredis";

export default async function getAllProducts() {
  let redis = new Redis(process.env.REDIS_URL);

  let productsData = [];
  let productSet = await redis.smembers("products");

  await Promise.all(
    productSet.map(async (item) => {
      let product = await redis.hgetall(item);
      productsData.push(product);
    })
  );
  console.log(productsData);

  redis.disconnect();

  return productsData;
}
