import { NextPage } from 'next'
import { useRouter } from 'next/router'

const ErrorPage: NextPage = () => {

    const router= useRouter()

    return (
        <div className="errorbox">
            <div className="error">
                <h2> Page not found, Click <strong onClick={() => router.back()}> here </strong> to go back </h2>
            </div> 
        </div>
    )

}

export default ErrorPage