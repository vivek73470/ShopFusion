import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoader = ({ width = '100%', height = '20px', borderRadius = '4px' }) => {
    return <Skeleton width={width} height={height} borderRadius={borderRadius} />;
  };
  
  export default SkeletonLoader;