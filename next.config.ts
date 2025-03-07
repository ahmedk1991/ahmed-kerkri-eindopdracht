
import dotenv from "dotenv";

dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_DATABASE_URL: process.env.NEXT_PUBLIC_DATABASE_URL,
        STACK_SECRET_SERVER_KEY: process.env.STACK_SECRET_SERVER_KEY,
    },
};

export default nextConfig;
