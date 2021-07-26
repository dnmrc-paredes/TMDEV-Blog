import { FC, useState, useEffect, useCallback } from 'react'
import { NextComponentType, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import InfiniteScroll from 'react-infinite-scroll-component'
import { BeatLoader } from 'react-spinners'
import Link from 'next/link'
import axios from 'axios'

// Helpers
import { URL } from '../../helpers/url'

// Typescripts
import { Iblog } from '../../ts/blogs'

// Styles
import styles from '../../styles/Home.module.scss'

const Blog: FC<{currentTab: string}> = ({currentTab}) => {

    // const { tab } = router.query as {tab: string}
    const [isMounted, setIsMounted] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [totalBlogs, setTotalBlogs] = useState<number>()
    const [allBlogs, setAllBlogs] = useState<Iblog[]>()
    const [pageLimit, setPageLimit] = useState(5)
    const [hasMore, setHasMore] = useState(true)

    // useEffect(() => {

    //   const cancelToken = axios.CancelToken
    //   const source = cancelToken.source()

    //   const fetchData = async () => {

    //     const {data: blogs} = await axios.get(`${URL}/blogs?_limit=5&_sort=published_at:DESC`, {
    //       cancelToken: source.token
    //     })
    //     const {data: total} = await axios.get<Iblog[]>(`${URL}/blogs`, {
    //       cancelToken: source.token
    //     })

    //     setAllBlogs(blogs)
    //     setTotalBlogs(total.length)
    //     setIsLoading(false)

    //   }

    //    currentTab === "blog" && fetchData()
    //    source.cancel()
    // }, [currentTab])

    useEffect(() => {

      const fetchData = async () => {

        const {data: blogs} = await axios.get(`${URL}/blogs?_limit=5&_sort=published_at:DESC`)
        const {data: total} = await axios.get<Iblog[]>(`${URL}/blogs`)

        setAllBlogs(blogs)
        setTotalBlogs(total.length)
        setIsLoading(false)

      }

       currentTab === "blog" && fetchData()
       return () => setIsMounted(false)
    }, [currentTab])

    // console.log(tab)
    // const refetch = useCallback(async () => {
    //   const fetchData = async () => {
    //     const {data} = await axios.get(`${URL}/blogs?_limit=${pageLimit}&_sort=published_at:DESC`)
        
    //     console.log(data)
    //     if (data.length >= totalBlogs) {
    //         setHasMore(false)
    //         return setAllBlogs(data)
    //     }
  
    //     setAllBlogs(data)
    //   }

    //   fetchData()
    // }, [pageLimit, totalBlogs])

    // useEffect(() => {
    //   if (currentTab === "blog") {
    //     refetch()
    //   }
    // }, [refetch, currentTab])

    useEffect(() => {
      const fetchData = async () => {
          const {data} = await axios.get(`${URL}/blogs?_limit=${pageLimit}&_sort=published_at:DESC`)
          
          // console.log(data)
          if (data.length >= totalBlogs!) {
              setHasMore(false)
              return setAllBlogs(data)
          }

          setAllBlogs(data)
      }

      currentTab === "blog" && fetchData()
    }, [pageLimit, totalBlogs, currentTab])

    return (

        <div className={styles.blogroot}>
            <h1> Blogs </h1>

            { isLoading ? <div className="moonloader"> <BeatLoader size={15} color={'#0C2D48'} /> </div> : "" }

            { !isLoading && (allBlogs!.length <= 0) && <h2 className="noblogs"> No Blogs </h2> }

            { allBlogs && (allBlogs!.length > 0) && <InfiniteScroll
              dataLength={allBlogs!.length}
              next={() => setPageLimit(prev => prev+=5)}
              loader={ <div className="moonloader"> <BeatLoader size={15} color={'#0C2D48'} /> </div> }
              hasMore={hasMore}
              endMessage={ allBlogs!.length < 5 ? "" : <p className="max"> Max results </p> }
              height={200}
              className={styles.blogs}
              hasChildren={true}
              >
              
              { allBlogs && allBlogs.map(item => {
                return <Link href={`/blog/${item.slug}`} key={item.slug} passHref>
                    <div className={styles.blog}>
                      <h3> {item.title} </h3>
                    </div>
                </Link>
              }) }
          
            </InfiniteScroll> }

      </div>

    )

}

export default Blog