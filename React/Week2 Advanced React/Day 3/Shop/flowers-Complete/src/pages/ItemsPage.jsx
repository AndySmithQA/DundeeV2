import styles from './ItemsPage.module.css'
import ItemCard from '../components/ItemCard'

const ItemsPage = ({ itemsData }) => {
  return (
    <>
      <h1 className={styles.header}>Our plants</h1>
      <div className={styles['items-grid']}>
        {
          itemsData.map((item) => (
            <ItemCard {...item} key={item.id} />
          ))
        }
      </div>
    </ >
  )
}

export default ItemsPage