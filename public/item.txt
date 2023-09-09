import React from "react";

export default function Item({ item, onDeleteItem, onToggleItem }) {
  const itemStyle = item.packed ? { textDecoration: "line-through" } : {};

  return (
    <li>
      <input
        type="checkbox"
        value={ item.packed }
        onChange={ () => onToggleItem(item.id) } />
      <span style={ itemStyle } title={ item.description }>
        { item.quantity } { item.description }
      </span>
      <button onClick={ () => onDeleteItem(item.id) } title="delete item">
        ❌
      </button>
    </li>
  );
}
