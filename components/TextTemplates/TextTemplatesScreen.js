import classes from './texttemplates.module.css';
import NavbarComponent from "@/components/ui/Navbar/NavbarContainer";
import HomeIcon from "@/components/ui/icons/HomeIcon";
import Link from "next/link";
import RightSideComponent from "@/components/ui/rightside/RightSideComponent";
import ButtonFlexible from "@/components/ui/button-flexible/ButtonFlexible";
import PlusIcon from "@/components/ui/icons/PlusIcon";
import SearchIcon from "@/components/ui/icons/SearchIcon";
import ChevronDownIcon from "@/components/ui/icons/ChevronDownIcon";
import getAllTextTemplates from "@/lib/controllers/textTemplates/getAllTextTemplates";
import TextTemplateActions from "@/components/ui/modals/otherActions/TextTemplateActions/TextTemplateActions"; // Import the image

export default async function TextTemplatesScreen() {
    const date = new Date();
    const thisYear = date.getFullYear();
    const {textTemplates} = await getAllTextTemplates();
    const NO_OF_COLUMNS = 4;
    return (
        <div className={classes.container}>
            {/* Header */}
            <div className={classes.header}>
               <span>
                   <Link href='/dashboard'>
                       <HomeIcon/>
                   </Link>
                 </span>
                <span> <small> | &nbsp; Admin  &nbsp; | &nbsp; Text Templates</small></span>

            </div>
            {/* Sidebar */}
            <div className={classes.nav}>
                <div className={classes.sidebar}>
                    {/* Sidebar Header */}
                    
                    {/* Sidebar Menu */}
                    <NavbarComponent/>
                </div>
            </div>
            {/* Content */}
            <div className={classes.content}>
                {/* Top Center */}
                <div className={classes.topCenter}>
                    <p className={classes.title}>Text Templates</p>
                    <ButtonFlexible
                        link="#"
                        width={100}
                        height={40}
                        style={{
                            marginRight: 0,
                        }}
                    >
                        <PlusIcon/> New
                    </ButtonFlexible>
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
                                        &nbsp;
                                    </th>
                                    <th>
                                        NAME
                                    </th>
                                    <th>
                                        DISPLAY NAME
                                    </th>
                                    <th>
                                        INLINE LOCALIZED
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    textTemplates.length > 0 ?
                                        textTemplates.map((myTextTemplate) => (
                                            <tr key={myTextTemplate.id}>
                                                <td>
                                                    {/* Use the ImportExportUsersComponent component */}
                                                    <TextTemplateActions
                                                        id={myTextTemplate.id}
                                                    />
                                                </td>
                                                <td>
                                                    {myTextTemplate.name}
                                                </td>
                                                <td>
                                                    {myTextTemplate.display_name}
                                                </td>
                                                <td>
                                                    {myTextTemplate.inline_localized}
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
                    <div className={classes.copyright}>
                        {thisYear} © Daystar Power Energy Solutions
                    </div>
                </div>
            </div>
            {/* Right Side */}
            <RightSideComponent/>
        </div>
    );
}