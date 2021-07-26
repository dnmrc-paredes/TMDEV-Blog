import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps, NextPage } from 'next'
import InfiniteScroll from 'react-infinite-scroll-component'
import { BeatLoader } from 'react-spinners'

// Helpers
import { URL } from '../helpers/url'

// Typescript
import { Iblog } from '../ts/blogs'

// Components
import Footer from '../components/footer/footer'
import About from '../components/tabs/about'
import Blog from '../components/tabs/blog'
import Gallery from '../components/tabs/gallery'

// Styles & Images
import styles from '../styles/Home.module.scss'

// export const getServerSideProps: GetServerSideProps = async () => {

//     const {data: blogs} = await axios.get(`${URL}/blogs?_limit=5&_sort=published_at:DESC`)
//     const {data: total} = await axios.get<Iblog[]>(`${URL}/blogs`)
//     // const {data: video} = await axios.get('http://localhost:1337/uploads/tekken.mp4')
//     // console.log(blogs)

//     return {
//         props: {
//           blogs,
//           totalBlogs: total.length
//         }
//     }

// }

const Home: NextPage = () => {

  const router = useRouter()
  const { tab } = router.query as {tab: string}
  // router.query({ tab: 'about' })
  const [currentTab, setCurrentTab] = useState<string>(tab ? tab : 'about')
  // console.log(queryParam)
  // console.log(myBlogs)

  return (
    <div className={styles.container}>
        <Head>
          <title> TMDEV Blog </title>
          <meta name="description" content="TMDEV Blog read articles about my story how I learned Web Development, Reviews about technologies and my journey to tech industry" />
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="TMDEV Blog" />
          <meta property="og:title" content="TMDEV Blog" />
          <meta property="og:description" content="TMDEV Blog read articles about my story how I learned Web Development, Reviews about technologies and my journey to tech industry" />
          <meta property="og:image" content="/default.jpg" />
        </Head>

        <main>
            <section id={styles.sect1}>
                <div className={styles.profileroot}>
                    <div className={styles.bgimg}>
                        <Image height={400} width={720} src='/js.jpg' alt="asdfsdf" />
                    </div>

                    <div className={styles.myprofile}>
                        <div className={styles.myprofileimg}>
                            <Image height={100} width={100} src="/myprofile.jpg" alt="asdfsdaf" />
                        </div>

                        <div className={styles.myprofiledetails}>
                            <h1> Dinmarc Paredes </h1>
                            <p> tmlolololdev@gmail.com </p>
                        </div>
                    </div>

                    <div className={styles.tabbar}>
                        <p onClick={() => {
                          router.push({query: {tab: 'about'}})
                          setCurrentTab('about')
                        }} > About </p>
                        <p onClick={() => {
                          router.push({query: {tab: 'blog'}})
                          setCurrentTab('blog')}
                          } > Blog </p>
                        <p onClick={() => {
                          router.push({query: {tab: 'gallery'}})
                          setCurrentTab('gallery')}
                          } > Gallery </p>
                    </div>

                    <div className={styles.currentTab}>
                      { currentTab === 'about' && <About/> }
                      { currentTab === 'blog' && <Blog currentTab={currentTab} /> }
                      { currentTab === 'gallery' && <Gallery/> }
                    </div>

                    <Footer/>
                </div>
            </section>
        </main>

    </div>
  )
}

export default Home
