import React from "react";

export default function Stats({ items }) {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const pT = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        { pT === 100
          ? `You got everything! Ready to Go ✈️`
          : `You have ${numItems} items on your list, and you already packed ${numPacked} (${pT}%)` }
      </em>
      <hr className="stats-hr" />
      <b className="stats-copy" style={ { color: "black" } }>
        { " " }
        &copy;Shrey
      </b>
    </footer>
  );
}
