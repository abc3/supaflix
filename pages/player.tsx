import React, { Fragment, useState, useEffect } from 'react'
import Page from '../layouts/Page'
import { Card, Row, Col, Divider, PageHeader } from 'antd'
import videojsqualityselector from 'videojs-hls-quality-selector'
import 'videojs-contrib-quality-levels'
import dynamic from 'next/dynamic'

const VideoPlayer = dynamic(
  // @ts-ignore
  () => import('react-video-js-player'), { ssr: false }
)

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
        <Col >
          <VideoPlayer
            // @ts-ignore
            bigPlayButton={true}
            controls={true}
            src={'https://didkyjgwsjjjadhqgwqr.supabase.in/storage/v1/object/public/media/items/1/playlist.m3u8'}
            width="720"
            height="420"
          />
        </Col>
      </Row>

    </Card>
  </Page>)

}

export default PlayerPage;
