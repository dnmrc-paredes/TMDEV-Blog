import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import axios from 'axios'
import { useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'

// Typescript
import { Iblog } from '../ts/blogs'

// Styles & Images
import backgroundImage from '../public/js.jpg'
import myProfile from '../public/myprofile.jpg'

export const getServerSideProps: GetServerSideProps = async () => {

    const {data: blogs} = await axios.get('http://localhost:1337/blogs')

    return {
        props: {
          blogs
        }
    }

}

const Home: NextPage<{blogs: Iblog[]}> = ({blogs}) => {

  const [tab, setTab] = useState<string>('about')

  const About = () => {
    return (
      <div className={styles.aboutroot} >
        <div className={styles.aboutme}>
          <h1> About Me </h1>
          <p> Hi, I&apos;m Dinmarc, I&apos;m a Web Developer specializing Javascript as main language.
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
                <h2> {item.title} </h2>
                <p> {item.description.substr(0, 30)} </p> 
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
                        <Image src={backgroundImage} alt="asdfsdf" />
                    </div>

                    <div className={styles.myprofile}>
                        <div className={styles.myprofileimg}>
                            <Image src={myProfile} alt="asdfsdaf" />
                        </div>

                        <div className={styles.myprofiledetails}>
                            <h1> Dinmarc Paredes </h1>
                            <p> tmlolololdev@gmail.com </p>
                        </div>
                    </div>

                    <div className={styles.tabbar}>
                        <p onClick={() => setTab('about')} > About </p>
                        <p onClick={() => setTab('blog')} > Blog </p>
                        <p onClick={() => setTab('gallery')} > Gallery </p>
                    </div>

                    {/* <div className={styles.blogroot}>
                      { blogs.map(item => {
                        console.log(item.title)
                      }) }
                    </div> */}

                    <div className={styles.currentTab}>
                      { tab === 'about' && <About/> }
                      { tab === 'blog' && <Blog/> }
                      { tab === 'gallery' && <Gallery/> }
                    </div>
                </div>
            </section>
        </main>

    </div>
  )
}

export default Home
