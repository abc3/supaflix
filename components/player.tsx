import React, { useState, useEffect } from "react";
import { Card, Row, Col, Spin, PageHeader } from 'antd'
const { Meta } = Card;
import { Item } from '../hooks/api/h'
import { supaflixApi, useSupaflixApi } from "../hooks/api"
import dynamic from 'next/dynamic'
import 'videojs-contrib-quality-levels'
import { useRouter } from "next/router";

const VideoPlayer = dynamic(
  // @ts-ignore
  () => import('react-video-js-player'), { ssr: false }
)

const Player: React.FC<{ id: string | string[]}> = (props) => {
  const { id } = props
  const [item, setItem] = useState<Item>()
  const data = useSupaflixApi([`${id}`], (id) => supaflixApi.getItem(id))
  const router = useRouter()

  useEffect(() => {
    if (!data.isError)
      setItem(data.value.item)
  }, [data])

  let player = <></>

  if (item?.media_url) {
    player = <VideoPlayer
      // @ts-ignore
      bigPlayButton={true}
      controls={true}
      src={item?.media_url}
      width="720"
      height="420"
    />
  }

  return (
    <>
      <PageHeader
        title={item?.title}
        subTitle={item?.description}
        onBack={() => {
          router
            .push("/index", `/`)
            .then(() => window.scrollTo(0, 0))
        }}
      />


      <Card
        // className={styles.listCard}
        bordered={false}
        style={{ paddingTop: 24 }}
        bodyStyle={{ padding: '0 32px 40px 32px' }}
        loading={false}
      >

        <Row>
          <Col style={{ paddingLeft: 170 }}>
            {player}
          </Col>
        </Row>

      </Card>
    </>
  )
}

export default Player;
