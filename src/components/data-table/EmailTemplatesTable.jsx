import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { Button, Modal, Divider } from "antd";
import Button_m from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { visuallyHidden } from "@mui/utils";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import JoditEditor from "jodit-react";

function createData(id, name, modified_date) {
    return {
        id,
        name,
        modified_date,
        actions: {
            deleteAction: () => {
                console.log(`Delete button clicked for row ${id}`);
            },
            exportAction: () => {
                console.log(`Export button clicked for row ${id}`);
            }
        }
    };
};


const rows = [
    createData(1, "Cupcake", "1-12-2002"),
    createData(2, "Donut", "12-12-2001"),
    createData(3, "Eclair", "12-12-2001"),
    createData(4, "Frozen yoghurt", "12-12-2001"),
    createData(5, "Gingerbread", "12-12-2001"),
    createData(6, "Honeycomb", "12-12-2001"),
    createData(7, "Ice cream sandwich", "12-12-2001"),
    createData(8, "Jelly Bean", "12-12-2001"),
    createData(9, "KitKat", "12-12-2001"),
    createData(10, "Lollipop", "12-12-2001"),
    createData(11, "Marshmallow", "12-12-2001"),

];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [

    {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Name",
        sortable: false,
    },
    {
        id: "modified_date",
        numeric: true,
        disablePadding: false,
        label: "Modified Date",
        sortable: true,
    },
    {
        id: "actions",
        numeric: false,
        disablePadding: false,
        label: "",
        sortable: false,
    },
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox"></TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.sortable ? (
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : "asc"}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === "desc" ? "sorted descending" : "sorted ascending"}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        ) : (
                            <Typography variant="subtitle2">{headCell.label}</Typography>
                        )}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar({ rowsPerPage, onRowsPerPageChange, onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleRowsPerPageChange = (event) => {
        let value = parseInt(event.target.value, 10);
        value = value > 0 ? value : 1;
        onRowsPerPageChange(value);
    };

    const handleSearchChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >

            <Typography
                sx={{
                    fontSize: "15px",
                    marginRight: "8px"
                }}
                id="tableTitle"
                component="div"
            >
                Show
            </Typography>
            <TextField
                type="number"
                size="small"
                style={{ width: 70 }}
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
            />
            <Typography
                sx={{
                    fontSize: "15px",
                    marginLeft: "5px"
                }}
                id="tableTitle"
                component="div"
            >
                Columns
            </Typography>
            <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
                <Typography
                    sx={{
                        fontSize: "15px",
                        marginRight: "5px"
                    }}
                    id="tableTitle"
                    component="div"
                >
                    Search:
                </Typography>


                <TextField
                    size="small"
                    style={{ width: 470 }}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    InputProps={{
                        endAdornment: (
                            <SearchIcon style={{ marginRight: "8px", color: "gray" }} />
                        ),
                    }}
                />

            </div>


        </Toolbar>
    );
}


export default function EnhancedTable() {
    const [order, setOrder] = React.useState("asc");
    const [setModalOpen, setIsModalOpen1] = useState(false);
    
    const [orderBy, setOrderBy] = React.useState("modified_date");
    const [selected, setSelected] = React.useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeButton, setActiveButton] = useState("");
    const [inputType, setInputType] = useState("");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchTerm, setSearchTerm] = useState("");
    const editor = useRef(null);

    const showModal1 = () => {
        setIsModalOpen1(true);
    };
    const Cancel = () => {
        setIsModalOpen1(false);
    };


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleInputType = (type) => {
        setInputType(type);
        setActiveButton(type);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleRowsPerPageChange = (newRowsPerPage) => {
        setRowsPerPage(newRowsPerPage);
        setPage(0);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const filteredRows = rows.filter(row => {
        return (
            row.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });


    const visibleRows = stableSort(filteredRows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
    );

    return (
        <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
                <EnhancedTableToolbar
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    onSearch={setSearchTerm}
                />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: "pointer" }}
                                    >
                                        <TableCell padding="checkbox">

                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.modified_date}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.name && (
                                                <>
                                                    <Button
                                                        icon={<EditIcon />}
                                                        onClick={showModal}
                                                        style={{
                                                            fontSize: "16px",
                                                            width: 70,
                                                            height: 40,
                                                            backgroundColor: "#43bf7d",
                                                            color: "#FFF",
                                                        }}
                                                    />
                                                    <Button
                                                        icon={<DeleteRoundedIcon />}
                                                        onClick={showModal1}
                                                        style={{
                                                            fontSize: "16px",
                                                            width: 70,
                                                            height: 40,
                                                            backgroundColor: "#e35e5e",
                                                            color: "#FFF",
                                                        }} />
                                                </>
                                            )}
                                        </TableCell>

                                    </TableRow>
                                );
                            })}
                            {rows.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={20} style={{ position: "relative" }}>
                                        <LinearProgress style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
                                        <Typography align="center" sx={{
                                            fontSize: "14px",
                                            color: "#c9c9c9",
                                        }}>
                                            This might take a while to complete
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[]}
                    sx={{
                        "& .MuiTablePagination-displayedRows": { display: "none" }
                    }}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <Modal
                    title="New Template"
                    width={800}
                    centered
                    open={isModalOpen}
                    onCancel={handleCancel}
                    cancelButtonProps={{
                        style: {
                            backgroundColor: "#bebebe",
                            color: "#FFF",
                            fontSize: "13px",
                            height: "36px"
                        }
                    }}
                    style={{ width: "600px", height: "400px" }}
                    cancelText="CANCEL"

                    footer={(_, { CancelBtn }) => (
                        <>
                            <CancelBtn

                            />
                            <Button

                                style={{
                                    backgroundColor: "rgba(67,190,126,255)",
                                    color: "#FFF",
                                    fontSize: "13px",
                                    height: "36px"
                                }}
                            >SAVE</Button>
                        </>
                    )}
                >
                    <Divider style={{ borderTopColor: "#d5d5d5" }} />

                    <Box
                        component="form"
                        sx={{
                            "& .MuiTextField-root": { m: 1, width: "100%" },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                label="Template Name"
                                variant="outlined"
                            />
                            <TextField
                                label="Subject"
                                variant="outlined"
                            />
                        </div>
                        <div style={{ marginTop: "40px", marginLeft: "7px", gap: 12 }}>
                            <Button_m variant="text" size="large"
                                style={{
                                    borderRadius: activeButton === "text" ? "0px" : "4px",
                                    borderBottom: activeButton === "text" ? "solid" : "none",
                                }}
                                onClick={() => handleInputType("text")}
                            >Text</Button_m>
                            <Button_m variant="text" size="large"
                                style={{
                                    borderRadius: activeButton === "html" ? "0px" : "4px",
                                    borderBottom: activeButton === "html" ? "solid" : "none",
                                }}
                                onClick={() => handleInputType("html")}
                            >HTML</Button_m>
                        </div>
                        {inputType === "text" && (
                            <TextField
                                style={{
                                    minWidth: 500
                                }}
                                label="Plaintext"
                                multiline={true}
                                rows="15"
                                rowsMax="20"
                                variant="outlined"
                                fullWidth={true}
                            />
                        )}
                        {inputType === "html" && (
                            <div style={{ marginTop: "10px" }}>
                                <JoditEditor
                                    ref={editor}
                                    config={{
                                        height: 400,
                                        toolbarAdaptive: false,
                                        toolbarButtonSize: "small",
                                        toolbar: true,
                                        showCharsCounter: false,
                                        buttons: "bold,italic,underline,strikethrough,|,align,ul,ol,|,font,fontsize,brush,paragraph",
                                        placeholder: "",
                                    }}
                                />
                            </div>
                        )}

                    </Box>


                </Modal>
                <Modal
                    title="Delete Item"
                    centered
                    open={setModalOpen}
                    onCancel={Cancel}
                    cancelButtonProps={{
                        style: {
                            backgroundColor: "#ff5252",
                            color: "#FFF",
                            fontSize: "13px",
                            height: "36px",
                        }
                    }}
                    cancelText="CANCEL"
                    footer={(_, { CancelBtn }) => (
                        <>
                            <CancelBtn
                            />
                            <Button
                                style={{
                                    borderColor: "rgba(67,190,126,255)",
                                    color: "rgba(67,190,126,255)",
                                    fontSize: "13px",
                                    height: "36px",
                                }}
                            >OK</Button>
                        </>
                    )}
                >
                    <Typography>
                        Are you sure you want to delete this item?
                    </Typography>
                </Modal>
            </Paper>

        </Box>
    );
}