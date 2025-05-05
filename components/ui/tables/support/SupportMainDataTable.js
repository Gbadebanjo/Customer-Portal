'use client'
import {useEffect, useState} from 'react';
import classes from "./dataTable.module.css";
import ButtonFlexible from "@/components/ui/button-flexible/ButtonFlexible";
import SearchIcon from "@/components/ui/icons/SearchIcon";
import ChevronDownIcon from "@/components/ui/icons/ChevronDownIcon";
import SupportActions from "@/components/ui/modals/otherActions/SupportActions/SupportActions";
import {normalizeString} from "@/utils/constants";
import PaginationComponent from "@/components/ui/pagination/PaginationComponent";
import NoDataIcon from "@/components/ui/icons/NoDataIcon";
import NewTagButton from "@/components/ui/tags/NewTagButton";
import ReopenedTagButton from "@/components/ui/tags/ReopenedTagButton";
import ResolvedTagButton from "@/components/ui/tags/ResolvedTagButton";
import ActiveTagButton from "@/components/ui/tags/ActiveTagButton";

export default function SupportMainDataTable({
                                                 allSupportQueries,
                                                 allSupportQueryCategories,
                                                 allSupportQueryStatuses,
                                                 allCustomers
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredSupportQueries, setFilteredSupportQueries] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchClicked, setSearchClicked] = useState(false);
    const itemsPerPage = 5;
    const NO_OF_COLUMNS = 6;

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = currentPage * itemsPerPage;
        const slicedSupportQueries = allSupportQueries.slice(startIndex, endIndex);
        setFilteredSupportQueries(slicedSupportQueries);
    }, [allSupportQueries, currentPage]);

    const totalPages = Math.ceil(allSupportQueries.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    function getSupportCategoryById(category_id) {
        const categoryObject = allSupportQueryCategories.find(category => category.id === category_id);
        if (categoryObject) {
            return normalizeString(categoryObject.name);
        } else {
            return "";
        }
    }

    function getSupportStatusById(status_id) {
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

     function getACustomerById(customer_id) {
        const customerObject = allCustomers.find(customer => customer.id === customer_id);
        let output = '';
        if (customerObject) {
            output = customerObject.company_name;
        }
        return output;
    }

    useEffect(() => {
        if (searchClicked) { // Apply search filtering only if search button is clicked
            let filtered;
            filtered = allSupportQueries.filter(item =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredSupportQueries(filtered);
        }

    }, [allSupportQueries, searchTerm, searchClicked]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchClicked(true);
        // Trigger search functionality
        setSearchTerm(e.target.search.value);
    };

    return (
        <>
            {/*search area*/}
            <form onSubmit={handleSearch}>
                <div className={classes.searchArea}>
                    <div className={classes.searchTextInput}>
                        {/* input text 1 */}
                        <div>
                            <input
                                type="text"
                                className={classes.inputText}
                                placeholder="Search"
                                maxLength={256}
                                name="search"
                                id="search"
                            />
                        </div>
                    </div>
                    <div className={classes.searchButton}>
                        <ButtonFlexible
                            link="#"
                            width={50}
                            height={50}
                            style={{marginRight: 0}}
                            type="submit"
                        >
                            <SearchIcon/>
                        </ButtonFlexible>
                    </div>
                </div>
            </form>
            <div className={classes.filterText}>
                            <span>
                                <small>
                                    Advanced Filters
                                </small>
                            </span>
                <span>
                                <small>
                                    <ChevronDownIcon/>
                                </small>
                            </span>
            </div>
            {/*Content*/}
            <main className={classes.mainContent}>
                <main className="ml-5 mr-5 mt-5">
                    <table className="table table-bordered" style={{width: 700}}>
                        <thead>
                        <tr>
                            <th>
                                ACTIONS
                            </th>
                            <th>
                                CUSTOMER
                            </th>
                            <th>
                                CATEGORY
                            </th>
                            <th>
                                TITLE
                            </th>
                            <th>
                                STATUS
                            </th>
                            <th>
                                LAST UPDATE
                            </th>
                        </tr>
                        </thead>
                        <tbody
                            style={{
                                backgroundColor: '#0D202F',
                            }}
                        >
                        {
                            filteredSupportQueries.length > 0 ?
                                filteredSupportQueries.map((mySupportQuery) => (
                                    <tr key={mySupportQuery.id}>
                                        <td>
                                            {/* Use the ImportExportUsersComponent component */}
                                            <SupportActions
                                                menuItems={[
                                                    ['Resolve', 'resolveModal', 'dialogue', mySupportQuery.id],
                                                    ['Details', `/support/details/${mySupportQuery.id}`, 'link', mySupportQuery.id],
                                                    ['Delete', 'deleteModal', 'dialogue', mySupportQuery.id],
                                                ]}
                                                supportQueryCategories={allSupportQueryCategories}
                                            />
                                        </td>
                                        <td>
                                            {/*{(mySupportQuery.user_id)}*/}
                                            {getACustomerById(mySupportQuery.user_id)}
                                        </td>
                                        <td>
                                            {/*{(mySupportQuery.category_id)}*/}
                                            {getSupportCategoryById(mySupportQuery.category_id)}
                                        </td>
                                        <td>
                                            {mySupportQuery.title}
                                        </td>
                                        <td>
                                            {/*SupportQuery status */}
                                            {getSupportStatusById(mySupportQuery.status_id)}
                                        </td>
                                        <td>
                                            {mySupportQuery.updated_at.toLocaleString()}
                                        </td>
                                    </tr>
                                ))
                                : <tr
                                    style={{
                                        backgroundColor: '#0D202F',
                                        textAlign: 'center'
                                    }}
                                >
                                    <td colSpan={NO_OF_COLUMNS} valign="top">
                                           <center> <NoDataIcon /></center>
                                        <br/> You have no queries
                                            yet. <br/> Your queries would appear here once they are created.
                                    </td>
                                </tr>
                        }

                        </tbody>
                    </table>

                </main>
                <PaginationComponent
                    onClick={() => handlePageChange(currentPage - 1)}
                    currentPage={currentPage}
                    length={totalPages}
                    mapfn={(_, index) => (
                        <button
                            key={index}
                            className={`join-item btn ${currentPage === index + 1 ? 'btn-active' : ''}`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    )} onClick1={() => handlePageChange(currentPage + 1)}
                />
            </main>
        </>
    );
}
