import type { Patient } from "../../types/Patient";
import styles from "./PatientCard.module.css";
import seeMore from "../../assets/icons/seeMore.svg";
import PatientForm from "../PatientForm/PatientForm";
import { useState } from "react";

interface PatientCardProps {
  patient: Patient;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  const [openModalForm, setOpenModalForm] = useState<boolean>(false);
  const handleOpenEditForm = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setOpenModalForm(true);
  };
  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <>
      <article
        className={styles.patientCard}
        key={patient.id}
        onClick={handleOpenEditForm}
      >
        <div className={styles.patientInformation}>
          <div className={styles.patientAvatarContainer}>
            <img
              src={patient.avatar || defaultAvatar}
              alt={patient.name}
              className={styles.patientAvatar}
              height={50}
              width={50}
               onError={(e) => {
                // Si la imagen falla, se reemplaza por la imagen por defecto
                (e.currentTarget as HTMLImageElement).src = defaultAvatar;
              }}
            />
          </div>
          <div className={styles.patientName}>
            <span>{patient.name}</span>
          </div>
        </div>
        <div className={styles.patientActions}>
          <button className={styles.seeMoreBtn}>
            <img src={seeMore} alt="edit Icon" />
          </button>
        </div>
      </article>
      {openModalForm ? (
        <PatientForm
          mode="view"
          patient={patient}
          onClose={() => setOpenModalForm(false)}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default PatientCard;
