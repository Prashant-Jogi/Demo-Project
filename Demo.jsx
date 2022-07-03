import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import './demo.css'
export default function FormDialog() {
  const [inData,setInData] = useState();
  const [shData,setShData] = useState([]);
  const [findData,setFindData] = useState();
  const [open, setOpen] = useState(false);
  const [Error, setError] = useState({
    FnameError: null,
    LnameError: null,
    EmailError: null,
    RoleError: null,
  });
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
    if (!role ) {
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
    role: null,fnameError:null, lnameError:null, emailError:null, roleError:null,

  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setShData((prev)=>{
      return[...prev,inData]
    });
    if (validate()) {
      console.log(this.state.Error);

      setError(defaultState);
    }
    setOpen(false);

  };

  const handleChangeInput = (e) =>{
        setInData((prev)=>{
            return{...prev,[e.target.name]:e.target.value}
        });
  }

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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const handleSearchInput = (e) =>{
        setFindData((prev)=>{
          return{
            ...prev,[e.target.name]:e.target.value,
          }
        })
        }
  // console.log(findData.find_input,'find data');

  return (
    <div className='main' >
      <div className='find_div'>
        <select
          name='role'
          defaultValue=' '
          // label="Role"
          onChange={handleSearchInput}
          >
               <option value='All'>All</option>
               <option value='Artist'>Artist</option>
          <option value='Designer'>Designer</option>
          <option value='Art Manager'>Art Manager</option>
        </select>


        <input type='text' onChange={handleSearchInput} name='find'></input>
    </div>

    <div className='input_div'>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add New Row
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id='bxtitle'>Add New Employe</DialogTitle>

          <TextField
            autoFocus
            margin="dense"
            id="fname"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            name='fname'
            onChange={handleChangeInput}
          />
          <p hidden={!Error.fnameError ? true : false}>
                {Error.fnameError}
              </p>
          <TextField
            autoFocus
            margin="dense"
            id="lname"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
            name='lname'
            onChange={handleChangeInput}
          />
           <p hidden={!Error.lnameError ? true : false}>
                {Error.lnameError}
              </p>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            name='email'
            onChange={handleChangeInput}
          />
           <p hidden={!Error.emailError ? true : false}>
                {Error.emailError}
              </p>
        <select
          name='role'
          defaultValue=' '
          // label="Role"
          onChange={handleChangeInput}
        >
          <option value='Artist'>Artist</option>
          <option value='Designer'>Designer</option>
          <option value='Art Manager'>Art Manager</option>
        </select>
        <p hidden={!Error.roleError ? true : false}>
                {Error.roleError}
              </p>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>

    </div>

    <div className='showingData_div'>

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
          {shData  &&
            shData.filter((data)=>{

              if(findData.role==='All' && data.fname.includes(findData.find)){
                return data
              }
          if(findData.role==='Designer' && data.role===findData.role && data.fname.includes(findData.find)){
            return data;

          }else if(findData.role==='Art Manager' && data.role===findData.role && data.fname.includes(findData.find)){
            return data;

          }else if(findData.role==='Artist' && data.role===findData.role && data.fname.includes(findData.find)){
            return data;
          }}).map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.fname}
              </StyledTableCell>
              <StyledTableCell align="right">{row.lname}</StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
              <StyledTableCell align="right">{row.role}</StyledTableCell>
              </StyledTableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
    </div>
    </div>
  );
}
