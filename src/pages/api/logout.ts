import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader(
        "Set-Cookie",
        "auth=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax"
    );
    res.status(200).json({ message: "Logged out" });
}
