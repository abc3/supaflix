import React, {useEffect, useRef} from "react";
import Page from "../layouts/Page";
import dynamic from 'next/dynamic';
const ShakaComponent = dynamic(import ("../components/ShakaComponent"),{ssr:false});


const ShakaDemoPage: React.FC = (props) => {
  const playerRef = useRef<HTMLVideoElement>(null)

  const addSrcPlay = (src: string) => {
    playerRef.current!.src = src
    playerRef.current?.play()
  }

  useEffect(() => { })

  return(
    <Page>
      <div>
        <br/>
        <ShakaComponent
          manifestUrl={"https://dash.akamaized.net/dash264/TestCases/1c/qualcomm/2/MultiRate.mpd"}
        />
      </div>
    </Page>
  )
}

export default ShakaDemoPage;
