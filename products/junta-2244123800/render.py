import numpy as np
from PIL import Image,ImageDraw,ImageFont,ImageFilter,ImageEnhance
from scipy import ndimage as ndi
import subprocess, pathlib, base64
P=pathlib.Path(__file__).parent
W,H=1080,1920
font='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
bold='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
def f(n,b=False):return ImageFont.truetype(bold if b else font,n)
def text(im,xy,s,n=32,col='#172b42',b=False):ImageDraw.Draw(im).text(xy,s,font=f(n,b),fill=col)
def makebg(t):
 y,x=np.mgrid[0:H,0:W]; glow=np.exp(-(((x-520)/800)**2+((y-850)/800)**2))
 a=np.zeros((H,W,3),dtype=np.uint8)
 for c,v in enumerate([223,230,238]):a[:,:,c]=np.clip(v+glow*24,0,255)
 im=Image.fromarray(a);d=ImageDraw.Draw(im)
 d.rectangle((0,0,W,16),fill='#d49d38')
 text(im,(64,75),'KOREA AUTO PARTS',26,b=True)
 text(im,(64,138),'JUNTA DA',51,b=True);text(im,(64,199),'TAMPA DE VÁLVULAS',51,b=True)
 text(im,(64,294),'PART NUMBER',23,col='#66788b');text(im,(64,331),'22441 23800',47,b=True)
 label=Image.open(P/'label.png').convert('RGB').resize((390,240),Image.Resampling.LANCZOS)
 d.rounded_rectangle((625,278,1033,536),radius=16,fill='white');im.paste(label,(634,287))
 d.rounded_rectangle((48,1304,1032,1810),radius=30,fill='#172b42')
 text(im,(84,1337),'APLICAÇÕES • MOTOR 2.0',29,col='#e4b65b',b=True)
 rows=[('TUCSON','2005 até 2012'),('i30','2008 até 2012'),('SPORTAGE','2005 até 2012')]
 for i,(car,yr) in enumerate(rows):
  yy=1410+108*i;text(im,(84,yy),car,40,col='white',b=True);text(im,(604,yy+5),yr,33,col='#e3eaf1')
  if i<2:d.line((84,yy+83,996,yy+83),fill='#35475a',width=2)
 text(im,(64,1845),'Confira o código e a aplicação antes da compra.',27,col='#596d80')
 return im

def extract(a):
 a=a.astype(float);r,g,b=a[:,:,0],a[:,:,1],a[:,:,2]
 green=(g>r*1.16)&(g>b*1.15)&(g>65)
 near=ndi.distance_transform_edt(~green)<14
 dark=(np.max(a,axis=2)<111)&near
 dark[740:]=False;dark[:180]=False
 labs,n=ndi.label(dark);sizes=np.bincount(labs.ravel());sizes[0]=0
 keep=np.zeros_like(dark)
 for j in np.argsort(sizes)[-5:]:
  if sizes[j]>90 and np.where(labs==j)[0].min()<600:keep|=labs==j
 alpha=ndi.gaussian_filter(keep.astype(float),.65)
 # neutralize reflected green while retaining the real product's highlights
 lum=a.mean(axis=2);rgb=np.stack([lum*.92,lum*.96,lum],axis=2).clip(0,255).astype('uint8')
 rgba=np.dstack([rgb,(alpha*255).astype('uint8')]);im=Image.fromarray(rgba)
 return im.crop((0,240,474,720)).resize((1000,1013),Image.Resampling.LANCZOS)

def main():
 src=P/'source.mp4'
 if not src.exists():src.write_bytes(base64.b64decode((P/'source.b64').read_text()))
 if not (P/'label.png').exists():(P/'label.png').write_bytes(base64.b64decode((P/'label.b64').read_text()))
 cap=subprocess.Popen(['ffmpeg','-v','error','-i',str(src),'-vf','fps=30,scale=474:850','-f','rawvideo','-pix_fmt','rgb24','-'],stdout=subprocess.PIPE)
 out=P/'junta-22441-23800-15s.mp4'
 enc=subprocess.Popen(['ffmpeg','-y','-v','error','-f','rawvideo','-pix_fmt','rgb24','-s','1080x1920','-r','30','-i','-','-an','-c:v','libx264','-preset','fast','-crf','19','-pix_fmt','yuv420p','-movflags','+faststart',str(out)],stdin=subprocess.PIPE)
 bg=makebg(0)
 for i in range(450):
  data=cap.stdout.read(474*850*3)
  if len(data)<474*850*3:raise RuntimeError('short source')
  im=bg.copy();prod=extract(np.frombuffer(data,np.uint8).reshape(850,474,3))
  # product occupies an unobstructed central studio area
  im.paste(prod,(40,390),prod)
  if i<135:headline='DETALHES REAIS DA PEÇA'
  elif i<300:headline='ACABAMENTO EM DESTAQUE'
  else:headline='CÓDIGO 22441 23800'
  text(im,(64,1225),headline,29,col='#53697e',b=True)
  if i in [0,150,300,449]:im.save(P/('preview-%d.jpg'%i))
  enc.stdin.write(im.tobytes())
 enc.stdin.close();assert enc.wait()==0
 cap.terminate()
 print(out)
if __name__=='__main__':main()
