#!/usr/bin/env python3
"""Build a conceptual, fully editable GLB control-panel study.
Geometry is not a manufacturer specification, an IEC drawing or a real installation.
Usage: python tools/export_panel_glb.py
Requires: pip install trimesh numpy
"""
from pathlib import Path
import numpy as np
import trimesh

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'assets'/'conceptual-lv-panel.glb'
scene=trimesh.Scene()
C={
    'enclosure':(35,52,54,255),'steel':(103,133,131,255),'bright_steel':(187,209,193,255),
    'backplane':(22,37,40,255),'white':(224,230,218,255),'breaker':(183,204,195,255),
    'copper':(211,121,67,255),'gold':(243,187,97,255),'green':(83,219,173,255),
    'cyan':(87,211,229,255),'dark':(29,53,55,255),'terminal':(55,85,85,255)
}
serial=0

def cube(name,x,y,z,w,h,d,color):
    global serial
    serial+=1
    mesh=trimesh.creation.box(extents=[w,h,d]);mesh.apply_translation([x,y,z]);
    mesh.visual.vertex_colors=np.tile(np.array(C[color],dtype=np.uint8),(len(mesh.vertices),1))
    scene.add_geometry(mesh,node_name=f'{name}_{serial:03}',geom_name=f'{name}_{serial:03}')

def wire(name,points,r,color):
    global serial
    for a,b in zip(points,points[1:]):
        a=np.array(a,float);b=np.array(b,float);v=b-a;L=np.linalg.norm(v)
        if L<.0001:continue
        mesh=trimesh.creation.cylinder(radius=r,height=L,sections=10)
        T=trimesh.geometry.align_vectors([0,0,1],v/L)
        if T is not None:mesh.apply_transform(T)
        mesh.apply_translation((a+b)/2)
        mesh.visual.vertex_colors=np.tile(np.array(C[color],dtype=np.uint8),(len(mesh.vertices),1))
        serial+=1
        scene.add_geometry(mesh,node_name=f'{name}_{serial:03}',geom_name=f'{name}_{serial:03}')

# Dimensions are schematic and represent no physical product.
cube('ENCLOSURE_BACKPLANE',0,0,-.29,3.66,4.56,.15,'enclosure')
for x in [-1.78,1.78]:cube('ENCLOSURE_VERTICAL_FRAME',x,0,-.04,.10,4.55,.33,'steel')
for y in [-2.25,2.25]:cube('ENCLOSURE_HORIZONTAL_FRAME',0,y,-.04,3.66,.1,.33,'steel')
for y in [1.59,.50,-.59,-1.68]:
    cube('DIN_RAIL',0,y,-.06,3.35,.07,.12,'steel')
    cube('DIN_RAIL_LIP',0,y+.052,.05,3.35,.016,.11,'bright_steel')
for y in [1.90,2.03,2.16]:cube('COPPER_BUS_BAR',0,y,.12,3.1,.065,.075,'copper' if y!=2.03 else 'gold')

for i,x in enumerate([-1.07,0,1.07]):
    cube(f'BREAKER_QF{i+1}',x,1.13,.28,.82,.91,.47,'breaker')
    cube(f'BREAKER_FACE_QF{i+1}',x,1.13,.526,.70,.72,.035,'white')
    cube(f'BREAKER_SWITCH_QF{i+1}',x,1.18,.588,.22,.32,.07,'dark')
    cube(f'BREAKER_IDENTIFICATION_QF{i+1}',x,1.46,.56,.56,.045,.025,'gold')
    for offset in [-.23,0,.23]:
        cube('BREAKER_TERMINAL',x+offset,1.66,.35,.15,.14,.14,'terminal')
        cube('BREAKER_TERMINAL',x+offset,.62,.35,.15,.14,.14,'terminal')

for i,x in enumerate([-.75,.75]):
    cube(f'CONTACTOR_KM{i+1}',x,.03,.23,1.11,.94,.48,'dark')
    cube('CONTACTOR_FACE',x,.10,.491,.95,.65,.032,'steel')
    cube('CONTACTOR_COIL',x,.17,.538,.47,.18,.055,'bright_steel')
    cube('CONTACTOR_LABEL',x,-.21,.536,.68,.15,.035,'white')
    for offset in [-.31,0,.31]:
        for y in [-.44,.51]:cube('CONTACTOR_TERMINAL',x+offset,y,.36,.21,.12,.17,'terminal')

for i,x in enumerate([-1.16,-.38,.38,1.16]):
    cube(f'AUX_RELAY_K{i+1}',x,-1.28,.28,.60,.65,.36,'terminal')
    cube(f'AUX_RELAY_FACE_K{i+1}',x,-1.21,.475,.47,.38,.035,'steel')
    cube('AUX_RELAY_LABEL',x,-1.44,.505,.34,.07,.025,'gold' if i%2 else 'cyan')

for x in [-1.50,1.50]:
    cube('CABLE_DUCT',x,-.20,.20,.14,2.72,.25,'steel')
    for j in range(18):cube('CABLE_DUCT_SLOT',x,-1.48+j*.145,.335,.13,.025,.017,'dark')

wires=[
 ('L1',[(-1.06,.60,.61),(-1.06,.43,.65),(-.75,.43,.65),(-.75,.51,.65)],'gold'),
 ('L2',[(0,.60,.61),(0,.45,.65),(.75,.45,.65),(.75,.51,.65)],'green'),
 ('L3',[(1.06,.60,.61),(1.06,.36,.65),(.95,.36,.65)],'copper'),
 ('K1',[(-.75,-.44,.65),(-.75,-.78,.65),(-1.16,-.78,.65),(-1.16,-.94,.65)],'cyan'),
 ('K2',[(.75,-.44,.65),(.75,-.78,.65),(1.16,-.78,.65),(1.16,-.94,.65)],'gold'),
]
for name,coords,col in wires:wire(f'ROUTING_{name}',coords,.028,col)
for i,x in enumerate([-1.31,-.65,0,.65,1.31]):cube(f'EXIT_GLAND_{i+1}',x,-1.99,.3,.37,.14,.17,'enclosure')

OUT.parent.mkdir(parents=True,exist_ok=True)
OUT.write_bytes(scene.export(file_type='glb'))
print(f'Exported {len(scene.geometry)} named editable meshes to {OUT} ({OUT.stat().st_size:,} bytes)')