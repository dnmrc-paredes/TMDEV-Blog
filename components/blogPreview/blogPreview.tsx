import { FC } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '../../pages/blog/Blog.module.scss'

const BlogPreview: FC<{title: string, description: string, url?: string}> = ({title, description, url}) => {

    const router = useRouter()
    console.log(url)

    if (url?.startsWith('/default')) {
        console.log('pota')
    }

    const ModifedImageContainer = () => {
        return (
            url?.startsWith('/default') ?
            <Image height={400} width={720} src="/default.jpg" alt={title} /> :
            <Image height={400} width={720} src={`http://localhost:1337${url}`} alt={title} /> 
        )
    }

    return (
        <section id={styles.blog}>
            <div className={styles.blogimg}>
                {/* <Image height={400} width={720} src={ blog[0].blogImg ? `http://localhost:1337${blog[0].blogImg.url}` : '/default.jpg' } alt="blogimage" /> */}
                {/* <Image height={400} width={720} src={url ? `http://localhost:1337${url}` : '/default.jpg'} alt="blogimage" /> */}
                <ModifedImageContainer/>
            </div>

            <div className={styles.title}>
                <h1> {title} </h1>
            </div>

            <div className={styles.description}>
                <p> {description} </p>
            </div>

            <div className={styles.goback}>
                <button onClick={() => router.back()} > Go Back </button>
            </div>
        </section>
    )

}

export default BlogPreview