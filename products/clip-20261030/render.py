import subprocess
from pathlib import Path
import os
os.chdir(Path(__file__).resolve().parent)
Path('out').mkdir(exist_ok=True)
files=['0','1','2','3']
starts=[0,0,0,0]
durs=[5.5,5,5.5,5.5]
cmd=['ffmpeg','-y','-filter_complex_threads','2']
for f in files:cmd+=['-i',f'{f}.mp4']
filters=[]
for i in range(4):
 s=f'[{i}:v]trim=start={starts[i]}:duration={durs[i]},setpts=PTS-STARTPTS,fps=30,scale=1080:1920:flags=lanczos,setsar=1,format=yuv420p,hqdn3d=1.5:1.5:4:4,eq=brightness=0.025:contrast=1.08:saturation=1.03:gamma=1.26,unsharp=5:5:0.55:3:3:0'
 if i==0:s+=",eq=brightness='if(lt(t,0.75),-0.22*(1-t/0.75),0)':eval=frame,fade=t=in:st=0:d=0.28"
 filters.append(s+f'[v{i}]')
filters+=['[v0][v1]xfade=transition=fade:duration=0.35:offset=5.15[x1]','[x1][v2]xfade=transition=smoothleft:duration=0.35:offset=9.8[x2]','[x2][v3]xfade=transition=fade:duration=0.35:offset=14.95,fade=t=out:st=19.95:d=0.5[out]']
cmd+=['-filter_complex',';'.join(filters),'-map','[out]','-an','-c:v','libx264','-preset','fast','-crf','18','-profile:v','high','-level:v','4.0','-pix_fmt','yuv420p','-threads','2','-movflags','+faststart','-metadata:s:v:0','rotate=0','out/Cooper-Clip-Mercado-Livre.mp4']
with open('out/render.log','w') as log:subprocess.run(cmd,stdout=log,stderr=log,check=True)
