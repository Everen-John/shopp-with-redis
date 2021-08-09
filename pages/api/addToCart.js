import Redis from "ioredis";

export default async function addToCart(req, res) {
  if (req.method === "POST") {
    let redis = new Redis(process.env.REDIS_URL);
    let productNo = JSON.parse(req.body);
    let responseData = await redis
      .multi()
      .rpush("userCartItems", productNo)
      .lrange("userCartItems", "-999", "999")
      .exec();

    redis.disconnect();
    let responseDataFiltered = responseData[1][1];
    console.log(responseDataFiltered);

    res.status(200).json({ responseDataFiltered });
  }
}
