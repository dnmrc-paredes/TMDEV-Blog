import { FC } from 'react'
import Image from 'next/image'

import styles from '../../styles/Home.module.scss'

const Gallery: FC = () => {

    return (
        <div className={styles.galleryroot}>
            <h1> Gallery </h1>
          {/* <video autoPlay width="330px" controls src="http://localhost:1337/uploads/tekken.mp4" /> */}
            <div className={styles.galleryitem}>

            <div className={styles.item}>
                <div className={styles.img1}>
                    <Image height={200} width={360} src="/loremstudios.PNG" alt="Lorem Studios" /> 
                </div>
                <div className={styles.img2}>
                    <Image height={200} width={360} src="/blazingreaders.PNG" alt="Blazing Readers" />
                </div> 
            </div>

            <div className={styles.item}>
                <div className={styles.img1}>
                    <Image height={200} width={360} src="/lorembank.PNG" alt="Lorem Bank" /> 
                </div>
                <div className={styles.img2}>
                    <Image height={200} width={360} src="/sociallorem.PNG" alt="Social Lorem" />
                </div> 
            </div>

          </div>
      </div>
    )

}

export default Gallery