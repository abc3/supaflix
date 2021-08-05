import React, { useEffect, useState } from 'react'
import Page from '../layouts/Page'
import {Card, Row, PageHeader} from 'antd'
const { Meta } = Card;
import { supaflixApi, useSupaflixApi } from "../hooks/api"
import { Item } from "../hooks/api/h"
import ItemsList from '../components/items_list'

const IndexPage: React.FC = (props) => {
  const data = useSupaflixApi(['items'], () => supaflixApi.getItems());
  const [items, setItems] = useState<Item[]>([])
  useEffect(() => {
    if (!data.isError)
      setItems(data.value.items)
  }, [data])

  return (<Page>

    <PageHeader
      title="New Releases"
    />
    <Card
      bordered={false}
      style={{ paddingTop: 24 }}
      bodyStyle={{ padding: '0 32px 40px 32px' }}
      loading={false}
    >
      <Row>
        <ItemsList items={items} />
      </Row>

    </Card>
  </Page>)

}

export default IndexPage;
