// 'use client'

import LeafletBase from '../LeafletBase/LeafletBase';
import styles from './Map.module.css';
import React, { useEffect, useState } from 'react';
const MapBase = ({ groups }: { groups: TGNFG[] }) => {
  // const [loading, setLoading] = useState(true)
  // useEffect(() => {
  //   setLoading(false)
  // }, [])

  return (
    <div className={`${styles.Map}`} data-testid="Map">
      <LeafletBase groups={groups} />
      {/* {!loading && <LeafletBase groups={groups} />} */}
    </div>
  );
}
export default MapBase;
