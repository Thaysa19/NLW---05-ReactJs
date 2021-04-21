
import styles from "./styles.module.scss";
export function Header(){
    return(
     <header className={styles.headerContainer}>
       <img src="/logo.svg" alt="Podcastr"/> 

       <p>O melhor lugar para ouvir
       </p>
       <span>Quinta, 8 de Abril</span>
     </header>
     
    );
}