import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps, NextPage } from 'next'

// Typescript
import { Iblog } from '../ts/blogs'

// Components
import Footer from '../components/footer/footer'

// Styles & Images
import styles from '../styles/Home.module.scss'

export const getServerSideProps: GetServerSideProps = async () => {

    const {data: blogs} = await axios.get('http://localhost:1337/blogs')
    // const {data: video} = await axios.get('http://localhost:1337/uploads/tekken.mp4')
    // console.log(video)

    return {
        props: {
          blogs
        }
    }

}

const Home: NextPage<{blogs: Iblog[]}> = ({blogs}) => {

  const router = useRouter()
  const { tab } = router.query as {tab: string}
  // router.query({ tab: 'about' })
  const [currentTab, setCurrentTab] = useState<string>(tab ? tab : 'about')
  // console.log(queryParam)

  const About = () => {
    return (
      <div className={styles.aboutroot} >
        <div className={styles.aboutme}>
          <h1> About Me </h1>
          <p> Hi, I&apos;m <strong> Dinmarc </strong>, I&apos;m a <strong> Web Developer </strong> specializing <strong> Javascript </strong> as main language.
          I loved and like to create stuffs I always want to discover new things in my specialized language I&apos;m currently advancing my knowledge about Javascript both Frontend & Backend.
          </p> 
        </div>
      </div>
    )
  }

  const Blog = () => {
    return (
      <div className={styles.blogroot}>
        <h1> Blogs </h1>
        { blogs && blogs.map(item => {
          return <Link href={`/blog/${item.slug}`} key={item.slug} passHref>
              <div className={styles.blog}>
                <h3> {item.title} </h3>
                {/* <p> {item.description.substr(0, 30)} </p>  */}
              </div>
          </Link>
        }) }
      </div>
    )
  }

  const Gallery = () => {
    return (
      <div className={styles.galleryroot}>
        <h1> Gallery </h1>
          {/* <video autoPlay width="330px" controls src="http://localhost:1337/uploads/tekken.mp4" /> */}
          <div className={styles.galleryitem}>

            <div className={styles.item}>
              <div className={styles.img1}>
                <Image height={200} width={360} src="http://localhost:1337/uploads/code_app.png" alt="sdfsdf" /> 
              </div>
              <div className={styles.img2}>
                <Image height={200} width={360} src="http://localhost:1337/uploads/blazingreaders.PNG" alt="sdfsdf" />
              </div> 
            </div>

            {/* <div className={styles.item}>
              <div className={styles.img1}>
                <Image height={200} width={360} src="http://localhost:1337/uploads/code_app.png" alt="sdfsdf" /> 
              </div>
              <div className={styles.img2}>
                <Image height={200} width={360} src="http://localhost:1337/uploads/blazingreaders.PNG" alt="sdfsdf" />
              </div> 
            </div> */}

          </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
        <Head>
          <title> TMDEV Blog </title>
          <meta name="description" content="A small platform to Support my work." />
          <link rel="icon" href="/favicon.ico" />
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
                      {/* { currentTab !== 'about' || 'gallery' || 'blog' && <About/> } */}
                      { currentTab === 'about' && <About/> }
                      { currentTab === 'blog' && <Blog/> }
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
