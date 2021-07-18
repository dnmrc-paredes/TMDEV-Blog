import { NextPage, GetStaticPaths, GetStaticProps } from 'next'

export const getStaticPaths: GetStaticPaths = () => {

    return {
        paths: [
            { params: { blogid: '1' } }
        ],
        fallback: true
    }

}

export const getStaticProps: GetStaticProps = ({params}) => {

    const param = params as {blogid: string}

    return {
        props: {
            blogSlug: param.blogid
        }
    }

}

const Blog: NextPage = () => {
    
    return (
        <div>
            <h1> Blog </h1> 
        </div>
    )

}

export default Blog