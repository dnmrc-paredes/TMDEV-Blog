import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import axios from 'axios'
import { useRouter } from 'next/router'

// Typescript
import { Iblog } from '../../ts/blogs'

// Styles
import styles from './Blog.module.scss'

export const getStaticPaths: GetStaticPaths = () => {

    return {
        paths: [
            { params: { blogid: '1' } }
        ],
        fallback: 'blocking'
    }

}

export const getStaticProps: GetStaticProps = async ({params}) => {

    const param = params as {blogid: string}
    const {data: blog} = await axios.get(`http://localhost:1337/blogs?slug=${param.blogid}`)

    return {
        props: {
            blogSlug: param.blogid,
            blog
        }
    }

}

const Blog: NextPage<{blog: Iblog[]}> = ({blog}) => {

    const router = useRouter()
    
    return (
        <div className={styles.container}>
            <Head>
                <title> {blog[0].title} </title>
            </Head>

            <main>
                <section id={styles.blog}>
                    <div className={styles.blogimg}>
                        <Image height={400} width={720} src={`http://localhost:1337${blog[0].blogImg.url}`} alt="blogimage" />
                    </div>

                    <div className={styles.title}>
                        <h1> {blog[0].title} </h1>
                    </div>

                    <div className={styles.description}>
                        <p> {blog[0].description} </p>
                    </div>

                    <div className={styles.goback}>
                        <button onClick={() => router.back()} > Go Back </button>
                    </div>
                </section>
            </main>
        </div>
    )

}

export default Blog