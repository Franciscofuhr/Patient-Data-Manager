import "./App.css";
import ErrorState from "./components/ErrorState/ErrorState";
import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";
import PatientList from "./components/PatientList/PatientList";
import { usePatients } from "./context/PatientsContext";

function App() {
  const { loading, error } = usePatients();

  return (
    <>
      <div className="contentContainer">
        <Header />
        {loading ? <Loader /> : error ? <ErrorState /> : <PatientList />}
      </div>
    </>
  );
}

export default App;
