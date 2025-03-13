import { NextApiRequest, NextApiResponse } from "next";
import { getAllUsers, addUser } from "@/services/userServices";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const users = await getAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            console.error("Failed to fetch users:", error);
            return res.status(500).json({ message: "Failed to fetch users" });
        }
    }

    else if (req.method === "POST") {
        try {
            const newUser = await addUser(req.body);
            return res.status(201).json({ message: "User created", newUser });
        } catch (error) {
            console.error("Failed to create user:", error);
            return res.status(500).json({ message: "Failed to create user" });
        }
    }

    else {
        res.setHeader("Allow", ["GET", "POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
