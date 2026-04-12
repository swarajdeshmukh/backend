import "dotenv/config";


if (!process.env.PORT) {
  throw new Error("PORT is not define in environment variables");
}

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not define in environment variables");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not define in environment variables");
}

export const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};
