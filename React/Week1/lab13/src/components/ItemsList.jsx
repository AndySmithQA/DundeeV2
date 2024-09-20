import React from 'react'
import ItemCard from './ItemCard'
import itemsData from '../itemsData.json'

export default function ItemsList() {
  return (
    <div>
      <h2>Products</h2>
      <div className="items-grid">
        {itemsData.map((item) => (
          <ItemCard
            key={item.id}
            id={item.id}
            symbol={item.symbol}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  )
}
