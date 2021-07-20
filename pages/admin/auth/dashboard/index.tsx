import { NextPage, GetServerSideProps } from 'next'
import cookies from 'next-cookies'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useState } from 'react'

// Typescript
import { Iblog } from '../../../../ts/blogs'
import { Istate } from '../../../../ts/state'

// Components
import { BlogItem } from '../../../../components/blogitem/blogItem'
import { ModalChildren } from '../../../../components/childrenModal/modal'

// Styles & Icons
import styles from './Dashboard.module.scss'
import { MdClose } from 'react-icons/md'

export const getServerSideProps: GetServerSideProps = async ({req}) => {

    const tae = cookies({req}).tmdevtoken
    
    if (!tae) {
        return {
            redirect: {
                destination: '/admin/auth/login',
                permanent: false
            },
        }
    }

    const {data: allBlogs} = await axios.get<Iblog[]>('http://localhost:1337/blogs')

    return {
        props: {
            allBlogs
        }
    }

}

const Dashboard: NextPage<{allBlogs: Iblog[]}> = ({allBlogs}) => {

    const username = useSelector((state: Istate) => state.auth.username)
    const [editStatus, setEditStatus] = useState(false)

    return (
        <div className={styles.container} >
            <main className={styles.main}>
                
                <div className={styles.title}>
                    <h1> Hi {username} </h1>
                </div>

                <div className={styles.dashboardroot}>
                    <div className={styles.totalblogs}>
                        <h1> Total Blogs </h1>
                        <p> {allBlogs.length} </p>
                    </div>

                    <div className={styles.blogslist}>
                        <h1> Manage Blogs </h1>
                        <div className={styles.blogs}>
                            { allBlogs.map(item => {
                                return <BlogItem toggleModal={setEditStatus} key={item.slug} title={item.title} />
                            }) }
                        </div>
                    </div>

                    {/* Edit Modal */}
                    { editStatus && <ModalChildren toggleModal={setEditStatus} >
                        {/* <div className={styles.closebtn}> <MdClose size="22"/> </div> */}
                        <form className={styles.editmodal} >
                            <div className={styles.closebtn}> <MdClose className={styles.close} size="25"/> </div>
                            <div className={styles.edit}>
                                <label htmlFor="title"> Blog Title </label>
                                <input type="text" name=""/>
                                <label htmlFor="description"> Blog Description </label>
                                <textarea name="" cols={30} rows={10}></textarea>

                                <button> Update </button>
                            </div>
                        </form>
                    </ModalChildren> }

                </div>

            </main>
        </div>
    )

}

export default Dashboard

{/* { allBlogs.map(item => {
    return <div className={styles.blog} key={item.slug}>
        <h3> {item.title} </h3>
        <div className={styles.options}>
            <MdModeEdit size="22" />
            <MdDelete size="22" />
        </div>
    </div>
}) } */}