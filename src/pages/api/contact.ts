import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.status(405).json({ message: "Method Not Allowed" });
        return;
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        res.status(400).json({ message: "Missing required fields." });
        return;
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.RECEIVER_EMAIL,
            subject: `New message from ${name}`,
            html: `
        <p><strong>Sender:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
        });

        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Email error:", error);
        res.status(500).json({ message: "Error sending email." });
    }
}
