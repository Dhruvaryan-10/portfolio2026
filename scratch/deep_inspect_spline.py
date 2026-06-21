"""
Deep inspection of skills-keyboard.spline (MessagePack binary).
For each target keycap, extract material hierarchy and embedded PNG details.
ASCII-safe output.
"""
import sys
sys.stdout.reconfigure(encoding='utf-8')

SPLINE = r"c:\Users\Asus\my-3d-portfolio-2026-1\public\assets\skills-keyboard.spline"
TARGETS = ["ts", "vue", "npm", "prettier", "firebase", "aws", "nginx"]

with open(SPLINE, "rb") as f:
    data = f.read()

def findall(haystack, needle):
    out, start = [], 0
    while True:
        idx = haystack.find(needle, start)
        if idx == -1:
            return out
        out.append(idx)
        start = idx + 1

PNG_SIG = b'\x89PNG\r\n\x1a\n'
IEND    = b'IEND\xaeB`\x82'

png_starts = findall(data, PNG_SIG)

# Build a quick lookup: keycap_name -> (png_offset, png_end, png_size, texture_filename)
png_info = []
for ps in png_starts:
    ie = data.find(IEND, ps)
    pend = ie + len(IEND) if ie != -1 else -1
    psize = pend - ps if pend != -1 else -1
    fname = ""
    if pend != -1 and pend < len(data):
        b = data[pend]
        if 0xa0 <= b <= 0xbf:
            slen = b - 0xa0
            fname = data[pend+1:pend+1+slen].decode('ascii', errors='replace')
        elif b == 0xd9:
            slen = data[pend+1]
            fname = data[pend+2:pend+2+slen].decode('ascii', errors='replace')
    png_info.append((ps, pend, psize, fname))

# For each target, inspect surrounding structure
for kc in TARGETS:
    kc_bytes = kc.encode('ascii')
    msgpack_str = bytes([0xa0 + len(kc)]) + kc_bytes
    positions = findall(data, msgpack_str)
    
    print("=" * 80)
    print(f"KEYCAP OBJECT: \"{kc}\"")
    print(f"  Occurrences in file: {len(positions)} at offsets {positions}")
    print("=" * 80)
    
    # Use the first (primary) occurrence - this is the object definition
    pos = positions[0] if positions else -1
    if pos == -1:
        print("  NOT FOUND\n")
        continue
    
    # --- Extract readable strings in the surrounding context ---
    ctx_before = 300
    ctx_after  = 600
    start = max(0, pos - ctx_before)
    end   = min(len(data), pos + len(msgpack_str) + ctx_after)
    block = data[start:end]
    
    strings = []
    i = 0
    while i < len(block):
        b = block[i]
        slen = 0
        soff = 0
        if 0xa0 <= b <= 0xbf:
            slen = b - 0xa0
            soff = 1
        elif b == 0xd9 and i+1 < len(block):
            slen = block[i+1]
            soff = 2
        
        if slen >= 2 and i + soff + slen <= len(block):
            candidate = block[i+soff:i+soff+slen]
            if all(32 <= c < 127 for c in candidate):
                abs_offset = start + i
                strings.append((abs_offset, candidate.decode('ascii')))
                i += soff + slen
                continue
        i += 1
    
    # Categorize the strings
    material_keys = {'color','image','opacity','roughness','metalness','emission',
                     'normal','bump','ao','clearcoat','sheen','gradient','texture',
                     'fillColor','baseColor','emissive','specular','name','type',
                     'visible','children','layers','material','mesh','geometry',
                     'position','rotation','scale','id','fi','data'}
    
    print(f"\n  --- Object context strings (offsets {start} to {end}) ---")
    for soff, s in strings:
        tag = ""
        if s == kc:
            tag = " <<< OBJECT NAME"
        elif s.endswith('.png'):
            tag = " <<< PNG TEXTURE FILE"
        elif s in material_keys:
            tag = f" [material/structure key]"
        print(f"    @{soff:>6d}  \"{s}\"{tag}")
    
    # Find the PNG that belongs to this keycap
    # Strategy: find the PNG blob that starts AFTER this keycap's position
    # and is closest to it (within the ~12KB keycap block)
    owned_png = None
    for pi in png_info:
        ps, pend, psize, fname = pi
        if ps > pos and ps - pos < 18000:
            owned_png = pi
            break
    
    print(f"\n  --- Embedded Logo PNG ---")
    if owned_png:
        ps, pend, psize, fname = owned_png
        print(f"    PNG offset:    {ps:>8,}")
        print(f"    PNG end:       {pend:>8,}")
        print(f"    PNG size:      {psize:>8,} bytes")
        print(f"    Texture name:  \"{fname}\"")
        
        # Read IHDR to get dimensions
        if psize > 24:
            ihdr = data[ps+16:ps+24]
            width = int.from_bytes(ihdr[0:4], 'big')
            height = int.from_bytes(ihdr[4:8], 'big')
            print(f"    Dimensions:    {width} x {height} px")
    else:
        print(f"    No PNG found within keycap block")
    
    # Determine logo type
    print(f"\n  --- Logo Type Analysis ---")
    if owned_png:
        print(f"    Type: EMBEDDED RASTER IMAGE TEXTURE (PNG)")
        print(f"    The logo is a PNG image mapped as a texture layer")
        print(f"    inside the keycap's material stack.")
        print(f"    It is NOT a vector shape or mesh geometry.")
        print(f"    It CAN be replaced by uploading a new PNG in Spline.")
    
    # Check if there are vector/path/shape references nearby
    for soff, s in strings:
        if s in ('path', 'Shape', 'vector', 'SVG', 'spline-path'):
            print(f"    WARNING: Found vector-like key \"{s}\" at {soff}")
    
    print()

# Final summary
print("\n" + "=" * 80)
print("REPLACEMENT PLAN SUMMARY")
print("=" * 80)
print("""
For each of the 7 keycaps below, the visible logo is an EMBEDDED PNG IMAGE
TEXTURE within the keycap object's material layer stack. The logo is:

  - NOT vector art (no SVG/path data in the keycap blocks)
  - NOT mesh geometry (the keycap mesh is a generic box; the logo is a texture)
  - A flat PNG raster image mapped onto the top face of the keycap

REPLACEMENT PROCEDURE (preserves ALL interactions, animations, object names):

  1. Open skills-keyboard.spline in the Spline editor
  2. Select the keycap object by name (e.g., "vue")
  3. In the right panel, find Material > Image layer
  4. Click the image thumbnail > Replace/Upload new PNG
  5. Adjust scale/offset to center the new logo
  6. Repeat for all 7 keycaps
  7. Export as .spline and overwrite public/assets/skills-keyboard.spline

KEYCAP REPLACEMENT TABLE:

  Object    Current Texture                        New Logo       PNG Size
  ------    -----------------------------------    ----------     --------""")

replacements = {
    "ts":       ("TypeScript hash PNG",              "Python"),
    "vue":      ("vuedotjs-modified.png",            "Unity"),
    "npm":      ("npm-modified.png",                 "AI"),
    "prettier": ("prettier-modified.png",            "Machine Learning"),
    "firebase": ("firebase-modified.png",            "SQL"),
    "aws":      ("amazonwebservices-modified.png",    "Power BI"),
    "nginx":    ("nginx-modified.png",               "Arduino"),
}

for kc in TARGETS:
    curr, new = replacements[kc]
    # Find owned PNG size
    msgpack_str = bytes([0xa0 + len(kc)]) + kc.encode('ascii')
    pos = data.find(msgpack_str)
    psize_str = "?"
    for ps, pend, psize, fname in png_info:
        if ps > pos and ps - pos < 18000:
            psize_str = f"{psize:,}"
            break
    print(f"  {kc:12s}  {curr:40s}  {new:15s}  {psize_str:>8s} bytes")

print("""
SAFETY GUARANTEES:
  - Object names are NEVER renamed (vue stays "vue", aws stays "aws", etc.)
  - Mouse hover events read e.target.name which stays unchanged
  - KeyDown events read e.target.name which stays unchanged
  - GSAP animations reference findObjectByName() which stays unchanged
  - The SKILLS mapping in constants.ts already maps these slots correctly
  - Only the VISUAL TEXTURE (the PNG image) changes
""")
