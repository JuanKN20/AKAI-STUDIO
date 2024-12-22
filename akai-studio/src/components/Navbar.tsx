import React from "react";
import styles from "../styles/Navbar.module.css";

const Navbar: React.FC = () => {
    return (
        <header className={styles.Barra}>

            <div className={styles.BarraIzquierda}>

                <div className={styles.Logo}>
                    <img src="src/assets/Recurso 1.png" alt="Logo" />
                </div>
                <nav className={styles.navLinks}>
                    <a href="#home">Inicio</a>
                    <a href="#about">Noticias</a>
                    <a href="#games">Juegos</a>
                    <a href="#services">Servicios</a>
                    <a href="#contact">Contacto</a>
                </nav>


            </div>
           
            <div className={styles.barraDerecha}>
                <div className={styles.searchBar}>
                    <input type="text" placeholder="Buscar..." />
                    <button type="submit">🔍</button>
                </div>
                <button className={styles.loginButton}>Iniciar Sesión</button>

            </div>

            <div className={styles.segunda}>
                <video autoPlay muted loop className={styles.video}>
                    <source src="src\assets\Itachi.mp4" type="video/mp4"></source>
                    tu navegador no soporta el video
                </video>
            <div className={styles.segundaContent}>
                <h1 className={styles.segTitle}>Sombras que narran historais,</h1>
                <h1 className={styles.segTitle}>que transforman realidades.</h1>
                <button className={styles.segButton}>Nuestros trabajos</button>

            </div>
            </div>
        </header>
    );
};
export default Navbar;