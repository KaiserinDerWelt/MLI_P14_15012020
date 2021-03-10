import React, { useState, useEffect } from "react";
import "../stylesheets/EmployeeListPage.css";
import Container from "@material-ui/core/Container";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import Modal from "../jquery-modal/Modal";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import states from "./states";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

function EmployeeListPage() {
  const [data, dataSet] = useState([]);
  const [filteredData, filteredDataSet] = useState([]);
  const [search, searchSet] = useState("");
  const [showModal, showModalSet] = useState(false);
  const [editModal, editModalSet] = useState(false);
  const [deleteModal, deleteModalSet] = useState(false);

  const [firstName, firstNameSet] = useState("");
  const [lastName, lastNameSet] = useState("");
  const [dateOfBirth, dateOfBirthSet] = useState();

  const [startDate, startDateSet] = useState();

  const [street, streetSet] = useState("");
  const [city, citySet] = useState("");
  const [state, stateSet] = useState("");
  const [zipCode, zipCodeSet] = useState("");
  const [department, departmentSet] = useState("");

  function showOpen(e) {
    showModalSet(e.row);
  }

  function showClose() {
    showModalSet(false);
  }

  function editOpen() {
    editModalSet(showModal);
    firstNameSet(showModal.firstName);
    lastNameSet(showModal.lastName);
    startDateSet(showModal.startDate);
    dateOfBirthSet(showModal.dateOfBirth);
    streetSet(showModal.street);
    citySet(showModal.city);
    stateSet(showModal.state);
    zipCodeSet(showModal.zipCode);
    departmentSet(showModal.department);
    showModalSet(false);
  }

  function editClose() {
    showModalSet(editModal);
    editModalSet(false);
  }

  function deleteOpen() {
    deleteModalSet(showModal);
    showModalSet(false);
  }

  function deleteClose() {
    showModalSet(deleteModal);
    deleteModalSet(false);
  }

  function handleEdit(e) {
    e.preventDefault();

    // Get all employees data from localStorage
    let employees = [...data];

    let idx = employees.findIndex((i) => i.id === editModal.id);
    employees[idx] = {
      id: editModal.id,
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      startDate: startDate,
      street: street,
      city: city,
      state: state,
      zipCode: zipCode,
      department: department,
    };

    // Save to localStorage
    localStorage.setItem("employees", JSON.stringify(employees));

    // Update the state
    dataSet(employees);

    showModalSet(employees[idx]);

    editModalSet(false);
  }

  function handleDelete() {
    // Get all employees data from localStorage
    let employees = [...data];

    // Find the index of this employee
    let idx = employees.findIndex((i) => i.id === deleteModal.id);

    // Remove it
    employees.splice(idx, 1);

    // Save to localStorage
    localStorage.setItem("employees", JSON.stringify(employees));

    // Update the state
    dataSet(employees);

    deleteModalSet(false);
    showModalSet(false);
  }

  const columns = [
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "startDate", headerName: "Start Date", width: 130 },
    { field: "department", headerName: "Department", width: 130 },
    { field: "dateOfBirth", headerName: "Date of Birth", width: 140 },
    { field: "street", headerName: "Street", width: 200 },
    { field: "city", headerName: "City", width: 130 },
    { field: "state", headerName: "State", width: 90 },
    { field: "zipCode", headerName: "Zip Code", width: 130 },
  ];

  useEffect(() => {
    if (localStorage.getItem("employees")) {
      dataSet(JSON.parse(localStorage.getItem("employees")));
    }
  }, []);

  useEffect(() => {
    filteredDataSet(data);
    if (search === "") {
      filteredDataSet(data);
    } else {
      let result = [];
      if (data) {
        for (let i = 0; i < data.length; i++) {
          if (
            data[i].firstName.toLowerCase().includes(search.toLowerCase()) ||
            data[i].lastName.toLowerCase().includes(search.toLowerCase()) ||
            data[i].startDate.toLowerCase().includes(search.toLowerCase()) ||
            data[i].dateOfBirth.toLowerCase().includes(search.toLowerCase()) ||
            data[i].department.toLowerCase().includes(search.toLowerCase()) ||
            data[i].street.toLowerCase().includes(search.toLowerCase()) ||
            data[i].city.toLowerCase().includes(search.toLowerCase()) ||
            data[i].state.toLowerCase().includes(search.toLowerCase()) ||
            data[i].zipCode.toLowerCase().includes(search.toLowerCase())
          ) {
            result.push(data[i]);
          }
        }
      }

      filteredDataSet(result);
    }
  }, [data, search]);

  return (
    <div className="employeeListPage">
      <Container maxWidth="lg">
        <h1>Employee List</h1>
        <Link to="/">Add new Employee</Link>
        <div className="searchbox">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => searchSet(e.target.value)}
            autoFocus
          />
        </div>

        <DataGrid
          rows={filteredData}
          autoHeight
          columns={columns}
          pageSize={5}
          pagination
          rowsPerPageOptions={[5, 10, 20]}
          onRowClick={showOpen}
        />
      </Container>

      {/** Show Modal */}
      <Modal open={showModal} onClose={showClose}>
        <h2>
          {showModal?.firstName} {showModal?.lastName}
        </h2>
        <p>
          Department: <strong>{showModal?.department}</strong>
        </p>
        <p>
          Start Date: <strong>{showModal?.startDate}</strong>
        </p>
        <p>
          Address:{" "}
          <strong>
            {showModal?.street}, {showModal?.city}, {showModal?.state}
          </strong>
        </p>
        <p>
          Zip Code: <strong>{showModal?.zipCode}</strong>
        </p>
        <div className="modal__options">
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={deleteOpen}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={editOpen}
          >
            Edit
          </Button>
        </div>
      </Modal>

      {/** Edit Modal */}
      <Modal open={editModal} onClose={editClose}>
        <h2>
          Edit: {editModal?.firstName} {editModal?.lastName}
        </h2>
        <form className="modal__form" onSubmit={(e) => e.preventDefault()}>
          <TextField
            label="First Name"
            variant="outlined"
            margin="normal"
            value={firstName}
            onChange={(e) => firstNameSet(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Last Name"
            variant="outlined"
            margin="normal"
            value={lastName}
            onChange={(e) => lastNameSet(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Date of Birth"
            variant="outlined"
            margin="normal"
            type="date"
            value={dateOfBirth}
            defaultValue={dateOfBirth}
            onChange={(e) => dateOfBirthSet(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Start Date"
            variant="outlined"
            margin="normal"
            type="date"
            value={startDate}
            defaultValue={startDate}
            onChange={(e) => startDateSet(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Street"
            variant="outlined"
            margin="normal"
            value={street}
            onChange={(e) => streetSet(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="City"
            variant="outlined"
            margin="normal"
            value={city}
            onChange={(e) => citySet(e.target.value)}
            fullWidth
            required
          />
          <FormControl fullWidth margin="normal" variant="outlined" required>
            <InputLabel htmlFor="state-select">State</InputLabel>
            <Select
              id="state-select"
              label="State"
              value={state}
              onChange={(e) => stateSet(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {states.map((s) => (
                <MenuItem value={s.abbreviation}>{s.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Zip Code"
            variant="outlined"
            margin="normal"
            value={zipCode}
            onChange={(e) => zipCodeSet(e.target.value)}
            fullWidth
            required
          />

          <FormControl fullWidth margin="normal" variant="outlined" required>
            <InputLabel htmlFor="department-select">Department</InputLabel>
            <Select
              id="department-select"
              label="Department"
              value={department}
              onChange={(e) => departmentSet(e.target.value)}
            >
              <MenuItem value="Sales">Sales</MenuItem>
              <MenuItem value="Marketing">Marketing</MenuItem>
              <MenuItem value="Engineering">Engineering</MenuItem>
              <MenuItem value="Human Resources">Human Resources</MenuItem>
              <MenuItem value="Legal">Legal</MenuItem>
            </Select>
          </FormControl>
        </form>
        <div className="modal__options">
          <Button variant="contained" onClick={editClose}>
            Cancel
          </Button>
          <Button
            onClick={handleEdit}
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </div>
      </Modal>

      {/** Delete Modal */}
      <Modal open={deleteModal} onClose={deleteClose}>
        <h3>
          Are you sure you want to delete "{deleteModal?.firstName}{" "}
          {deleteModal?.lastName}"?
        </h3>
        <div className="modal__options">
          <Button variant="contained" onClick={deleteClose}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default EmployeeListPage;
