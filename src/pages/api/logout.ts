import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader("Set-Cookie", "user=; Path=/; HttpOnly; Max-Age=0");
    res.status(200).json({ message: "Logged out" });
}
