import Redis from "ioredis";

export default async function addToCart(req, res) {
  if (req.method === "GET") {
    let redis = new Redis(process.env.REDIS_URL);

    //Get List of Items's Number
    let responseData = await redis.lrange("cartItems", "-999", "999");

    //Get List of Item's data
    let productArray = [];

    const response = await Promise.all(
      responseData.map(async (item) => {
        let data = await redis.hgetall(`product:${item}`);
        productArray.push(data);
      })
    );
    redis.disconnect();

    res.status(200).json(productArray);
  }
}
