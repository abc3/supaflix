import React, { useEffect, useState } from 'react'
import Page from '../../layouts/Page'
import { Card, Row, Col, Spin, PageHeader } from 'antd'
import { useRouter } from 'next/router'
import { Item } from "../../hooks/api/h"
import Player from "../../components/player"



const PlayerPage: React.FC = (props) => {
  const router = useRouter()
  const { id } = router.query

  let comp = <Spin tip="Loading..." />
  if (id) {
    comp = <Player id={id} />
  }
  return (<Page> {comp} </Page>)
}

export default PlayerPage;
