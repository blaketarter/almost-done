import Todos from "./components/Todos"
import styles from "./page.module.css"

export default function Home() {
  return (
    <main className={styles.main}>
      <Todos />
    </main>
  )
}
