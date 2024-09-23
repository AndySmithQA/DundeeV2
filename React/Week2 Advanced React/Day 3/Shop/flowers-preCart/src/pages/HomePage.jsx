import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'

const homeImageUrl = "https://user-images.githubusercontent.com/118732445/203775030-f6d39588-6b73-42eb-a396-d50098078501.jpg"

const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <div>
        <h1>Bring your<br/>home to life.</h1>
        <p>Elevate your living space with a touch of nature.</p>
        <p>We offer a range of easy-care houseplants.</p>
        <Link to="/items">Browse plants</Link>
      </div>
      <img src={homeImageUrl} alt="House plants" height={500} width={390} />
    </div>
  )
}

export default HomePage