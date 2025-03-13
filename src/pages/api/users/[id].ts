import { NextApiRequest, NextApiResponse } from "next";
import { getUserById, updateUser, deleteUser } from "@/services/userServices";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query as { id: string };

    if (!id) {
        return res.status(400).json({ message: "User ID is required" });
    }

    if (req.method === "GET") {
        try {
            const user = await getUserById(id);
            if (user) {
                return res.status(200).json(user);
            } else {
                return res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.error("Failed to fetch user:", error);
            return res.status(500).json({ message: "Failed to fetch user" });
        }
    }

    else if (req.method === "PUT") {
        try {
            const updatedUser = await updateUser(id, req.body);
            return res.status(200).json({ message: "User updated", updatedUser });
        } catch (error) {
            console.error("Failed to update user:", error);
            return res.status(500).json({ message: "Failed to update user" });
        }
    }

    else if (req.method === "DELETE") {
        try {
            await deleteUser(id);
            return res.status(200).json({ message: "User deleted" });
        } catch (error) {
            console.error("Failed to delete user:", error);
            return res.status(500).json({ message: "Failed to delete user" });
        }
    }

    else {
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
