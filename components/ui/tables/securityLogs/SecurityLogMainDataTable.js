'use client'
import {useEffect, useState} from 'react';
import classes from "./dataTable.module.css";
import ButtonFlexible from "@/components/ui/button-flexible/ButtonFlexible";
import SearchIcon from "@/components/ui/icons/SearchIcon";
import ChevronDownIcon from "@/components/ui/icons/ChevronDownIcon";
import PaginationComponent from "@/components/ui/pagination/PaginationComponent";

export default function SecurityLogMainDataTable({allSecurityLogs}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredSecurityLogs, setFilteredSecurityLogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchClicked, setSearchClicked] = useState(false);
    const itemsPerPage = 5;
    const NO_OF_COLUMNS = 8;

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = currentPage * itemsPerPage;
        const slicedSecurityLogs = allSecurityLogs.slice(startIndex, endIndex);
        setFilteredSecurityLogs(slicedSecurityLogs);
    }, [allSecurityLogs, currentPage]);

    const totalPages = Math.ceil(allSecurityLogs.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        if (searchClicked) { // Apply search filtering only if search button is clicked
            let filtered;
            filtered = allSecurityLogs.filter(item =>
                item.user_id.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredSecurityLogs(filtered);
        }

    }, [allSecurityLogs, searchTerm, searchClicked]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchClicked(true);
        // Trigger search functionality
        setSearchTerm(e.target.search.value);
    };

    return (
        <>
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
                                DATE
                            </th>
                            <th>
                                ACTION
                            </th>
                            <th>
                                IP ADDRESS
                            </th>
                            <th>
                                BROWSER
                            </th>
                            <th>
                                APPLICATION
                            </th>
                            <th>
                                IDENTITY
                            </th>
                            <th>
                                USERNAME
                            </th>
                            <th>
                                CLIENT
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            filteredSecurityLogs.length > 0 ?
                                filteredSecurityLogs.map((mySecurityLog) => (
                                    <tr key={mySecurityLog.id}>
                                        <td>
                                            {mySecurityLog.created_at}
                                        </td>
                                        <td>
                                            {mySecurityLog.action}
                                        </td>
                                        <td>
                                            {mySecurityLog.client_ip_address}
                                        </td>
                                        <td>
                                            {mySecurityLog.browser_info}
                                        </td>
                                        <td>
                                            Daystar SecurityLog Portal
                                        </td>
                                        <td>
                                            Identity
                                        </td>
                                        <td>
                                            {mySecurityLog.user_id}
                                        </td>
                                        <td>
                                            {mySecurityLog.sequence_id}
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
        </>
    );
}
