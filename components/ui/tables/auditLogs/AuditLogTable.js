'use client'
import {useEffect, useState} from 'react';
import classes from "./dataTable.module.css";
import ButtonFlexible from "@/components/ui/button-flexible/ButtonFlexible";
import SearchIcon from "@/components/ui/icons/SearchIcon";
import ChevronDownIcon from "@/components/ui/icons/ChevronDownIcon";
import PaginationComponent from "@/components/ui/pagination/PaginationComponent";

export default function AuditLogTable({allAuditLogs}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredAuditLogs, setFilteredAuditLogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchClicked, setSearchClicked] = useState(false);
    const itemsPerPage = 5;
    const NO_OF_COLUMNS = 10;

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = currentPage * itemsPerPage;
        const slicedAuditLogs = allAuditLogs.slice(startIndex, endIndex);
        setFilteredAuditLogs(slicedAuditLogs);
    }, [allAuditLogs, currentPage]);

    const totalPages = Math.ceil(allAuditLogs.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        if (searchClicked) { // Apply search filtering only if search button is clicked
            let filtered;
            filtered = allAuditLogs.filter(item =>
                item.user_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredAuditLogs(filtered);
        }

    }, [allAuditLogs, searchTerm, searchClicked]);

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
                    <table
                        className='table table-bordered'
                        style={{
                            width: 700,
                        }}
                    >
                        <thead>
                        <tr>
                            <th>
                                ACTIONS
                            </th>
                            <th>
                                HTTP REQUEST
                            </th>
                            <th>
                                USERNAME
                            </th>
                            <th>
                                IP ADDRESS
                            </th>
                            <th>
                                DATE
                            </th>
                            <th>
                                DURATION (MS)
                            </th>
                            <th>
                                APPLICATION
                            </th>
                            <th>
                                CORRELATION ID
                            </th>
                            <th>
                                URL
                            </th>
                            <th>
                                HAS EXCEPTION
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            filteredAuditLogs.length > 0 ?
                                filteredAuditLogs.map((myAuditLog) => (
                                    <tr key={myAuditLog.id}>
                                        <td>
                                            {/* Use the ImportExportUsersComponent component */}
                                            <ButtonFlexible
                                                link="#"
                                                height={30}
                                                width={100}
                                            >
                                                <SearchIcon/>&nbsp; <b>Detail</b>
                                            </ButtonFlexible>
                                        </td>
                                        <td>
                                            {myAuditLog.http_request}
                                        </td>
                                        <td>
                                            {myAuditLog.user_name}
                                        </td>
                                        <td>
                                            {myAuditLog.client_ip_address}
                                        </td>
                                        <td>
                                            {myAuditLog.created_at}
                                        </td>
                                        <td>
                                            {myAuditLog.duration}
                                        </td>
                                        <td>
                                            Daystar Customer Portal
                                        </td>
                                        <td>
                                            {myAuditLog.correlation_id}
                                        </td>
                                        <td>
                                            {myAuditLog.url}
                                        </td>
                                        <td>
                                            {myAuditLog.has_exception}
                                        </td>
                                    </tr>
                                ))
                                : <tr
                                    style={{
                                        backgroundColor: '#0D202F',
                                        textAlign: 'center'
                                    }}
                                >
                                    <td colSpan={NO_OF_COLUMNS}>No data available</td>
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
