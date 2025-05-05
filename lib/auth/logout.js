import {destroySession} from "@/lib/auth/auth";
import {redirect} from "next/navigation";

export default async function logout(req, res) {
    try {
        await destroySession(req);
        console.log( 'Logged out successfully');
        redirect('/')
    } catch (error) {
        res.status(500).json({ error: 'Failed to log out' });
    }
}
