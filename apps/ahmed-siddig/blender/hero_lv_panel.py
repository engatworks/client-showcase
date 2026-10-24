"""Ahmed Siddig / The Signal — a procedural conceptual LV cabinet asset.

Run with Blender 4.2+ (not available in the authoring runtime):

    blender --background --python blender/hero_lv_panel.py -- --out assets/ahmed-panel.glb

The output is a 3D illustration intended for browser art direction.
It is NOT a panel design, certified wiring scheme, manufacturing drawing,
compliant protection selection, or electrical safety specification.
"""
import bpy
import math
import sys
from pathlib import Path
from mathutils import Vector

# Keep an independent procedural workflow rather than editing purchased models.
bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete(use_global=False)


def material(name, rgba, metallic=0.0, roughness=0.45, emission=None):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    bsdf = m.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = tuple(rgba)
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = roughness
    if emission:
        bsdf.inputs["Emission Color"].default_value = tuple(emission[0])
        bsdf.inputs["Emission Strength"].default_value = emission[1]
    return m

steel = material("Cabinet | satin steel", (.28,.37,.34,1), .77, .36)
paint = material("Cabinet | graphite paint", (.055,.092,.082,1), .45, .45)
edge = material("Edge | brushed steel", (.54,.63,.58,1), .82, .25)
porcelain = material("Protection | light thermoplastic", (.81,.84,.75,1), .05, .54)
black = material("Control | dark molded polymer", (.10,.15,.13,1), .02, .57)
copper = material("Bus bars | warm copper", (.73,.39,.19,1), .87, .25)
gold = material("Terminal | brass", (.85,.62,.29,1), .85, .24)
aqua = material("Signal | insulated conductor", (.08,.52,.43,1), .04, .43)
cream = material("Insulation | pale", (.63,.76,.64,1), .04, .5)
glow = material("Signal light | luminous", (.40,.98,.63,1), 0, .33, ((.23,.96,.51,1), 2))


def box(name, x, y, z, w, d, h, mat, bevel=.012, parent=None):
    bpy.ops.mesh.primitive_cube_add(size=1, location=(x,y,z))
    obj=bpy.context.object
    obj.name=name
    obj.dimensions=(w,d,h)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(mat)
    if bevel:
        mod=obj.modifiers.new("Machined edges", "BEVEL")
        mod.width=bevel
        mod.segments=2
        if hasattr(mod, 'affect'):
            mod.affect='EDGES'
        normals=obj.modifiers.new("Weighted metal normals", "WEIGHTED_NORMAL")
    if parent: obj.parent=parent
    return obj


def conduit(name, pts, mat, thickness=.027):
    curve=bpy.data.curves.new(name,'CURVE')
    curve.dimensions='3D'
    curve.resolution_u=24
    curve.bevel_depth=thickness
    curve.bevel_resolution=3
    curve.use_fill_caps=True
    spline=curve.splines.new('BEZIER')
    spline.bezier_points.add(len(pts)-1)
    for bp, pt in zip(spline.bezier_points,pts):
        bp.co=pt;bp.handle_left_type='AUTO';bp.handle_right_type='AUTO'
    ob=bpy.data.objects.new(name,curve)
    bpy.context.collection.objects.link(ob)
    ob.data.materials.append(mat)
    return ob


def bolt(name, x,y,z, r=.048):
    bpy.ops.mesh.primitive_cylinder_add(vertices=12, radius=r, depth=.027, location=(x,y,z))
    ob=bpy.context.object;ob.name=name
    ob.rotation_euler[0]=math.pi/2
    ob.data.materials.append(edge)
    return ob

# The unitless relative scale is for cinematic visualization only.
box('01 | removable back plate',0,0,0,3.72,.18,4.67,paint,.018)
for x in (-1.85,1.85):
    box('Frame | vertical extrusion',x,-.09,0,.12,.28,4.72,steel)
for z in (-2.29,2.29):
    box('Frame | horizontal extrusion',0,-.09,z,3.74,.28,.12,steel)
for z in (1.63,.53,-.61,-1.72):
    box('Mounting rail | DIN',0,-.17,z,3.25,.16,.10,edge)
    box('Rail | inset',0,-.267,z+.053,3.19,.038,.018,steel,.005)
# Upper three busbars, behind device modules.
for i,z in enumerate((2.00,1.88,1.76)):
    box(f'Busbar | {i+1}',0,-.29,z,3.10,.072,.06,copper if i!=1 else gold,.006)
# Molded circuit breakers with fascia, handles, and terminals.
for i,x in enumerate((-1.03,0,1.03)):
    box(f'Breaker QF{i+1} | housing',x,-.45,1.05,.82,.46,.87,black)
    box(f'Breaker QF{i+1} | front',x,-.70,1.06,.69,.045,.70,porcelain)
    box(f'Breaker QF{i+1} | isolator',x,-.755,1.07,.16,.08,.30,black)
    box(f'Breaker QF{i+1} | copper label',x,-.737,1.38,.49,.016,.026,gold,.003)
    for j,off in enumerate((-.23,0,.23)):
        box(f'QF{i+1} terminal {j+1}',x+off,-.51,1.51,.14,.14,.13,edge)
        bolt(f'QF{i+1} screw {j+1}',x+off,-.615,1.54,.03)
# The two contactors sit on their own rails below the breakers.
for i,x in enumerate((-.72,.72)):
    box(f'Contactor KM{i+1} | housing',x,-.45,-.16,1.05,.46,.93,black)
    box(f'Contactor KM{i+1} | face',x,-.703,-.16,.86,.04,.62,edge)
    box(f'Contactor KM{i+1} | coil inset',x,-.738,-.08,.48,.04,.23,paint)
    box(f'Contactor KM{i+1} | ID',x,-.747,-.39,.64,.024,.10,porcelain,.003)
    for off in (-.30,0,.30):
        for z in (-.64,.35):
            box('Terminal cover | cont.',x+off,-.515,z,.20,.18,.11,black)
            bolt('Terminal head | cont.',x+off,-.63,z,.028)
# Bottom relays and terminal blocks.
for i,x in enumerate((-1.13,-.38,.38,1.13)):
    box(f'Control relay K{i+1}',x,-.46,-1.49,.56,.32,.58,black)
    box(f'Control relay K{i+1} | label',x,-.651,-1.45,.44,.028,.23,porcelain,.006)
    box(f'Control relay K{i+1} | indicator',x,-.678,-1.61,.21,.022,.05,glow if i==2 else gold,.003)
    for z in (-1.18,-1.8):
        bolt('Relay terminal',x,-.51,z,.024)
# Simple branch wires show routing; they do NOT purport to show certified circuitry.
conductors=[
    ([(-1.03,-.54,.55),(-1.03,-.79,.43),(-.72,-.79,.43),(-.72,-.50,.27)],aqua),
    ([(0,-.54,.55),(0,-.83,.45),(.72,-.83,.45),(.72,-.50,.27)],copper),
    ([(1.03,-.54,.55),(1.03,-.85,-.80),(.38,-.85,-.8),(.38,-.51,-1.09)],cream),
    ([(-.72,-.54,-.72),(-.72,-.83,-.91),(-1.13,-.83,-.91),(-1.13,-.52,-1.18)],gold),
    ([(.72,-.54,-.72),(.72,-.80,-.95),(1.13,-.8,-.95),(1.13,-.52,-1.18)],aqua)
]
for i,(pts,mat) in enumerate(conductors):
    conduit(f'Stylized branch conductor | {i+1}',pts,mat,.018)
# Decorative fasteners and tags (art direction, not circuit ratings).
for x in (-1.68,1.68):
    for z in (-2.12,0,2.12):
        bolt('Panel frame fastener',x,-.30,z,.044)
box('Visual copper inspection strip',0,-.42,-2.10,1.25,.05,.04,copper,.004)

# Geometry is exported; camera and lights are included primarily for Blender review.
world=bpy.context.scene.world
world.color=(.05,.08,.07)

def area(name,pos,energy,size):
    bpy.ops.object.light_add(type='AREA', location=pos)
    ob=bpy.context.object;ob.name=name;ob.data.energy=energy;ob.data.shape='DISK';ob.data.size=size
    ob.rotation_euler=(Vector((0,0,0))-ob.location).to_track_quat('-Z','Y').to_euler()

area('Key | softbox',(1.8,-4.9,5.5),720,6)
area('Edge | coolbox',(-3,-1.7,4.4),460,4)
area('Fill | warmbox',(4,2.0,-.6),500,4)

bpy.ops.object.camera_add(location=(5,-9,5.5))
camera=bpy.context.object
camera.rotation_euler=(Vector((0,0,0))-camera.location).to_track_quat('-Z','Y').to_euler()
bpy.context.scene.camera=camera
camera.data.type='ORTHO';camera.data.ortho_scale=7.2
scene=bpy.context.scene
scene.render.resolution_x=1600
scene.render.resolution_y=1800
scene.render.resolution_percentage=100

args=sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else []
out=Path('assets/ahmed-panel.glb')
if '--out' in args:
    out=Path(args[args.index('--out')+1])
out.parent.mkdir(parents=True,exist_ok=True)
# Save scene alongside export for editing in Blender later.
bpy.ops.wm.save_as_mainfile(filepath=str(out.with_suffix('.blend').resolve()))
# Export geometry only; source lighting is intentionally managed in the browser.
bpy.ops.export_scene.gltf(filepath=str(out.resolve()), export_format='GLB', export_apply=True, export_cameras=False, export_lights=False)
print('3D ASSET EXPORTED:',out.resolve())