import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";


async function getJSON(url: string) {
    const res = await fetch(url);
    return res.json();
  }

// https://www.instagram.com/stories/campus.dora.arts/2927812705440679670/ 
//

export default function Story({story}: { story?: any }) { // everystory gets different id in params 
    const params = useParams();
  
    return <div>
      <h1>{story.title}</h1>
    </div>
  }
  
  interface IPropsLike {
    onLike: () => void;
    children: JSX.Element;
  }