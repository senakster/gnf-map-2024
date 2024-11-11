'use client'



// import Loading from '../Loading/Loading';
// import L from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';
// import "_libs/_styles/leaflet1.7.1.css";
import styles from './LeafletBase.module.css';
import config from '@/_libs/_config/config.json'
import { MapContainer } from 'react-leaflet/MapContainer'

import ModalContent from './ModalContent';
import MapControls  from './MapControls/MapControls'
import GeoData from './GeoData/GeoData';
import { Rectangle } from 'react-leaflet/Rectangle';
import { LatLngBoundsExpression } from 'leaflet';

// import dynamic from 'next/dynamic';
// const GeoData = dynamic(() => import('./GeoData/GeoData'));




const LeafletBase = ({groups}: {groups?: TGNFG[]}) => {
  const isInitialized = useRef(false);
  const [data, setData] = useState({ grupper: groups, updated: 0 } as { grupper: TGNFG[], updated: number })
  const [modalContent, setModalContent] = useState<{ municipality: string; groups: TGNFG[]; } | null>(null)
  useEffect(() => {
    isInitialized.current = true;
    return () => {
      isInitialized.current = false;
    };
  }, []);
  if (!isInitialized) return null;
  // const  MapContainer = dynamic(() => import('react-leaflet/MapContainer'));

  // const map = useMap()
  // const { dispatch } = useStateContext()
  // const { data } = useStateContext().state.state;

  // const c: L.LatLng = new L.LatLng(config.map.centerDefault.lat, config.map.centerDefault.lng);
  function updateModalContent(data?: { municipality: string, groups: TGNFG[] }) {
    setModalContent(data || null)
  }
  const bbounds: LatLngBoundsExpression = [[56.87,12.1],[56.45,12.75]]
  return (
    <div className='h-screen w-screen'>
     <MapContainer
          // id='map'
          className={styles.mapContainer}
          center={[config.map.centerDefault.lat, config.map.centerDefault.lng]}
          zoom={6}
          minZoom={4}
          maxZoom={12}
          zoomSnap={.25}
          scrollWheelZoom={true}
          dragging={true}
          style={{width: '100%', height: '100%' }}
        >
        <Rectangle className={'relative'} bounds={bbounds} pathOptions={{ color: 'black', fillColor: 'transparent', weight: 1 }}>
          {/* <Marker position={bounds} icon={text} /> */}
        </Rectangle>
          <GeoData
            grupper={data?.grupper}
            setModalContent={updateModalContent}
          />
          <MapControls />
        </MapContainer>
        <ModalContent {...modalContent} />
    </div>
 );
}

export default LeafletBase;
