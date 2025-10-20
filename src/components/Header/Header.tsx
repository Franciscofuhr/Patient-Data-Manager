import styles from "./Header.module.css";
import logo from "../../assets/header/logo.png";
import { useState } from "react";
import PatientForm from "../PatientForm/PatientForm";

const Header: React.FC = () => {
  const [openModalForm, setOpenModalForm] = useState<boolean>(false);
  const handleOpenCreateForm = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setOpenModalForm(true);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logoContainer}>
            <img src={logo} alt="Logo" className={styles.logo} />
          </div>
          <button
            className={styles.addPatientButton}
            onClick={handleOpenCreateForm}
          >
            Add Patient
          </button>
        </div>
      </header>
      {openModalForm ? (
        <PatientForm mode="create" onClose={() => setOpenModalForm(false)} />
      ) : (
        <></>
      )}
    </>
  );
};

export default Header;
