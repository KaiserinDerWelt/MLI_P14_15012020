import React, { useState } from "react";
import "../stylesheets/CreateEmployeePage.css";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Modal from "../jquery-modal/Modal";
import states from "./states";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function CreateEmployeePage() {
  const [isOpen, isOpenSet] = useState(false);
  const [firstName, firstNameSet] = useState("");
  const [lastName, lastNameSet] = useState("");
  const [dateOfBirth, dateOfBirthSet] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const [startDate, startDateSet] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const [street, streetSet] = useState("");
  const [city, citySet] = useState("");
  const [state, stateSet] = useState("");
  const [zipCode, zipCodeSet] = useState("");
  const [department, departmentSet] = useState("");

  // To close the modal
  function handleClose() {
    isOpenSet(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let employees;
    // Get all employees data from localStorage
    if (localStorage.getItem("employees")) {
      employees = JSON.parse(localStorage.getItem("employees"));
    } else {
      employees = [];
    }

    // Add the new employee to localStorage
    employees.push({
      id: makeid(16),
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      startDate: startDate,
      street: street,
      city: city,
      state: state,
      zipCode: zipCode,
      department: department,
    });

    // Save the employees data to localStorage again
    localStorage.setItem("employees", JSON.stringify(employees));

    // Clear the form fields
    firstNameSet("");
    lastNameSet("");
    dateOfBirthSet(new Date().toISOString().slice(0, 10));
    startDateSet(new Date().toISOString().slice(0, 10));
    streetSet("");
    citySet("");
    stateSet("");
    zipCodeSet("");
    departmentSet("");

    // Scroll to the top of the form
    window.scroll(0, 0);

    // Show the modal to inform the user that a new employee has been created
    isOpenSet(true);
  }

  return (
    <div>
      <Container maxWidth="sm">
        <div className="title">
          <h1>HRnet</h1>
        </div>
        <div className="container">
          <Link to="/employees">View Current Employees</Link>
          <h2>Create Employee</h2>
          <form onSubmit={handleSubmit}>
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
            <fieldset>
              <legend>Address</legend>
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
              <FormControl
                fullWidth
                margin="normal"
                variant="outlined"
                required
              >
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
            </fieldset>
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

            <Button color="primary" variant="contained" type="submit">
              Save
            </Button>
          </form>
        </div>
      </Container>

      <Modal open={isOpen} onClose={handleClose}>
        Employee Created!
      </Modal>
    </div>
  );
}

export default CreateEmployeePage;
