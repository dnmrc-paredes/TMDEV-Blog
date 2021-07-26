import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
// import Image from 'next/image'
import Head from 'next/head'
import axios from 'axios'
// import { useRouter } from 'next/router'

// Helpers
import { URL } from '../../helpers/url'

// Typescript
import { Iblog } from '../../ts/blogs'

// Components
import BlogPreview from '../../components/blogPreview/blogPreview'

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
    const {data: blog} = await axios.get(`${URL}/blogs?slug=${param.blogid}`)

    return {
        props: {
            blogSlug: param.blogid,
            blog
        }
    }

}

const Blog: NextPage<{blog: Iblog[]}> = ({blog}) => {
    
    return (
        <div className={styles.container}>
            <Head>
                <title> {blog[0].title} </title>
            </Head>

            <main>
                <BlogPreview title={blog[0].title} description={blog[0].description} url={blog[0].blogUrl ? blog[0].blogUrl : '/default.jpg'} />
            </main>
        </div>
    )

}

export default Blog