import AuditLogsScreen from "@/components/AuditLogs/AuditLogsScreen";
import {verifyAuth} from "@/lib/auth/auth";
import {redirect} from "next/navigation";
import nookies from "nookies";

export default async function Profile(req) {
    //authentication
    const cookies = nookies.get({ req });
    const result = await verifyAuth(cookies);

    if (!result.user) {
        return redirect('/');
    }
    return (
        <div>
            <AuditLogsScreen/>
        </div>
    );
}

