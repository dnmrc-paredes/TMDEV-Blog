import { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import cookies from 'next-cookies'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import slugify from 'slugify'
import { useState, useEffect, FormEvent } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { BounceLoader, BeatLoader } from 'react-spinners'
import InfiniteScroll from 'react-infinite-scroll-component'

// Helpers
import { URL } from '../../../../helpers/url'

// Typescript
import { Iblog } from '../../../../ts/blogs'
import { Istate } from '../../../../ts/state'

// Components
import { BlogItem } from '../../../../components/blogitem/blogItem'
import { ModalChildren } from '../../../../components/childrenModal/modal'

// Styles & Icons
import styles from './Dashboard.module.scss'
import { MdClose } from 'react-icons/md'
import 'react-toastify/dist/ReactToastify.css';
import { ChangeEvent } from 'react'

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

    const {data: allBlogs} = await axios.get<Iblog[]>(`${URL}/blogs?_limit=5&_sort=published_at:DESC`)
    const {data: total} = await axios.get<Iblog[]>(`${URL}/blogs`)

    return {
        props: {
            allBlogs,
            totalBlogs: total.length,
            token: tae
        }
    }

}

const Dashboard: NextPage<{allBlogs: Iblog[], token: string, totalBlogs: number}> = ({allBlogs, token, totalBlogs}) => {

    const router = useRouter()
    const username = useSelector((state: Istate) => state.auth.username)
    const [myBlogs, setMyBlogs] = useState<Iblog[]>(allBlogs)
    const [pageLimit, setPageLimit] = useState(5)
    const [hasMore, setHasMore] = useState(true)
    const [uploadLoading, setUploadLoading] = useState(false)
    const [createStatus, setCreateStatus] = useState(false)
    const [editStatus, setEditStatus] = useState(false)
    const [deleteStatus, setDeleteStatus] = useState(false)
    const [toBeEdited, setToBeEdited] = useState<number | undefined | null>()
    const [toBeDeleted, setToBeDeleted] = useState<number | undefined | null>()
    const [edit, setEdit] = useState({
        title: "",
        description: ""
    })
    const [createBlog, setCreateBlog] = useState({
        title: "",
        description: ""
    })
    
    useEffect(() => {
        const foundBlog = allBlogs.filter(item => item.id === toBeEdited)[0]
        if (toBeEdited) {
            setEdit({
                title: foundBlog.title,
                description: foundBlog.description
            })
        }
    }, [toBeEdited, allBlogs])

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get(`${URL}/blogs?_limit=${pageLimit}&_sort=published_at:DESC`)
            
            if (data.length >= totalBlogs) {
                setHasMore(false)
                return setMyBlogs(data)
            }

            setMyBlogs(data)
        }

        fetchData()

    }, [pageLimit, totalBlogs, editStatus])

    const handleChange = (e: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
        // console.log(e.target.files![0])
        const {value, name} = e.target

        setCreateBlog({
            ...createBlog,
            [name]: value
        })
    }

    const submitEdit = async (e: FormEvent) => {
        e.preventDefault()
        
        const {title, description} = edit
        const newSlug = slugify(title, {lower: true, trim: true})
        const updatedBlog = {
            title,
            description,
            slug: newSlug
        }
        // console.log(newSlug)
        // console.log(toBeEdited)
        const {status} = await axios.put(`${URL}/blogs/${toBeEdited}`, updatedBlog, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        
        if (status === 200) {
            toast('Blog Updated.', {type: 'success'})
            setEditStatus(false)
            return router.push(router.asPath)
        }
    }

    const submitDelete = async () => {
        const {status} = await axios.delete(`${URL}/blogs/${toBeDeleted}`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })

        if (status === 200) {
            toast('Blog Deleted.', {type: 'success'})
            setDeleteStatus(false)
            return router.push(router.asPath)
        }

    }

    const submitCreate = async (e: any) => {
        e.preventDefault()

        if (!e.target[0].files[0]) {

            const formData = new FormData()

            const tae = {
                title: createBlog.title,
                description: createBlog.description,
                slug: slugify(createBlog.title, {lower: true, trim: true})
            }
            
            setUploadLoading(true)
            formData.append('data', JSON.stringify(tae))
            const {status} = await axios.post(`${URL}/blogs`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }) as {data: Iblog, status: number}

            if (status === 200) {
                setUploadLoading(false)
                toast('Blog Created.', {type: 'success'})
                setCreateBlog({
                    title: "",
                    description: ""
                })
                setCreateStatus(false)
                return router.push(router.asPath)
            }

            // return toast('Please provide an image.', {type : 'error'})
        }

        if (!createBlog.title || !createBlog.description) {
            return toast('Please provide all inputs.', {type: 'error'})
        }

        const imgData = new FormData()
        imgData.append('files', e.target[0].files[0])

        setUploadLoading(true)
        const {status: fileStatus, data: data2} = await axios.post(`${URL}/upload`, imgData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })

        if (fileStatus === 200) {

            const formData = new FormData()

            const tae = {
                title: createBlog.title,
                description: createBlog.description,
                slug: slugify(createBlog.title, {lower: true, trim: true}),
                blogUrl: data2[0].url
            }

            formData.append('data', JSON.stringify(tae))
            const {status} = await axios.post(`${URL}/blogs`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }) as {data: Iblog, status: number}

            if (status === 200) {
                setUploadLoading(false)
                toast('Blog Created.', {type: 'success'})
                setCreateBlog({
                    title: "",
                    description: ""
                })
                setCreateStatus(false)
                return router.push(router.asPath)
            }

        }


    }

    if (uploadLoading) return <div className="loaderbox">
        <div className="loader">
            <BounceLoader color={'#0C2D48'}/>
        </div>
    </div>

    return (
        <div className={styles.container} >
            <Head>
                <title> Dashboard </title>
            </Head>

            <main className={styles.main}>
                
                <div className={styles.title}>
                    <h1> Hi {username} </h1>
                </div>

                <div className={styles.dashboardroot}>
                    <div className={styles.totalblogs}>
                        <h1> Total Blogs </h1>
                        <p> {totalBlogs} </p>
                    </div>

                    <div className={styles.blogslist}>
                        <h1> Manage Blogs </h1>

                        <div className={styles.addblog}>
                            <button onClick={() => setCreateStatus(true)}> Add </button>
                        </div>

                        { myBlogs.length === 0 ? <h2 className="noblogs"> No Blogs </h2> : 
                            <InfiniteScroll
                            dataLength={myBlogs.length}
                            next={() => setPageLimit(prev => prev+=5)}
                            loader={ <div className="moonloader"> <BeatLoader size={15} color={'#0C2D48'} /> </div> }
                            hasMore={hasMore}
                            endMessage={<p className="max"> Max results </p>}
                            height={200}
                            className={styles.blogs}
                            hasChildren={true}
                            >

                            { myBlogs.map(item => {
                                return <BlogItem selected={toBeEdited} id={item.id} editSelected={setToBeEdited} deleteSelected={setToBeDeleted} toggleModal={setEditStatus} toggleModal2={setDeleteStatus} key={item.slug} slug={item.slug} title={item.title} />
                            }) }

                        </InfiniteScroll> }

                    </div>

                    {/* Edit Modal */}

                    { editStatus && <ModalChildren editSelected={setToBeEdited} toggleModal={setEditStatus} >
                        {/* <div className={styles.closebtn}> <MdClose size="22"/> </div> */}
                        <form onSubmit={submitEdit} className={styles.editmodal} >
                            <div className={styles.closebtn}> <MdClose onClick={() => {
                                setToBeEdited(null)
                                setEditStatus(false)
                            }} className={styles.close} size="25"/> </div>
                            <div className={styles.edit}>
                                <h1> Edit Blog </h1>

                                <label htmlFor="title"> Blog Title </label>
                                <input type="text" value={edit.title} onChange={(e) => setEdit({title: e.target.value, description: edit.description})} name="title"/>
                                <label htmlFor="description"> Blog Description </label>
                                <textarea name="description" value={edit.description} onChange={(e) => setEdit({description: e.target.value, title: edit.title})} cols={30} rows={10}></textarea>

                                <button> Update </button>
                            </div>
                        </form>
                    </ModalChildren> }

                    {/* Delete Modal */}

                    { deleteStatus && <ModalChildren toggleModal={setDeleteStatus} editSelected={setToBeDeleted}>
                        <div className={styles.deletemodal}>
                            <h1> Are you sure you want to delete? </h1>
                            <div className={styles.btns}>
                                <button className={styles.yes} onClick={submitDelete}> Yes </button>
                                <button className={styles.cancel} onClick={() => {
                                    setDeleteStatus(false)
                                    setToBeDeleted(null)
                                }} > Cancel </button>
                            </div>
                        </div>
                    </ModalChildren> }

                    { createStatus && <ModalChildren toggleModal={setCreateStatus}>
                        <div className={styles.createmodal}>
                            <div className={styles.close}> <MdClose onClick={() => {
                                setCreateStatus(false)
                                setCreateBlog({
                                    title: "",
                                    description: ""
                                })
                            }} className={styles.closebtn} size={25} /> </div>
                            <form encType="multipart/form-data" onSubmit={submitCreate} className={styles.createform}>
                                <h1> Create Blog </h1>

                                <label htmlFor="blogimg"> Blog Image </label>
                                <input type="file" onChange={handleChange} name="files"/>
                                <label htmlFor="title"> Blog Title </label>
                                <input type="text" onChange={handleChange} value={createBlog.title} name="title" />
                                <label htmlFor="description"> Blog Description </label>
                                <textarea name="description" value={createBlog.description} onChange={handleChange} cols={30} rows={10}></textarea>

                                <button> Create </button>
                            </form>
                        </div>
                    </ModalChildren> }

                </div>

            </main>

            <ToastContainer/>
        </div>
    )

}

export default Dashboard

