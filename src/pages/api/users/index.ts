import { NextApiRequest, NextApiResponse } from "next";
import { addUser, getAllUsers } from "@/services/userServices";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            const users = await getAllUsers();
            res.status(200).json(users);
            break;

        case "POST":
            await addUser(req.body);
            res.status(201).json({ message: "User created" });
            break;

        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
