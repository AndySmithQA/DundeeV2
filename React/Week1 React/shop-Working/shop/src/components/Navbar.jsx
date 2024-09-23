import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <h2 className={styles.header}>
        seed theory
      </h2>
      <div className={styles['nav-link-wrapper']}>
        <Link to="/">Home</Link>
        <Link to="/items">Shop</Link>
        <Link to="/checkout">Checkout</Link>
      </div>
    </nav>
  )
}

export default Navbar