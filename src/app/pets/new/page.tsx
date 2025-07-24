import styles from "../../page.module.css";
import CreatePetForm from "./CreatePetForm";

export default function NewPetPage() {
  return (
    <main className={styles.main}>
      <CreatePetForm />
    </main>
  );
}
