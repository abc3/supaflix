import React, { useState, useEffect } from "react";
import { Card, Spin } from "antd";
const { Meta } = Card;
import { Item } from '../hooks/api/h'
import Link from 'next/link'

const ItemsList: React.FC<{ items: Item[] }> = ({ items }) => {

  if (items.length === 0)
    return (<Spin tip="Loading..." />)

  return (
    <>{items.map(el => {
      return (
        <Link as={`/player/${el.id}`} href={"/player/[id]"}>
          <a key={el.id}>
          <Card
            hoverable
            style={{ width: 240, margin: '12px 12px 0 0' }}
            cover={<img src={el.preload} />}
          >
            <Meta title={el.title} description={el.description} />
          </Card>
          </a>
        </Link>
      )
    })}</>
  )
}

export default ItemsList;
