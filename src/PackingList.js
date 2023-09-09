import React, { useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import Item from "./Item";

function PackingListPDF({ items }) {
  return (
    <Document>
      <Page size="A4">
        <View>
          <Text>Packing List</Text>
          
          {items.map((item) => (
            <Text key={item.id}>
              {item.description} - Packed: {item.packed ? "Yes" : "No"}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  const [sortBy, setSortby] = useState("input");
  const [isDownloading, setIsDownloading] = useState(false); // Define isDownloading state

  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select
          name=""
          id=""
          value={sortBy}
          onChange={(e) => setSortby(e.target.value)}
        >
          <option value="input">Sort by Input Order</option>
          <option value="description">Sort by A-Z</option>
          <option value="packed">Sort by Packed Status</option>
        </select>
        <button onClick={onClearList}>clear list</button>
        <button
          onClick={() => {
            setIsDownloading(true);
          }}
        >
          Download list
        </button>
        {isDownloading && (
          <PDFDownloadLink
            document={<PackingListPDF items={sortedItems} />} // Pass sortedItems to PackingListPDF
            fileName="packing-list.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download now"
            }
          </PDFDownloadLink>
        )}
      </div>
    </div>
  );
}
