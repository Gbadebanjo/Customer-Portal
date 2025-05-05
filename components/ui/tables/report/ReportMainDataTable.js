'use client'
import {useEffect, useState} from 'react';
import classes from "./dataTable.module.css";
import ButtonFlexible from "@/components/ui/button-flexible/ButtonFlexible";
import SearchIcon from "@/components/ui/icons/SearchIcon";
import ChevronDownIcon from "@/components/ui/icons/ChevronDownIcon";
import ReportActions from "@/components/ui/modals/otherActions/ReportActions/ReportActions";
import PaginationComponent from "@/components/ui/pagination/PaginationComponent";

export default function ReportMainDataTable({allReports}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredReports, setFilteredReports] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchClicked, setSearchClicked] = useState(false);
    const itemsPerPage = 5;
    const NO_OF_COLUMNS = 3;

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = currentPage * itemsPerPage;
        const slicedReports = allReports.slice(startIndex, endIndex);
        setFilteredReports(slicedReports);
    }, [allReports, currentPage]);

    const totalPages = Math.ceil(allReports.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        if (searchClicked) { // Apply search filtering only if search button is clicked
            let filtered;
            filtered = allReports.filter(report =>
                report.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredReports(filtered);
        }

    }, [allReports, searchTerm, searchClicked]);

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
                                Actions
                            </th>
                            <th>
                                REPORT NAME
                            </th>
                            <th>
                                UPLOAD DATE
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            filteredReports.length > 0 ?
                                filteredReports.map((myReport) => (
                                    <tr key={myReport.id}>
                                        <td>
                                            {/* Use the ImportExportUsersComponent component */}
                                            <ReportActions
                                                menuItems={[
                                                    ['Edit', 'openEditModal', 'dialogue', myReport.id],
                                                    ['Delete', 'openDeleteModal', 'dialogue', myReport.id],
                                                    ['Download', '/admin/identity/users', 'link', myReport.id],
                                                ]}
                                            />
                                        </td>
                                        <td>
                                            {myReport.name}
                                        </td>
                                        <td>
                                            {myReport.created_at.toLocaleString()}
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
