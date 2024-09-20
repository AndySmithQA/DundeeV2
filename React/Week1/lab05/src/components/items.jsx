

function ItemCard({ symbol, name, price}) {
    return (
        <div className="item-card">
            <div className="symbol">{symbol}</div>
            <h3>{name}</h3>
            <p>{price}</p>
        </div>
    )
}
export default ItemCard;