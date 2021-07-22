import { FC } from 'react'

// Styles
import styles from './Modal.module.scss'

export const ModalChildren: FC<{toggleModal: Function, editSelected: Function}> = ({children, toggleModal, editSelected}) => {

    return (
        <div className={styles.container}>
            <div onClick={() => {
                toggleModal(false)
                editSelected("")
            }} className={styles.close}></div>
            <div className={styles.modal}>
                {children}
            </div>

        </div>
    )

}
