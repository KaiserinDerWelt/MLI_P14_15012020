import "./App.css";
import CreateEmployeePage from "./pages/CreateEmployeePage";
import EmployeeListPage from "./pages/EmployeeListPage";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={CreateEmployeePage} exact />
      <Route path="/employees" component={EmployeeListPage} />
    </BrowserRouter>
  );
}

export default App;
