
import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import { parse } from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
        const token = cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const decoded = verify(token, process.env.JWT_SECRET!);
        return res.status(200).json({ user: decoded });
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}
