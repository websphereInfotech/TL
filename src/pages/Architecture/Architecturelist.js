import * as React from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import axios from "axios";
import { FaStreetView } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiSearch, BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { Breadcrumb, Col, Container, Modal } from "react-bootstrap";
import routeUrls from "../../constants/routeUrls";

function Row(props) {
  const { row, setArchitecture } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedArchitectureId, setSelectedArchitectureId] =
    React.useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    React.useState(false);
  const [selectedArchitecDetails, setselectedArchitecDetails] =
    React.useState(null);
    const [user, setUser] = React.useState([]);

  const handleviewdata = (id) => {
    const saved = localStorage.getItem(process.env.REACT_APP_KEY);
    axios
      .get(`http://localhost:2002/api/architec/viewdata/${id}`, {
        headers: {
          Authorization: `Bearer ${saved}`,
        },
      })
      .then(function (response) {
        console.log(response.data.data);
        setselectedArchitecDetails(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleDelete = () => {
    const saved = localStorage.getItem(process.env.REACT_APP_KEY);
    axios
      .delete(
        `http://localhost:2002/api/architec/data/delete/${selectedArchitectureId}`,
        {
          headers: {
            Authorization: `Bearer ${saved}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data.data);
        setArchitecture((prevArchitecture) =>
          prevArchitecture.filter(
            (architec) => architec._id !== selectedArchitectureId
          )
        );
        setShowDeleteConfirmation(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const confirmDelete = (id) => {
    setSelectedArchitectureId(id);
    setShowDeleteConfirmation(true);
  };
  const handleSubmit = (id) => {
    const saved = localStorage.getItem(process.env.REACT_APP_KEY);
    axios
      .get(`http://localhost:2002/api/shop/listdata/${id}`, {
        headers: {
          Authorization: `Bearer ${saved}`,
        },
      })
      .then(function (response) {
        setUser({ user: response.data.data }); 
        console.log({ user: response.data.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell onClick={() => handleSubmit(row._id)}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.architecsName}
          </TableCell>
          <TableCell align="center">
            <FaStreetView
              className="mx-auto"
              onClick={() => handleviewdata(row._id)}
            />
          </TableCell>
          <TableCell align="right">
            <MdDeleteForever
              className="mx-auto"
              onClick={() => confirmDelete(row._id)}
            />
          </TableCell>
          <TableCell align="right">
            <Link to={`${routeUrls.ARCHITECTURE}/${row._id}`}>
              <BiEdit className="mx-auto" />
            </Link>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  User
                </Typography>
                <div className="nested-table-container">
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">User Name</TableCell>
                        <TableCell align="center">Mobile No.</TableCell>
                        <TableCell align="center">Address</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">serialNumber</TableCell>
                        <TableCell align="center">Rate</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {user.user?.map((userRow, index) => (
                        <TableRow key={userRow._id}>
                          <TableCell
                            component="th"
                            scope="row"
                            align="center"
                            style={{ width: "30%" }}
                          >
                            {userRow.userName}
                          </TableCell>
                          <TableCell align="center" style={{ width: "30%" }}>
                            {userRow.mobileNo}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ wordBreak: "break-word", width: "30%" }}
                          >
                            {userRow.address}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ wordBreak: "break-word", width: "30%" }}
                          >
                            {userRow.quantity}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ wordBreak: "break-word", width: "30%" }}
                          >
                            {userRow.serialNumber}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ wordBreak: "break-word", width: "30%" }}
                          >
                            {userRow.rate}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
      <Modal
        show={showDeleteConfirmation}
        onHide={() => setShowDeleteConfirmation(false)}
      >
        <div className="logout-model">
          <div className="logout">
            <p>Are you sure you want to delete this item?</p>
            <div className="modal-buttons">
              <button
                className=" rounded-full"
                onClick={() => setShowDeleteConfirmation(false)}
              >
                No
              </button>
              <button className=" rounded-full" onClick={handleDelete}>
                Yes
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        show={selectedArchitecDetails !== null}
        onHide={() => setselectedArchitecDetails(null)}
      >
        <Modal.Body className="bg-white rounded">
          {selectedArchitecDetails ? (
            <div className="pl-10 md:pl-24 ">
              <table className="w-full table-fixed ">
                <tr>
                  <th className="py-2 ">Architecture Name</th>
                  <td> {selectedArchitecDetails.architecsName}</td>
                </tr>
                <tr>
                  <th className="py-2">Mobile No</th>
                  <td> {selectedArchitecDetails.mobileNo}</td>
                </tr>
                <tr>
                  <th className="py-2">Address</th>
                  <td className="break-words">
                    {" "}
                    {selectedArchitecDetails.address}
                  </td>
                </tr>
              </table>
            </div>
          ) : (
            <p>....Loading</p>
          )}
          <div className="flex justify-center mt-2">
            <div
              className="btn bg-black text-white rounded-full py-2 px-4 mt-2 "
              onClick={() => setselectedArchitecDetails(null)}
            >
              Close
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default function Architecturelist() {
  const [architecture, setArchitecture] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const saved = localStorage.getItem(process.env.REACT_APP_KEY);
    console.log(saved);
    axios
      .get(`http://localhost:2002/api/architec/list`, {
        headers: {
          Authorization: `Bearer ${saved}`,
        },
      })
      .then(function (response) {
        console.log(response.data.data);
        setArchitecture(response.data.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  }, []);
  const handleSearch = (architecName) => {
    const saved = localStorage.getItem(process.env.REACT_APP_KEY);
    const url = architecName
      ? `http://localhost:2002/api/architec/searchdata?architecName=${architecName}`
      : 'http://localhost:2002/api/architec/listdata'; 
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${saved}`,
        },
      })
      .then(function (response) {
        console.log(response.data.data);
        setArchitecture(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="bg-dark text-white rounded-br-full">
        <Container>
          <div className="row mb-3 py-3 lg:mx-0 ms-12">
            <Col md={6} sm={12}>
              <p className="md:text-2xl text-xl font-bold">TIMBERLAND</p>
            </Col>
            <Col md={6} sm={12} className="lg:pl-40">
              <div className="relative ">
                <input
                  type="search"
                  name=""
                  id=""
                  className="search-input py-1 pr-2 ps-10 md:w-80 w-40 rounded-md	text-black"
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <div className="absolute fs-5 bottom-1 left-2 text-black">
                  <BiSearch />
                </div>
              </div>
            </Col>
          </div>
        </Container>
      </div>
      <div className="md:ps-24 ps-10">
        <Breadcrumb className="font-bold">
          <Breadcrumb.Item
            linkAs={Link}
            linkProps={{ to: routeUrls.DASHBOARD }}
          >
            Dashboard
          </Breadcrumb.Item>
          <Breadcrumb.Item
            linkAs={Link}
            linkProps={{ to: routeUrls.ARCHITECTURELIST }}
          >
            Architecture List
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="container my-5 table-auto">
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Architecture Name</TableCell>
                <TableCell align="center" className="font-bold">
                  Detalis
                </TableCell>
                <TableCell align="center">Delete</TableCell>
                <TableCell align="center">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {architecture
                ? architecture.map((row) =>
                    row && row.architecsName ? (
                      <Row key={row._id} row={row} setArchitecture={setArchitecture} />
                    ) : null
                  )
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
