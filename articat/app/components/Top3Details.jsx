'use client'
import React, { useEffect, useState } from 'react';
import styles from "@/app/page.module.css";

export default function Top3Details({top3Items}) {
  const [items, setitems] = useState(top3Items)
  return (
    <div>
      <div className={styles.itemDetails}>
        {
          items.map(item=>
            <div>
            <p>- Name: {item.name}, ID: {item.itemId}, Category: {item.category}, Price: {item.price}$, Seller: {item.sellerUN}</p>
            
            </div>
          )
        }
        </div>
    </div>
  )
}
