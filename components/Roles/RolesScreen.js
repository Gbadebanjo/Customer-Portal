import classes from './roles.module.css';
import NavbarComponent from "@/components/ui/Navbar/Navbar";
import HomeIcon from "@/components/ui/icons/HomeIcon";
import Link from "next/link";
import RightSideComponent from "@/components/ui/rightside/RightSideComponent";
import getAllUserRoles from "@/lib/controllers/userRoles/getAllUserRoles";
import ButtonFlexible from "@/components/ui/button-flexible/ButtonFlexible";
import SearchIcon from "@/components/ui/icons/SearchIcon";
import ChevronDownIcon from "@/components/ui/icons/ChevronDownIcon";
import ActionsPopup from "@/components/ui/popups/ActionsPopup/ActionsPopup";
import DefaultTagButton from "@/components/ui/tags/DefaultTagButton";
import PublicTagButton from "@/components/ui/tags/PublicTagButton"; // Changed import

export default async function RolesScreen() {
    const date = new Date();
    const thisYear = date.getFullYear();

    const {userRoles} = await getAllUserRoles();
    const NO_OF_COLUMNS = 2;


    // console.log('before userroles')
    // console.log(JSON.stringify(userRoles))
    // console.log('after userroles')


    return (
        <div className={classes.container}>
            {/* Header */}
            <div className={classes.header}>
               <span>
                   <Link href='/dashboard'>
                       <HomeIcon/>
                   </Link>
                 </span>
                <span> <small> | &nbsp; Admin  &nbsp; | &nbsp; Roles &nbsp; </small></span>

            </div>
            {/* Sidebar */}
            <div className={classes.nav}>
                <div className={classes.sidebar}>
                    {/* Sidebar Menu */}
                    <NavbarComponent/>
                </div>
            </div>
            {/* Content */}
            <div className={classes.content}>
                {/* Top Center */}
                <div className={classes.topCenter}>
                    <h1 className={classes.title}>User Roles</h1>
                </div>
                <div className={classes.centerContent}>
                    {/*search area*/}
                    <form>
                        <div
                            className={classes.searchArea}
                        >
                            <div
                                className={classes.searchTextInput}
                            >
                                {/* input text 1 */}
                                <div style={{
                                    id: 'input_1',
                                }}>
                                    <input
                                        type="text"
                                        className={classes.inputText}
                                        placeholder="Search"
                                        max={256}
                                        name="search"
                                        id="search"
                                    />
                                </div>
                            </div>
                            <div
                                className={classes.searchButton}
                            >
                                <ButtonFlexible
                                    link="#"
                                    width={50}
                                    height={50}
                                    style={{
                                        marginRight: 0,
                                    }}
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
                                        ROLE NAME
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    userRoles.length > 0 ?
                                        userRoles.map((myUserRole) => (
                                            <tr key={myUserRole.id}>
                                                <td>
                                                    {/* Use the SupportActions component */}
                                                    <ActionsPopup
                                                        menuItems={[
                                                            ['Edit', '/editLink'],
                                                            ['Permissions', '/permissionsLink']
                                                        ]}
                                                    />
                                                </td>
                                                <td>
                                                    <div className={classes.itemContain}>
                                                        <span>
                                                         {myUserRole.name}&nbsp; &nbsp;
                                                        </span>
                                                        <span
                                                            style={{
                                                                marginTop: 10
                                                            }}
                                                        >
                                                            <PublicTagButton/>&nbsp;
                                                        </span> &nbsp;&nbsp;
                                                        <span
                                                            style={{
                                                                marginBottom: 10
                                                            }}>
                                                         {myUserRole.btn_tags.includes('Default') ?
                                                             <DefaultTagButton/> : ''}
                                                        </span>
                                                    </div>

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

                </div>
                {/*footer area*/}
                <div className={classes.copyright}>
                    {thisYear} © Daystar Power Energy Solutions
                </div>
            </div>
            {/* Right Side */}
            <div className={classes.rightSide}>
                {/*Right Side*/}
                <RightSideComponent/>
            </div>
        </div>);
}
