import { FC } from 'react'

import styles from '../../styles/Home.module.scss'

const About: FC = () => {

    return (
        <div className={styles.aboutroot} >
        <div className={styles.aboutme}>
          <h1> About Me </h1>
          <p> Hi, I&apos;m <strong> Dinmarc </strong>, I&apos;m a <strong> Web Developer </strong> specializing <strong> Javascript </strong> as main language.
          I loved and like to create stuffs I always want to discover new things in my specialized language I&apos;m currently advancing my knowledge about Javascript both Frontend & Backend.
          </p> 
        </div>
      </div>
    )

}

export default About