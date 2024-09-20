import { useContext } from 'react'
import { CartContext } from '../context/cart'
import CheckoutItem from '../components/CheckoutItem'
import styles from './CheckoutPage.module.css'

const CheckoutPage = () => {
  const { itemIds, getItemById, calculateTotal } = useContext(CartContext)
  const isCartEmpty = !itemIds.length
  const handleCheckout = () => alert('Thank you for shopping with us!')

  return (
    <div>
      <h1 className={styles.header}>Checkout</h1>
      <div className={styles['items-wrapper']}>
        {isCartEmpty ?
          <p>Your cart is empty!</p>
          : <>{itemIds.map((id) => <CheckoutItem {...getItemById(id)} key={id} />)}</>
        }
      </div>
      <p className={styles.total}><b>Total: </b>£{calculateTotal().toFixed(2)}</p>

      {!isCartEmpty && (
        <button onClick={handleCheckout} className={styles['checkout-button']}>
          Checkout
        </button>
      )}
    </div>
  )
}

export default CheckoutPage