'use client'
import {useEffect, useState} from 'react';
import UserActions from "@/components/ui/modals/otherActions/UserActions/UserActions";
import classes from "./dataTable.module.css";
import ButtonFlexible from "@/components/ui/button-flexible/ButtonFlexible";
import SearchIcon from "@/components/ui/icons/SearchIcon";
import ChevronDownIcon from "@/components/ui/icons/ChevronDownIcon";
import BlockedIcon from "@/components/ui/icons/BlockedIcon";
import CheckIcon from "@/components/ui/icons/CheckIcon";
import PaginationComponent from "@/components/ui/pagination/PaginationComponent";

export default function UsersMainDataTable({AllUsers, AllCustomers}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchClicked, setSearchClicked] = useState(false);
    const itemsPerPage = 5;
    const NO_OF_COLUMNS = 15;

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = currentPage * itemsPerPage;
        const slicedUsers = AllUsers.slice(startIndex, endIndex);
        setFilteredUsers(slicedUsers);
    }, [AllUsers, currentPage]);

    const totalPages = Math.ceil(AllUsers.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    function getACustomerById(customer_id) {
        const customerObject = AllCustomers.find(customer => customer.id === customer_id);
        let output = '';
        if (customerObject) {
            output = customerObject.company_name;
        }
        return output;
    }

    useEffect(() => {
        if (searchClicked) { // Apply search filtering only if search button is clicked
            let filtered = AllUsers.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.customer.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredUsers(filtered);
        }
    }, [AllUsers, searchTerm, searchClicked]);

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
                                USER NAME
                            </th>
                            <th>
                                EMAIL ADDRESS
                            </th>
                            <th>
                                ROLE
                            </th>
                            <th>
                                PHONE NUMBER
                            </th>
                            <th>
                                NAME
                            </th>
                            <th>
                                SURNAME
                            </th>
                            <th>
                                ACTIVE
                            </th>
                            <th>
                                ACCOUNT LOCKOUT
                            </th>
                            <th>
                                EMAIL CONFIRMED
                            </th>
                            <th>
                                ACCESS FAILED COUNT
                            </th>
                            <th>
                                CREATION TIME
                            </th>
                            <th>
                                LAST MODIFICATION TIME
                            </th>
                            <th>
                                AMMP API KEY
                            </th>
                            <th>
                                CUSTOMER
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            filteredUsers.length > 0 ?
                                filteredUsers.map((myUser) => (
                                    <tr key={myUser.id}>
                                        <td>
                                            {/* Use the ImportExportUsersComponent component */}
                                            <UserActions
                                                menuItems={[
                                                    ['Edit', 'openEditModal', 'dialogue', myUser.id],
                                                    ['Set Password', '/setLink', 'dialogue', myUser.id],
                                                    ['Log in with this user', '/host', 'dialogue', myUser.id],
                                                    ['Delete', 'openDeleteModal', 'dialogue', myUser.id],
                                                ]}
                                                customers={AllCustomers}
                                            />
                                        </td>
                                        <td>
                                            {myUser.username}
                                        </td>
                                        <td>
                                            {myUser.email}
                                        </td>
                                        <td>
                                            {myUser.roles.map(role => role.name).join(', ')}                                                </td>
                                        <td>
                                            {myUser.phone_number}
                                        </td>
                                        <td>
                                            {myUser.name}
                                        </td>
                                        <td>
                                            {myUser.surname}
                                        </td>
                                        <td>
                                            {myUser.not_active ? <BlockedIcon/> : <CheckIcon/>}
                                        </td>
                                        <td>
                                            {myUser.is_locked_out ? <BlockedIcon/> : <CheckIcon/>}
                                        </td>
                                        <td>
                                            {myUser.email_confirmed ? <BlockedIcon/> : <CheckIcon/>}
                                        </td>
                                        <td>
                                            {myUser.not_active ? <BlockedIcon/> : <CheckIcon/>}
                                        </td>
                                        <td>
                                            {myUser.created_at.toLocaleString()}
                                        </td>
                                        <td>
                                            {myUser.updated_at.toLocaleString()}
                                        </td>
                                        <td>
                                            {myUser.ammp_api_key}
                                        </td>
                                        <td>
                                            {getACustomerById(myUser.customer)}
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
