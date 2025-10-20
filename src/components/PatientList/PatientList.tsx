import { useState, useMemo, useEffect } from "react";
import PatientCard from "../PatientCard/PatientCard";
import styles from "./PatientList.module.css";
import { usePatients } from "../../context/PatientsContext";
import chevronRigth from "../../assets/icons/chevronRigth.svg";
import chevronLeft from "../../assets/icons/chevronLeft.svg";
import { ITEMS_PER_PAGE } from "../../utils/constants";

type SortOption = "name-asc" | "name-desc" | "newest" | "oldest";

const PatientList: React.FC = () => {
  const { patients } = usePatients();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<SortOption>("newest");

  // Empty list control outside of conditional rendering with hooks
  const hasPatients = Array.isArray(patients) && patients.length > 0;

  // Sorting
  const sortedPatients = useMemo(() => {
    if (!hasPatients) return [];
    const sorted = [...patients];
    switch (sortOption) {
      case "name-asc":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case "newest":
        return sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return sorted.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      default:
        return sorted;
    }
  }, [patients, sortOption, hasPatients]);

  // Pagination
  const totalPages = hasPatients
    ? Math.ceil(sortedPatients.length / ITEMS_PER_PAGE)
    : 1;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPatients = hasPatients
    ? sortedPatients.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    : [];

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as SortOption);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (hasPatients && currentPatients.length === 0 && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPatients, hasPatients, currentPage]);

  if (!hasPatients) {
    return (
      <div className={styles.emptyState}>
        <h2 className={styles.emptyTitle}>No patients found</h2>
        <p className={styles.emptyText}>
          Start by adding a new one to your list.
        </p>
      </div>
    );
  }

  return (
    <>
      <section className={styles.patientListContainer}>
        <div className={styles.sortContainer}>
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={handleSortChange}
            className={styles.sortSelect}
          >
            <option value="name-asc">Name (A → Z)</option>
            <option value="name-desc">Name (Z → A)</option>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>

        <div className={styles.patientList}>
          {currentPatients.map((p) => (
            <PatientCard key={p.id} patient={p} />
          ))}
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <div>
            {currentPage * ITEMS_PER_PAGE - 5} -{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, patients.length)} of{" "}
            {patients.length}
          </div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.pageButton}
          >
            <img src={chevronLeft} alt="" />
          </button>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles.pageButton}
          >
            <img src={chevronRigth} alt="" />
          </button>
        </div>
      </section>
    </>
  );
};

export default PatientList;
