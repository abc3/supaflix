import React, { useState, useEffect } from "react";
import { Card, Spin } from "antd";
const { Meta } = Card;
import { Item } from '../hooks/api/h'

const ItemsList: React.FC<{ items: Item[] }> = ({ items }) => {
  const [itemsList, setItems] = useState<Item[]>([])
  useEffect(() => {
    setItems(items)
  }, [items])

  if (items.length === 0)
    return (<Spin tip="Loading..." />)

  return (
    <>{itemsList.map(el => {
      return (
        <a href={`/player/${el.id}`} key={el.id}>
          <Card
            hoverable
            style={{ width: 240, margin: '12px 12px 0 0' }}
            cover={<img src={el.preload} />}
          >
            <Meta title={el.title} description={el.description} />
          </Card>
        </a>
      )
    })}</>
  )
}

export default ItemsList;
