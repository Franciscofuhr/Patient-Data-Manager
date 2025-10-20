import { createContext, useContext, useEffect, useState } from "react"
import { getPatients } from "../api/patients"
import type { Patient } from "../types/Patient"
import generateRandomId from "../utils/generateRandomId"

interface PatientsContextType {
  patients: Patient[]
  loading: boolean
  error: string | null
  addPatient: (p: Omit<Patient, "id" | "createdAt">) => void
  updatePatient: (p: Patient) => void
  deletePatient: (id: string) => void
}

const PatientsContext = createContext<PatientsContextType | undefined>(undefined)

export const PatientsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getPatients()
      .then(setPatients)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const addPatient = (p: Omit<Patient, "id" | "createdAt">) => {
    const newPatient: Patient = {
      ...p,
      id: generateRandomId(8),
      createdAt: new Date().toISOString(),
    }
    setPatients((prev) => [...prev, newPatient])
  }

  const updatePatient = (p: Patient) => {
    console.log("patient")
    setPatients((prev) => prev.map((x) => (x.id === p.id ? p : x)))
    console.log("patient", patients)
  }

  const deletePatient = (id: string) => {
    setPatients((prev) => prev.filter((x) => x.id !== id))
  }

  return (
    <PatientsContext.Provider value={{ patients, loading, error, addPatient, updatePatient, deletePatient }}>
      {children}
    </PatientsContext.Provider>
  )
}

export const usePatients = (): PatientsContextType => {
  const ctx = useContext(PatientsContext)
  if (!ctx) throw new Error("usePatients must be used within a PatientsProvider")
  return ctx
}
