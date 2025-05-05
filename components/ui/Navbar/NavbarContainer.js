import nookies from 'nookies';
import { verifyAuth } from '@/lib/auth/auth';
import Navbar from "@/components/ui/Navbar/Navbar";
import {redirect} from "next/navigation";
import getUserById from "@/lib/controllers/users/getUserById";

export default async function NavbarComponent() {
    const cookies = nookies.get();
    const result = await verifyAuth(cookies);
    if (!result.user) {
        // Redirect logic if not authenticated
        redirect('/');
    }
    const id = result.user.id;

    const user = await getUserById(id)
    // console.log('before nav user');
    // console.log(JSON.stringify(user));
    // console.log('after nav user');


    return <Navbar user={user.user.username} />;
}
