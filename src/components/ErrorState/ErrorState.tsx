import styles from "./ErrorState.module.css";

const ErrorState: React.FC = () => {
  return (
    <div className={styles.errorState}>
      <h2 className={styles.errorTitle}>Error Fetching the patients</h2>
      <p className={styles.errorText}>
        Please reload the page.
      </p>
    </div>
  );
};

export default ErrorState;
