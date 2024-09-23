import { useContext } from 'react'
import { CartContext } from '../context/cart'
import styles from './ItemCard.module.css'

const ItemCard = ({ id, name, price, imageUrl }) => {
  const { isItemInCart, addItem, removeItem } = useContext(CartContext)

  const isInCart = isItemInCart(id)
  const addToCart = () => addItem(id)
  const removeFromCart = () => removeItem(id)

  return (
    <div className={styles.wrapper}>
      <img src={imageUrl} width={200} height={250} alt={name} title={name} />
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.price}>£{price.toFixed(2)}</p>
      <button
        onClick={isInCart ? removeFromCart : addToCart}
        className={styles[isInCart ? 'remove-from-cart' : 'add-to-cart']}
      >
        {isInCart ? 'In cart' : 'Add to cart'}
      </button>
    </div>
  )
}

export default ItemCard