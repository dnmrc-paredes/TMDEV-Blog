import { NextPage } from 'next'

// Styles
import styles from './Dashboard.module.scss'

const Dashboard: NextPage = () => {

    return (
        <div className={styles.container} >
            
            <main>
                
                <div className={styles.title}>
                    <h1> Welcome to Dashboard </h1>
                </div>

            </main>

        </div>
    )

}

export default Dashboard