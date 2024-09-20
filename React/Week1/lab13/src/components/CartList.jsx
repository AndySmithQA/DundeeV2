import React, { useContext } from 'react'
import { CartContext } from '../context/cart-context'

export default function CartList() {
  const { itemsInCart } = useContext(CartContext)

  return (
    <div>
      <h2>Cart</h2>
      <div className="cart-wrapper">
        {itemsInCart.map((item) => (
          <span>{item.symbol}</span>
        ))}
      </div>
    </div>
  )
}
