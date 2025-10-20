# Patient Data Manager — Frontend Application

A simple and clean **React + Vite** application built to manage patient data.  
It lets you view patients in a list, open detailed cards, and use a modal to create, edit, or delete records — all with client-side validations and toast notifications.  

⚠️ There’s **no backend persistence** — all changes live only in memory.

---

## Main Features

- Fetches the initial patient list from the API (`src/api/patients.ts`).
- Displays each patient in a card (`PatientCard`) with expandable details.
- Reusable modal for creating, editing, and deleting patients (`PatientForm`).
- Built-in client-side validation (required fields, URL format, and length).
- Custom toast notifications via context (`ToastProvider`, `useToast`, `Toast`).
- Simple, configurable pagination using the `ITEMS_PER_PAGE` constant (`src/utils/constants.ts`).

---

## Project Structure Overview

- **Entry point:** `main.tsx` — sets up `ToastProvider` and `PatientsProvider`.
- **State management:** `PatientsProvider` (`src/context/PatientsContext.tsx`).
- **API layer:** `getPatients` (`src/api/patients.ts`).
- **Constants:** `ITEMS_PER_PAGE`, `BASE_URL` (`src/utils/constants.ts`).
- **Utilities:** `generateRandomId` (`src/utils/generateRandomId.ts`).

---

## How to Run Locally

**Requirements:** Node.js ≥ 16, npm or pnpm/yarn  
**Steps:**

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in your browser
http://localhost:5173
```

## Architecture and Design Decisions (Summary)

- **React + Vite** (default configuration). Mount point: `main.tsx`.
- **Context API** for global patient state: `PatientsProvider` — simple and sufficient for this scope.
- **Notifications** handled with a separate context: `ToastProvider` and `Toast` component for centralized control.
- **Atomic and reusable components:**  
  `PatientCard`, `PatientList`, `PatientForm`, `Loader`  
  (`src/components/PatientList/PatientList.tsx`, `PatientCard.tsx`, `PatientForm.tsx`, `src/components/Loader/Loader.tsx`).
- **Modular styling (CSS Modules)** per component to avoid style leaks.
- **No external UI libraries** (Material, shadCN, etc.) — all components are built from scratch as required.

---

## Validation, Notifications, and Behavior

- Form validation in `PatientForm` (required fields, valid URLs, max 500 characters).
- Success/error notifications via `useToast`.
- No backend persistence: add/edit/delete operations only mutate the state managed by `PatientsProvider`.

---

## Pagination

Pagination uses the constant `ITEMS_PER_PAGE` (`src/utils/constants.ts`).

Formula used to calculate total pages:

totalPages = N / ITEMS_PER_PAGE

Where **N** is the total number of patients.

---

## Future Improvements

- Add backend persistence for patient data (CRUD API).  
- Implement search and filters.  
- Add loading skeletons and enhanced error handling.  
- Include unit tests for core components and contexts.  

---

## Final Notes / Disclaimer

- No personal name included in the code (maintains anonymity).  
- This implementation prioritizes **clarity**, **reusable components**, and **compliance with the challenge requirements**.
- Since many avatar URLs from the mock API were broken, I added a default image to ensure the interface looks cleaner and more consistent.



