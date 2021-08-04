import React, { useEffect } from 'react'
import Page from '../layouts/Page'
import {Card, Row, PageHeader} from 'antd'
const { Meta } = Card;

const IndexPage: React.FC = (props) => {

  useEffect(() => { }, [])

  return (<Page>

    <PageHeader
      title="New Releases"
    />


    <Card
      // className={styles.listCard}
      bordered={false}
      style={{ paddingTop: 24 }}
      bodyStyle={{ padding: '0 32px 40px 32px' }}
      loading={false}
    >

    <Row>
      <a href="/player">
        <Card
          hoverable
          style={{ width: 240, margin: '12px 12px 0 0' }}
          cover={<img src="http://localhost:8080/preload.png" />}
        >
          <Meta title="big buck bunny" description="description" />
          </Card>
      </a>

        <Card
          hoverable

          style={{ width: 240, margin: '12px 12px 0 0' }}
          cover={<img src="http://localhost:8080/preload.png" />}
        >
          <Meta title="big buck bunny" description="description" />
        </Card>

        <Card
          hoverable
          style={{ width: 240, margin: '12px 12px 0 0' }}
          cover={<img src="http://localhost:8080/preload.png" />}
        >
          <Meta title="big buck bunny" description="description" />
        </Card>

        <Card
          hoverable
          style={{ width: 240, margin: '12px 12px 0 0' }}
          cover={<img src="http://localhost:8080/preload.png" />}
        >
          <Meta title="big buck bunny" description="description" />
        </Card>

        <Card
          hoverable
          style={{ width: 240, margin: '12px 12px 0 0' }}
          cover={<img src="http://localhost:8080/preload.png" />}
        >
          <Meta title="big buck bunny" description="description" />
        </Card>
    </Row>

    </Card>
  </Page>)

}

export default IndexPage;
