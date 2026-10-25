import React from 'react';
import {AbsoluteFill,Composition,registerRoot,useCurrentFrame,useVideoConfig,interpolate} from 'remotion';
const data={"title":"Mangueira do filtro de ar","subtitle":"HR 2.5 8V • 2004 a 2012 • Korea | Confira a aplicação antes da compra","brand":"Cooper Auto","color":"#15803d","format":"vertical","seconds":20};
const Video=()=>{const frame=useCurrentFrame();const {fps}=useVideoConfig();const opacity=interpolate(frame,[0,fps*0.7],[0,1],{extrapolateRight:'clamp'});return <AbsoluteFill style={{background:'#10131c',color:'white',padding:90,justifyContent:'center',fontFamily:'Arial'}}><div style={{color:data.color,fontSize:34,letterSpacing:8}}>{data.brand}</div><div style={{opacity,transform:`translateY(${(1-opacity)*50}px)`,fontSize:100,fontWeight:800,lineHeight:1.05,marginTop:70}}>{data.title}</div><div style={{opacity,fontSize:44,marginTop:45,color:'#c3c8d5'}}>{data.subtitle}</div></AbsoluteFill>};
const Root=()=> <Composition id="OnVideo" component={Video} durationInFrames={600} fps={30} width={1080} height={1920}/>;
registerRoot(Root);
