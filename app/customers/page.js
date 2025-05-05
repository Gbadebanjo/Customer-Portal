import CustomersScreen from "@/components/Customers/CustomersScreen";
import {verifyAuth} from "@/lib/auth/auth";
import {redirect} from "next/navigation";
import nookies from "nookies";

export default async function Page(req) {
    //authentication
    const cookies = nookies.get({ req });
    const result = await verifyAuth(cookies);

    if (!result.user) {
        return redirect('/');
    }
    return (
        <div>
            <CustomersScreen/>
        </div>
    );
}

