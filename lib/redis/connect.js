import Redis from "ioredis";

export default function connect() {
  let redis = new Redis(process.env.REDIS_URL);
  return redis;
}
