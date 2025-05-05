'use client'
import { useEffect, useState } from 'react';
import CustomerActions from "@/components/ui/modals/otherActions/CustomerActions/CustomerActions";
import classes from "./dataTable.module.css";
import ButtonFlexible from "@/components/ui/button-flexible/ButtonFlexible";
import SearchIcon from "@/components/ui/icons/SearchIcon";
import ChevronDownIcon from "@/components/ui/icons/ChevronDownIcon";
import PaginationComponent from "@/components/ui/pagination/PaginationComponent";

export default function CustomerMainDataTable({ allCustomers }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchClicked, setSearchClicked] = useState(false);
    const itemsPerPage = 5;
    const NO_OF_COLUMNS = 4;

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = currentPage * itemsPerPage;
        const slicedCustomers = allCustomers.slice(startIndex, endIndex);
        setFilteredCustomers(slicedCustomers);
    }, [allCustomers, currentPage]);

    useEffect(() => {
        if (searchClicked) { // Apply search filtering only if search button is clicked
            let filtered;
            filtered = allCustomers.filter(customer =>
                customer.company_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCustomers(filtered);
        }

    }, [allCustomers, searchTerm, searchClicked]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchClicked(true);
        // Trigger search functionality
        setSearchTerm(e.target.search.value);
    };


    const totalPages = Math.ceil(allCustomers.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
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
                            style={{ marginRight: 0 }}
                            type="submit"
                        >
                            <SearchIcon />
                        </ButtonFlexible>
                    </div>
                </div>
            </form>
            <div className={classes.filterText}>
                <span>
                    <small>Advanced Filters</small>
                </span>
                <span>
                    <small><ChevronDownIcon /></small>
                </span>
            </div>
            {/*Content*/}
            <main className={classes.mainContent}>
                <main className="ml-5 mr-5 mt-5">
                    <table className="table table-bordered" style={{ width: 700 }}>
                        <thead>
                        <tr>
                            <th>ACTIONS</th>
                            <th>COMPANY NAME</th>
                            <th>NUMBER OF USERS</th>
                            <th>DATE ADDED</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredCustomers.length > 0 ? filteredCustomers.map((myCustomer) => (
                            <tr key={myCustomer.id}>
                                <td>
                                    {/* Use the Actions component */}
                                    <CustomerActions
                                        menuItems={[
                                            ['Edit', 'openEditModal', 'dialogue', myCustomer.id],
                                            ['Delete', 'openDeleteModal', 'dialogue', myCustomer.id],
                                            ['Users', '/admin/identity/users', 'link', myCustomer.id],
                                        ]}
                                    />
                                </td>
                                <td>{myCustomer.company_name}</td>
                                <td>{myCustomer.users.length}</td>
                                <td>{myCustomer.created_at.toLocaleString()}</td>
                            </tr>
                        )) : <tr
                            style={{
                                backgroundColor: '#0D202F',
                                textAlign: 'center',
                                padding: 20,
                                margin: 20
                            }}
                        >
                            <td colSpan={NO_OF_COLUMNS}>No data available</td>
                        </tr>}
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
                    )}
                    onClick1={() => handlePageChange(currentPage + 1)}
                />
            </main>
        </>
    );
}
