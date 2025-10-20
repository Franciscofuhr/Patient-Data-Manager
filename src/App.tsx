import "./App.css";
import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";
import PatientList from "./components/PatientList/PatientList";
import { usePatients } from "./context/PatientsContext";


function App() {
  const { loading } = usePatients();

  return (
    <>
      <div className="contentContainer">
        <Header />
        {loading ? <Loader /> : <PatientList />}
      </div>
    </>
  );
}

export default App;
