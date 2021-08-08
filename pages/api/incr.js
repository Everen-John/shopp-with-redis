import Redis from "ioredis";
import connect from "../../lib/redis/connect";

let redis = new Redis(process.env.REDIS_URL);

export default async (req, res) => {
  const count = await redis.incr("counter");

  res.status(200).json({ count });
};
