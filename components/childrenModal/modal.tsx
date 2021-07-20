import { FC } from 'react'

// Styles
import styles from './Modal.module.scss'

export const ModalChildren: FC<{toggleModal: Function}> = ({children, toggleModal}) => {

    return (
        <div className={styles.container}>
            <div onClick={() => toggleModal(false)} className={styles.close}></div>
            <div className={styles.modal}>
                {children}
            </div>

        </div>
    )

}
