import { NextApiRequest, NextApiResponse } from "next";
import { addUser, getAllUsers } from "@/services/userServices";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const users = await getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            console.error("Failed to fetch users:", error);
            res.status(500).json({ message: "Failed to fetch users" });
        }
    }
    else if (req.method === "POST") {
        try {
            await addUser(req.body);
            res.status(201).json({ message: "User created" });
        } catch (error) {
            console.error("Failed to create user:", error);
            res.status(500).json({ message: "Failed to create user" });
        }
    }
    else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}