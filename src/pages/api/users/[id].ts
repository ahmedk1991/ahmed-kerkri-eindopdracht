import { NextApiRequest, NextApiResponse } from "next";
import { getUserById, updateUser, deleteUser } from "@/services/userServices";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query as { id: string };

    switch (req.method) {
        case "GET":
            const user = await getUserById(id);
            res.status(200).json(user);
            break;

        case "PUT":
            await updateUser(id, req.body);
            res.status(200).json({ message: "User updated" });
            break;

        case "DELETE":
            await deleteUser(id);
            res.status(200).json({ message: "User deleted" });
            break;

        default:
            res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
