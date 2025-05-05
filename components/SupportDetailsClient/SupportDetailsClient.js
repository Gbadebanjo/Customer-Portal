'use client'
import classes from './SupportDetailsClient.module.css';
import {useEffect, useState} from "react";
import getSupportQueryById from "@/lib/controllers/supportQuery/getSupportQueryById";
import AddSupportQuery from "@/lib/controllers/supportQuery/AddSupportQuery";
import {normalizeString} from "@/utils/constants";
import {ButtonSaveSubmit} from "@/components/ui/ButtonSaveAndSubmit/ButtonSaveAndSubmit";
import NewTagButton from "@/components/ui/tags/NewTagButton";
import ActiveTagButton from "@/components/ui/tags/ActiveTagButton";
import ResolvedTagButton from "@/components/ui/tags/ResolvedTagButton";
import ReopenedTagButton from "@/components/ui/tags/ReopenedTagButton";

export default function SupportDetailsClient({support_id, allSupportQueryStatuses}) {
    const [selectedSupportCategory, setSelectedSupportCategory] = useState(""); // State to hold the selected category
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [existingSupportQueryObject, setExistingSupportQueryObject] = useState(null);
    const [statId, setStatId] = useState(null);
    const date = new Date();
    const thisYear = date.getFullYear();

    useEffect(() => {
        const fetchSupportQuery = async () => {
            try {
                const supportQuery = await getSupportQueryById(support_id);
                if (supportQuery) {
                    // alert(JSON.stringify(supportQuery));
                    const {title, description, support_query_messages, status_id, category_id} = supportQuery.supportQuery;
                    setTitle(title);
                    setDescription(description);
                    setSelectedSupportCategory(category_id);
                    setStatId(status_id);
                    setExistingSupportQueryObject(supportQuery);
                } else {
                    console.error('No support query found');
                }
            } catch (error) {
                console.error('Error fetching support query:', error);
            }
        };

        fetchSupportQuery();
    }, [support_id]);

    function getSupportStatusById(status_id) {
       // alert("getSupportStatusById received status_id:"+ JSON.stringify(status_id)); // Add this line
        let output='';
        const statusObject = allSupportQueryStatuses.find(status => status.id === status_id);
        if (statusObject) {
            output = normalizeString(statusObject.name);

            switch (output) {
                case 'New':
                    return <NewTagButton />;
                case 'Active':
                    return <ActiveTagButton />;
                case 'Resolved':
                    return <ResolvedTagButton />;
                case 'Reopened':
                    return <ReopenedTagButton />;
                default:
                    return null;
            }

        } else {
            return "";
        }
    }


    return (
        <div className={classes.centerContent}>
            {/*Content*/}
            <div className={classes.title}>
                {title}
            </div>
            <div className={classes.leftTop}>
                <h2 className={classes.blueTitle}>Send Message</h2>
            </div>
            <div className={classes.rightTop}>
                <h2 className={classes.blueTitle}>History</h2>
            </div>
            <div className={classes.leftBottom}>
                <div className={classes.flex}>
                    <div>status</div>
                    <p>{getSupportStatusById(statId)}</p>

                    <p> email</p>

                </div>
                <div className="py-4">
                    <form method="dialog" action={AddSupportQuery}>
                        <div aria-labelledby="create-customerer-modal-tabs_0-tab" id="create-user-modal-tabs_0"
                             role="tabpanel">
                            <div>
                                <label className="form-control w-full"
                                       style={{marginBottom: '20px', maxWidth: '133%'}}>
                                    <div>
                                        <span className="label-text">Category</span>
                                    </div>
                                    <select
                                        className="select select-bordered w-full"
                                        name="supportCategory"
                                        value={selectedSupportCategory}
                                        onChange={(e) => setSelectedSupportCategory(e.target.value)}
                                        required
                                    >
                                        <option disabled value="">Select a category</option>
                                        {[].map(category => (
                                            <option key={category.id}
                                                    value={category.id}>{normalizeString(category.name)}</option>
                                        ))}
                                    </select>
                                </label>
                                <label className="form-control w-full"
                                       style={{marginBottom: '20px', maxWidth: '133%'}}>
                                    <div className="label">
                                        <span className="label-text">Title</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="input input-bordered input-md w-full"
                                        id="title"
                                        max="16"
                                        name="title"
                                        value={title}
                                        required
                                        onChange={(e) => setTitle(e.target.value)}
                                        style={{backgroundColor: '#123751', borderColor: '#23262a'}}
                                    />
                                </label>
                                <label className="form-control w-full"
                                       style={{
                                           marginBottom: '20px',
                                           maxWidth: '133%'
                                       }}>
                                    <div className="label">
                                        <span className="label-text">Description</span>
                                    </div>
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        id="description"
                                        name="description"
                                        value={description}
                                        required
                                        onChange={(e) => setDescription(e.target.value)}
                                        style={{
                                            backgroundColor: '#123751',
                                            borderColor: '#23262a'
                                        }}
                                    />
                                </label>
                            </div>
                            <div className="modal-action">
                                <div className={classes.buttonContainer}>
                                    <div style={{marginLeft: 5}}>
                                        <ButtonSaveSubmit onClick={'#'}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className={classes.rightBottom}>
                Right Bottom
            </div>
        </div>
    );
}
