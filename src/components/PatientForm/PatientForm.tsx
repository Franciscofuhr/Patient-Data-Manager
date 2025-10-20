import React, { useState, useEffect, useMemo } from "react"
import styles from "./PatientForm.module.css"
import type { Patient } from "../../types/Patient"
import deleteIcon from "../../assets/icons/delete.svg"
import editIcon from "../../assets/icons/edit.svg"
import crossIcon from "../../assets/icons/cross.svg"
import { usePatients } from "../../context/PatientsContext"
import { useToast } from "../../context/ToastContext/ToastContext"

type Mode = "view" | "edit" | "create"

interface PatientFormProps {
  mode: Mode
  patient?: Patient
  onClose: () => void
}

const PatientForm: React.FC<PatientFormProps> = ({ mode, patient, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    description: "",
    website: "",
  })
  const [confirmDeletion, setConfirmDeletion] = useState(false)
  const [formMode, setFormMode] = useState<Mode>(mode)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { addPatient, updatePatient, deletePatient } = usePatients()
  const { showToast } = useToast()
  const isReadOnly = useMemo(() => formMode === "view", [formMode])

  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name || "",
        avatar: patient.avatar || "",
        description: patient.description || "",
        website: patient.website || "",
      })
    }
  }, [patient])

  const isValidURL = (value: string): boolean => {
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  }

  const validate = (): boolean => {
    if (isReadOnly) return true
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.avatar.trim()) {
      newErrors.avatar = "Avatar is required"
    } else if (!isValidURL(formData.avatar)) {
      newErrors.avatar = "Must be a valid URL"
    }
    if (formData.website && !isValidURL(formData.website)) {
      newErrors.website = "Must be a valid URL"
    }
    if (formData.description.length > 500)
      newErrors.description = "The description cannot exceed 500 characters."

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const dataToSubmit: Omit<Patient, "id" | "createdAt"> = {
      name: formData.name.trim(),
      avatar: formData.avatar.trim(),
      description: formData.description.trim(),
      website: formData.website.trim(),
    }

    if (formMode === "create") {
      addPatient(dataToSubmit)
      showToast("Patient created succesfully", "success")
      onClose()
    } else if (formMode === "edit" && patient) {
      updatePatient({ ...patient, ...dataToSubmit })
      setFormMode("view")
      showToast("Patient edited succesfully", "success")
    }
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleOpenConfirmationDeletion = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setConfirmDeletion(true)
  }

  const handleCancelDeletion = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setConfirmDeletion(false)
  }

  const handleConfirmDeletion = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (patient?.id) {
      deletePatient(patient.id)
      setConfirmDeletion(false)
      onClose()
      showToast("Patient Deleted succesfully", "success")
    }
  }

  const title = useMemo(() => {
    return formMode !== "create" ? "Patient Information" : "Add Patient"
  }, [formMode])

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          <img src={crossIcon} alt="Close" />
        </button>

        {!confirmDeletion ? (
          <>
            <h2>{title}</h2>

            <div className={styles.field}>
              <label htmlFor="name">Name *</label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isReadOnly}
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="avatar">Avatar URL *</label>
              <input
                id="avatar"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                disabled={isReadOnly}
              />
              {errors.avatar && <span className={styles.error}>{errors.avatar}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                disabled={isReadOnly}
              />
              {errors.description && <span className={styles.error}>{errors.description}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                disabled={isReadOnly}
              />
              {errors.website && <span className={styles.error}>{errors.website}</span>}
            </div>

            {formMode !== "view" ? (
              <button type="submit">{formMode === "create" ? "Submit" : "Save"}</button>
            ) : (
              <div className={styles.patientActions}>
                <div className={styles.editActionContainer}>
                  <button onClick={() => setFormMode("edit")}>
                    <img src={editIcon} alt="edit Icon" />
                  </button>
                </div>
                <div className={styles.deleteActionContainer}>
                  <button onClick={handleOpenConfirmationDeletion}>
                    <img src={deleteIcon} alt="delete Icon" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className={styles.confirmDeletionContainer}>
            <h3>Confirm deletion</h3>
            <p>Are you sure you want to delete <strong>{patient?.name}</strong>?</p>
            <div className={styles.confirmButtons}>
              <button className={styles.cancelBtn} onClick={handleCancelDeletion}>
                Cancel
              </button>
              <button className={styles.confirmBtn} onClick={handleConfirmDeletion}>
                Yes, delete
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default PatientForm
