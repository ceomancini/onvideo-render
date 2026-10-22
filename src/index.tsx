import React from 'react';
import {AbsoluteFill, Composition, interpolate, registerRoot, useCurrentFrame} from 'remotion';
const scenes=[
{title:'LULA × BOLSONARO',subtitle:'Duas visões de governo',color:'#17345a'},
{title:'ECONOMIA',subtitle:'Lula: investimento público e políticas sociais\nBolsonaro: privatizações e liberalização',color:'#133b54'},
{title:'PROGRAMAS SOCIAIS',subtitle:'Bolsa Família e Auxílio Brasil\nCompare alcance, regras e resultados',color:'#254166'},
{title:'SEGURANÇA E AMBIENTE',subtitle:'Diferentes prioridades e medidas\nAnalise dados e resultados',color:'#21385f'},
{title:'VOTO CONSCIENTE',subtitle:'Compare propostas, resultados e fontes\nInformação antes da decisão',color:'#134e4a'}];
const Video:React.FC=()=>{const frame=useCurrentFrame();const i=Math.min(Math.floor(frame/180),4);const local=frame%180;const fade=interpolate(local,[0,18,160,180],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});const s=scenes[i];return <AbsoluteFill style={{background:s.color,color:'#fff',fontFamily:'Arial,sans-serif',overflow:'hidden'}}>
<AbsoluteFill style={{background:'radial-gradient(circle at 80% 15%, #ffffff24, transparent 55%)'}}/>
<div style={{position:'absolute',top:115,left:80,fontSize:30,letterSpacing:5}}>ONVIDEO • COMPARATIVO</div>
<div style={{position:'absolute',top:550,left:80,right:80,opacity:fade,transform:`translateY(${(1-fade)*50}px)`}}>
<div style={{fontSize:82,fontWeight:900,lineHeight:1.1}}>{s.title}</div>
<div style={{fontSize:43,whiteSpace:'pre-line',lineHeight:1.4,marginTop:65}}>{s.subtitle}</div></div>
<div style={{position:'absolute',bottom:160,left:80,fontSize:28}}>Conteúdo informativo • Sem indicação de voto</div>
<div style={{position:'absolute',bottom:90,left:80,right:80,height:8,background:'#ffffff55'}}><div style={{width:`${local/180*100}%`,height:'100%',background:'white'}}/></div>
</AbsoluteFill>};
registerRoot(()=> <Composition id="OnVideo" component={Video} durationInFrames={900} fps={30} width={1080} height={1920}/>);
