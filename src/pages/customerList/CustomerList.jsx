import { Edit, TrendingFlat } from "@mui/icons-material";
import { Box, Checkbox, Paper, styled, Table, TableBody, TableCell, TableRow } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
// import { Breadcrumb } from "app/components";
import { TableHead, TableToolbar } from "../../components/data-table";
import { getComparator, stableSort } from "../../components/data-table/utils";
import { H5 } from "../../components/Typography";
import useTable from "../../hooks/useTable";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// styled components
const IMG = styled("img")({ height: 32, borderRadius: "4px" });
const FlexBox = styled(Box)({ display: "flex", alignItems: "center" });

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: {
        margin: "16px",
    },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));

const CustomerList = () => {
    const {
        page,
        order,
        orderBy,
        selected,
        rowsPerPage,
        isSelected,
        handleClick,
        handleChangePage,
        handleRequestSort,
        handleSelectAllClick,
        handleChangeRowsPerPage,
    } = useTable({ defaultOrderBy: "name" });
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Firebase Realtime Database API URL
                const response = await axios.get(
                    'https://dashboard-a2016-default-rtdb.firebaseio.com/users.json'  // Add '.json' at the end
                );

                // Map the data received to an array
                const fetchedUsers = Object.keys(response.data).map((key) => ({
                    id: key,
                    ...response.data[key],
                }));

                setUsers(fetchedUsers);
            } catch (error) {
                console.error('Error fetching data from Firebase:', error);
            } finally {
                // setLoading(false);
            }
        };

        fetchData();
    }, []);
    const navigate = useNavigate();

    // TABLE HEADER COLUMN LIST
    const columns = [
        { id: "name", align: "left", disablePadding: true, label: "Name" },
        { id: "address", align: "center", disablePadding: false, label: "Address" },
        { id: "company", align: "center", disablePadding: false, label: "Company" },
        { id: "balance", align: "center", disablePadding: false, label: "Balance" },
        { id: "edit", align: "center", disablePadding: false, label: "Edit" },
    ];

    const handleSelectAllRows = (event) => {
        const newSelected = users.map((n) => n.name);
        handleSelectAllClick(event.target.checked, newSelected);
    };

    const filteredUsers = users?.map((item) => ({
        name: item.name,
        email: item.email,
        imgUrl: item.imgUrl,
        balance: item.balance,
        address: item.address,
        company: item.company,
    }));

    return (
        <Container>
           

            <Paper sx={{ width: "100%", mb: 2 }}>
                <TableToolbar title="All Customers" numSelected={selected.length} />

                <TableContainer>
                    <Table sx={{ minWidth: 750 }}>
                        <TableHead
                            order={order}
                            orderBy={orderBy}
                            headCells={columns}
                            numSelected={selected.length}
                            rowCount={filteredUsers.length}
                            onRequestSort={handleRequestSort}
                            onSelectAllClick={handleSelectAllRows}
                        />

                        <TableBody>
                            {stableSort(filteredUsers, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    const isItemSelected = isSelected(row.name);

                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row.name}
                                            role="checkbox"
                                            selected={isItemSelected}
                                            aria-checked={isItemSelected}
                                            onClick={(event) => handleClick(event, row.name)}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox color="primary" checked={isItemSelected} />
                                            </TableCell>

                                            <TableCell component="th" scope="row" padding="none">
                                                <FlexBox gap={1}>
                                                    <IMG src={row.imgUrl} alt="user" />
                                                    <H5 fontSize={15}>{row.name}</H5>
                                                </FlexBox>
                                            </TableCell>

                                            <TableCell align="center">{row.address}</TableCell>

                                            <TableCell align="center">{row.company}</TableCell>

                                            <TableCell align="center">{row.balance}</TableCell>

                                            <TableCell align="center">
                                                <IconButton onClick={() => navigate("/pages/view-customer")}>
                                                    <Edit />
                                                </IconButton>

                                                <IconButton onClick={() => navigate("/pages/new-customer")}>
                                                    <TrendingFlat />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    page={page}
                    component="div"
                    rowsPerPage={rowsPerPage}
                    count={filteredUsers.length}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Container>
    );
};

export default CustomerList;
