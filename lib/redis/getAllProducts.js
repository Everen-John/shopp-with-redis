import Redis from "ioredis";

export default async function getAllProducts() {
  let redis = new Redis(process.env.REDIS_URL);

  let productSet = await redis.smembers("products");
  console.log(productSet);
  let productsData = [];
  //   productSet.map((item) => {
  //     product = redis.hget(item);
  //     productsData.push(product);
  //   });
  await Promise.all(
    productSet.map(async (item) => {
      console.log(item);
      let product = await redis.hgetall(item);
      productsData.push(product);
    })
  );
  console.log(productsData);

  redis.disconnect();

  return productsData;
}
