import AssetDetailsScreen from "@/components/Dashboard/AssetDetailsScreen/AssetDetailsScreen";
import AmmpServices from "@/lib/services/ammp/AmmpServices";
import {verifyAuth} from "@/lib/auth/auth";
import {redirect} from "next/navigation";

export default async function AssetDetailsPage({ params }) {
    //authentication
    const result = await verifyAuth();

    if (!result.user) {
        return redirect('/')
    }
    const { slug } = params;
console.log('slug is >> ', slug);
    // Fetch asset data from your API or database using the slug
    const {access_token} = await AmmpServices().getAuthToken();
    const token = access_token;
    console.log('access_token 1: >>', token);

    const assetDetails = await AmmpServices().getAsset(token, slug);
    console.log('assetDetails is >> ', assetDetails);


    return (
        <div>
            <AssetDetailsScreen assetData={assetDetails} />
        </div>
    );
}
