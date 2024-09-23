import styles from './CheckoutItem.module.css'

const CheckoutItem = ({ name, imageUrl, price }) => {
  return (
    <div className={styles.wrapper}>
      <img src={imageUrl} height={80} width={64} alt={name} title={name} />
      <div>
        <h3>{name}</h3>
        <p>£{price.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default CheckoutItem