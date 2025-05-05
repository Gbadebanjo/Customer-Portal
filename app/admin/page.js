import AdminScreen from "@/components/admin/AdminScreen";
import {verifyAuth} from "@/lib/auth/auth";
import {redirect} from "next/navigation";
import nookies from "nookies";

async function AdminPortalPage(req) {
    //authentication
    const cookies = nookies.get({ req });
    const result = await verifyAuth(cookies);

    if (!result.user) {
        return redirect('/');
    }
    return (
        <div>
            <AdminScreen/>
        </div>
    );
}

export default AdminPortalPage;