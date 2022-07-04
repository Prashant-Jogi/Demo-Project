/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from "react";
import "./demo.css";
import {
  AddData,
  ChangeData,
  DeleteData,
  ShowData,
  updateData,
} from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Update from "./CRUD/Update";
import { Modal } from "react-bootstrap";
export default function FormDialog() {
  const [inData, setInData] = useState({
    fname: "",
    lname: "",
    email: "",
    role: "",
    _id: "",
  });
  const [shData, setShData] = useState([]);
  const [findData, setFindData] = useState("");
  const [open, setOpen] = useState(false);
  const [chData, setChData] = useState({});
  const dispatch = useDispatch(ShowData());
  const select = useSelector((state) => state.getTableData.tableData);
  const [Error, setError] = useState({
    FnameError: null,
    LnameError: null,
    EmailError: null,
    RoleError: null,
  });

  useEffect(() => {
    dispatch(ShowData());
  }, []);

  useEffect(() => {
    setShData(select);
  }, [select !== shData]);
  console.log(select, "select");

  const validate = () => {
    let fnameError = "";
    let lnameError = "";
    let emailError = "";
    let roleError = "";

    const { fname, lname, email, role } = inData;
    if (!fname) {
      fnameError = "Please Enter First Name";
    }
    if (!lname) {
      lnameError = "Please Enter Last Name";
    }
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email || reg.test(email) === false) {
      emailError = "Please Enter Valid Email";
    }
    // const phone_reg = /^[+91]*([0-9]\d{10})$/;
    if (!role) {
      roleError = "Please Enter Role";
    }
    if (fnameError || lnameError || emailError || roleError) {
      setError({ fnameError, lnameError, emailError, roleError });

      return true;
    }
    return false;
  };

  const defaultState = {
    fname: null,
    lname: null,
    email: null,
    role: null,
    fnameError: null,
    lnameError: null,
    emailError: null,
    roleError: null,
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    console.log(inData, "in data");
    setShData((prev) => {
      return [...prev, inData];
    });
    const abc = "prashant";
    dispatch(AddData(inData));
    dispatch(updateData(shData));
    // dispatch(ShowData());

    setOpen(false);
    // if (validate()) {
    //   console.log(this.state.Error);

    //   setError(defaultState);
    // }
  };
  const handleChangeInput = (e) => {
    setInData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(e.target.value, "slect tag value");
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const handleSearchInput = (e) => {
    setFindData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  // console.log(findData.find_input,'find data');
  const click = (id, ndata) => {
    console.log(ndata, "ndata");
    setChData(() => {
      return {
        fname: ndata.fname,
        lname: ndata.lname,
        email: ndata.email,
        role: ndata.role,
        _id: id,
      };
    });
    modalShow();
  };

  const [show, setShow] = useState(false);

  const modalClose = () => setShow(false);
  const modalShow = () => setShow(true);
  const changes = () => {
    // const chData = {
    //   name: select.name,
    //   email: select.email,
    //   number: select.number,
    // };
    // const dataArr = { data };
    // console.log(dataArr, "dataArr befor");
    console.log(shData, "shdata");
    shData.map((Data) => {
      if (Data._id === chData._id) {
        Object.keys(Data).map((key) => {
          Data[key] = chData[key];
          // console.log(chData[key], "key");
          // console.log(chData, "indata");
          // console.log(shData, "shdata");
        });
      }
    });
    const id = chData._id;
    dispatch(ChangeData(chData, id));
    dispatch(updateData(shData));
    console.log(chData, "chData");
    modalClose();
  };
  const updateChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setChData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const Delete = (id) => {
    const updated = select.filter((item) => item._id !== id);

    console.log(updated, "updated");
    console.log(id, "id");
    setShData(updated);
    dispatch(DeleteData(id));
    dispatch(updateData(updated));
  };

  return (
    <div className="main">
      <div className="find_div">
        <select
          name="role"
          defaultValue="All"
          // label="Role"
          onChange={handleSearchInput}
        >
          <option value="All">All</option>
          <option value="Artist">Artist</option>
          <option value="Designer">Designer</option>
          <option value="Art Manager">Art Manager</option>
        </select>

        <input type="text" onChange={handleSearchInput} name="find"></input>
      </div>

      <div className="input_div">
        <Button variant="outlined" onClick={handleClickOpen}>
          Add New Row
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="bxtitle">Add New Employe</DialogTitle>

          <TextField
            autoFocus
            margin="dense"
            id="fname"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            name="fname"
            onChange={handleChangeInput}
          />
          <p hidden={!Error.fnameError ? true : false}>{Error.fnameError}</p>
          <TextField
            autoFocus
            margin="dense"
            id="lname"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
            name="lname"
            onChange={handleChangeInput}
          />
          <p hidden={!Error.lnameError ? true : false}>{Error.lnameError}</p>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            name="email"
            onChange={handleChangeInput}
          />
          <p hidden={!Error.emailError ? true : false}>{Error.emailError}</p>
          <select
            name="role"
            defaultValue="All"
            // label="Role"
            onChange={handleChangeInput}
          >
            <option value="Artist">Artist</option>
            <option value="Designer">Designer</option>
            <option value="Art Manager">Art Manager</option>
          </select>
          <p hidden={!Error.roleError ? true : false}>{Error.roleError}</p>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>

      <div className="showingData_div">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 150 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>First Name</StyledTableCell>
                <StyledTableCell align="right">Last Name</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Role</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* {shData &&
                shData > 0 &&
                shData
                  .filter((data) => {
                    if (findData.role === " ") {
                      return data;
                    }
                    if (
                      findData.role === "All" &&
                      data.fname.includes(findData.find)
                    ) {
                      return data;
                    }
                    if (
                      findData.role === "Designer" &&
                      data.role === findData.role &&
                      data.fname.includes(findData.find)
                    ) {
                      return data;
                    } else if (
                      findData.role === "Art Manager" &&
                      data.role === findData.role &&
                      data.fname.includes(findData.find)
                    ) {
                      return data;
                    } else if (
                      findData.role === "Artist" &&
                      data.role === findData.role &&
                      data.fname.includes(findData.find)
                    ) {
                      return data;
                    }
                  }) */}
              {shData &&
                shData.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.fname}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.lname}</StyledTableCell>
                    <StyledTableCell align="right">{row.email}</StyledTableCell>
                    <StyledTableCell align="right">{row.role}</StyledTableCell>
                    <button
                      onClick={() => {
                        click(row._id, row);
                      }}
                    >
                      Change
                    </button>
                    <button
                      onClick={() => {
                        Delete(row._id);
                      }}
                    >
                      Delete
                    </button>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
          <Modal show={show} onHide={modalClose}>
            <Modal.Body>
              <table>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
                <tr>
                  <td>
                    <input
                      contentEditable={true}
                      id="fname"
                      type="text"
                      name="fname"
                      value={chData.fname}
                      onChange={updateChange}
                    />
                  </td>
                  <td>
                    <input
                      contentEditable={true}
                      id="lname"
                      type="text"
                      name="lname"
                      value={chData.lname}
                      onChange={updateChange}
                    />
                  </td>
                  <td>
                    <input
                      contentEditable={true}
                      id="email"
                      type="text"
                      name="email"
                      value={chData.email}
                      onChange={updateChange}
                    />
                  </td>

                  <td>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      onChange={updateChange}
                      value={chData.role}
                      name="role"
                    >
                      <option selected>Select Role</option>
                      <option value="artist">Artist</option>
                      <option value="designer">Designer</option>
                      <option value="manager">Art Manager</option>
                    </select>
                  </td>
                </tr>
              </table>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={modalClose}>
                Close
              </Button>
              <Button variant="primary" onClick={changes}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </TableContainer>
      </div>
    </div>
  );
}
