import React from 'react';
import {AbsoluteFill,Composition,registerRoot,useCurrentFrame,interpolate,Img,Sequence} from 'remotion';
import photos from './photos.json';
const scenes=[
{tag:'ADMISSÃO DE AR',title:'A peça em detalhes',body:'Mangueira de admissão',photo:0,fit:'contain',scale:1},
{tag:'UTILIZAÇÃO',title:'Condução do ar',body:'Integra o percurso do ar no sistema de admissão do motor.',photo:0,fit:'contain',scale:1.05},
{tag:'DETALHES VISÍVEIS',title:'Observe o acabamento',body:'Veja o corpo, as nervuras e os pontos de conexão.',photo:0,fit:'cover',scale:1.08},
{tag:'IDENTIFICAÇÃO',title:'Código na etiqueta',body:'28138-4F100 • Compare com a peça do seu veículo.',photo:1,fit:'contain',scale:1},
{tag:'ANTES DE COMPRAR',title:'Confira a aplicação',body:'Compare código, formato e conexões. Instalação por profissional.',photo:1,fit:'contain',scale:1}
];
const Scene=({s}:any)=>{const f=useCurrentFrame();const alpha=interpolate(f,[0,12,166,180],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});const z=interpolate(f,[0,180],[s.scale,s.scale+.045],{extrapolateRight:'clamp'});return <AbsoluteFill style={{background:'#f5f5f2',fontFamily:'Arial',color:'#18211e',opacity:alpha}}>
<div style={{position:'absolute',left:64,right:64,top:86,display:'flex',justifyContent:'space-between',fontSize:26,fontWeight:700,letterSpacing:3}}><span>COOPER AUTO</span><span style={{color:'#23764a'}}>AUTOPEÇAS</span></div>
<div style={{position:'absolute',top:205,left:64,right:64}}><div style={{fontSize:24,letterSpacing:4,color:'#23764a',marginBottom:20}}>{s.tag}</div><div style={{fontSize:70,lineHeight:1.05,fontWeight:800}}>{s.title}</div></div>
<div style={{position:'absolute',left:64,top:440,width:952,height:1000,background:'white',borderRadius:32,overflow:'hidden',boxShadow:'0 18px 70px #18211e12'}}><Img src={photos[s.photo]} style={{width:'100%',height:'100%',objectFit:s.fit,transform:'scale('+z+')',objectPosition:s.fit==='cover'?'50% 34%':'center'}}/></div>
<div style={{position:'absolute',left:64,right:64,top:1510,fontSize:43,lineHeight:1.3,fontWeight:600}}>{s.body}</div>
<div style={{position:'absolute',left:64,right:64,bottom:110,height:5,background:'#dce4dd'}}><div style={{height:5,background:'#23764a',width:(f/180*100)+'%'}}/></div>
<div style={{position:'absolute',bottom:63,left:64,fontSize:20,color:'#69726b'}}>Imagens do produto fornecidas pelo vendedor</div>
</AbsoluteFill>};
const Video=()=> <AbsoluteFill style={{background:'#f5f5f2'}}>{scenes.map((s,i)=><Sequence key={i} from={i*180} durationInFrames={180}><Scene s={s}/></Sequence>)}</AbsoluteFill>;
registerRoot(()=> <Composition id="AdmissaoReal" component={Video} width={1080} height={1920} fps={30} durationInFrames={900}/>);
