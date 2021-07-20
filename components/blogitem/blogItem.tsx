import { useState, FC } from 'react'

// Styles & Icons
import styles from './Blog.module.scss'
import { MdModeEdit, MdDelete } from 'react-icons/md'

export const BlogItem: FC<{title: string, toggleModal: Function}> = ({title, toggleModal}) => {

    const [showOptions, setShowOptions] = useState(false)

    return (
        <div onMouseOver={() => setShowOptions(true)}
            onMouseLeave={() => setShowOptions(false)}
            className={styles.blog}>

            <h3> {title} </h3>

            { showOptions ? <div className={styles.options}>
                <div className={styles.optionicon}>
                    <MdModeEdit onClick={() => toggleModal(true)} color="white" size="20" />
                </div>
                <div className={styles.optionicon}>
                    <MdDelete color="white" size="20" />
                </div>
            </div> : "" }
            
        </div>
    )

}