import React from "react";

// Styles
import styles from './Footer.module.scss'

const Footer = () => {

    const year = new Date().getFullYear()

    return (
        <footer className={styles.footer} >
            <p> Created with Next JS, Deployed in Vercel &copy; TMDEV {year} </p>  
        </footer>
    )

}

export default Footer