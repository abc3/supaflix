import React, { useEffect } from 'react'
import Page from '../layouts/Page'
import { Card, Row, Divider, PageHeader } from 'antd'
// import { Button } from '@supabase/ui'

const PlayerPage: React.FC = (props) => {

  useEffect(() => { }, [])

  return (<Page>

    <PageHeader
      title="Big buck bunny"
      subTitle="description"
      onBack={() => { location.href = '/' }}
    />


    <Card
      // className={styles.listCard}
      bordered={false}
      style={{ paddingTop: 24 }}
      bodyStyle={{ padding: '0 32px 40px 32px' }}
      loading={false}
    >

      <Row>
        {/* return <Button>I am a Supabase UI button</Button> */}
      </Row>

      <Divider />

    </Card>
  </Page>)

}

export default PlayerPage;
