import { useState, FC } from 'react'
import { useRouter } from 'next/router'
import ReactTooltip from 'react-tooltip'

// Styles & Icons
import styles from './Blog.module.scss'
import { MdModeEdit, MdDelete, MdRemoveRedEye } from 'react-icons/md'

export const BlogItem: FC<{
    title: string,
    toggleModal: Function,
    toggleModal2: Function,
    selected: number | null | undefined,
    slug: string
    editSelected: Function,
    deleteSelected: Function
    id: number}> = ({title, toggleModal, editSelected, slug, id, toggleModal2, deleteSelected}) => {

    const router = useRouter()
    const [showOptions, setShowOptions] = useState(false)

    return (
        <div onMouseOver={() => setShowOptions(true)}
            onMouseLeave={() => setShowOptions(false)}
            className={styles.blog}>

            <h3> {title} </h3>

            { showOptions ? <div className={styles.options}>
                <div className={styles.optionicon}>
                    <MdRemoveRedEye data-tip="Preview" onClick={() => {
                        router.push(`/admin/auth/preview/${slug}`)
                    }} color="white" size="18" />
                </div>
                <div className={styles.optionicon}>
                    <MdModeEdit data-tip="Edit" onClick={() => {
                        toggleModal(true)
                        editSelected(id)
                    }} color="white" size="18" />
                </div>
                <div className={styles.optionicon}>
                    <MdDelete onClick={() => {
                        toggleModal2(true)
                        deleteSelected(id)
                    }} data-tip="Delete" color="white" size="18" />
                </div>

                <ReactTooltip className={styles.tooltip}/>
            </div> : "" }
            
        </div>
    )

}