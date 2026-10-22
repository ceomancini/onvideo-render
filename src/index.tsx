import React from 'react';
import {AbsoluteFill, Composition, interpolate, registerRoot, useCurrentFrame} from 'remotion';
const scenes=[
{duration:90,tag:'EDIÇÃO • 22 OUT 2026',title:'O DIA EM\n30 SEGUNDOS',body:'IA, dinheiro e Brasil.\nVeja o que está em destaque.',source:'GIRO DO DIA',accent:'#ffcc00'},
{duration:240,tag:'01 / EMPREGO + IA',title:'CERCA DE\n5 MIL CORTES',body:'Barclays anuncia redução de empregos\nem iniciativa de corte de custos\nimpulsionada por inteligência artificial.',source:'Reuters / UOL • 22/10/2026',accent:'#ffcc00'},
{duration:210,tag:'02 / MERCADO GLOBAL',title:'ÁSIA FECHA\nEM QUEDA',body:'Bolsas asiáticas recuam com\npetróleo em alta e preocupações\nsobre inteligência artificial.',source:'UOL Economia • 22/10/2026',accent:'#59d9ff'},
{duration:240,tag:'03 / BRASIL',title:'R$ 90 BILHÕES\nEM NEGOCIAÇÃO?',body:'Ministro prevê renegociar esse valor\nna terceira fase do Desenrola.\nÉ uma previsão, não um resultado.',source:'Agência Brasil • 21/10/2026',accent:'#7df5b2'},
{duration:120,tag:'AGORA É COM VOCÊ',title:'QUAL NOTÍCIA\nTE IMPACTA?',body:'Comente e compartilhe\ncom quem precisa saber.',source:'GIRO DO DIA • 22/10/2026',accent:'#ffcc00'}
];
const Video:React.FC=()=>{
const frame=useCurrentFrame();
let start=0;let i=0;
for(;i<scenes.length-1;i++){if(frame<start+scenes[i].duration)break;start+=scenes[i].duration;}
const s=scenes[i];const local=frame-start;
const fade=interpolate(local,[0,10,s.duration-8,s.duration],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
const lift=interpolate(local,[0,16],[65,0],{extrapolateRight:'clamp'});
return <AbsoluteFill style={{background:'#0b1020',color:'#fff',fontFamily:'Arial,sans-serif',overflow:'hidden'}}>
<AbsoluteFill style={{background:'radial-gradient(circle at 90% 20%, #243253, transparent 65%)'}}/>
<div style={{position:'absolute',right:-170,top:300+Math.sin(frame/40)*40,width:500,height:500,border:'2px solid '+s.accent,borderRadius:'50%',opacity:0.2}}/>
<div style={{position:'absolute',top:155,left:85,fontSize:32,fontWeight:800,letterSpacing:5,color:s.accent}}>GIRO DO DIA</div>
<div style={{position:'absolute',top:355,left:85,right:85,opacity:fade,transform:`translateY(${lift}px)`}}>
<div style={{fontSize:28,letterSpacing:3,color:s.accent,marginBottom:48}}>{s.tag}</div>
<div style={{fontSize:90,fontWeight:900,lineHeight:1.08,whiteSpace:'pre-line',letterSpacing:-3}}>{s.title}</div>
<div style={{width:110,height:9,background:s.accent,marginTop:48,marginBottom:48}}/>
<div style={{fontSize:43,lineHeight:1.48,whiteSpace:'pre-line',color:'#e1e6f1'}}>{s.body}</div>
</div>
<div style={{position:'absolute',bottom:290,left:85,right:85,fontSize:25,color:'#aab6cf'}}>{s.source}</div>
<div style={{position:'absolute',bottom:230,left:85,right:85,height:7,background:'#ffffff20'}}><div style={{width:`${frame/899*100}%`,height:'100%',background:s.accent}}/></div>
<div style={{position:'absolute',bottom:175,left:85,fontSize:25,color:'#aab6cf'}}>RESUMO INFORMATIVO</div>
<div style={{position:'absolute',bottom:175,right:85,fontSize:25,color:s.accent}}>{Math.max(0,30-Math.floor(frame/30))}s</div>
</AbsoluteFill>};
registerRoot(()=> <Composition id="OnVideo" component={Video} durationInFrames={900} fps={30} width={1080} height={1920}/>);
