import re

spline_path = r"c:\Users\Asus\my-3d-portfolio-2026-1\public\assets\skills-keyboard.spline"

with open(spline_path, 'rb') as f:
    data = f.read()

# Let's list the known keycap names and search for them in the file
keycaps = ["js", "ts", "html", "css", "react", "vue", "nextjs", "tailwind",
           "nodejs", "express", "postgres", "mongodb", "git", "github", "prettier", "npm",
           "firebase", "wordpress", "linux", "docker", "nginx", "aws", "vim", "vercel"]

print("Searching for keycap names in Spline file...")
for kc in keycaps:
    # Match the exact string prefix/suffix representation in MessagePack or just standard ASCII search
    # In MessagePack, a string "react" is represented as \xa5react (0xa5 is 10100101, i.e., fixstr of length 5)
    # A string "js" is \xa2js (0xa2 is 10100010, i.e., fixstr of length 2)
    # Let's search for the raw bytes
    kc_bytes = kc.encode('ascii')
    msgpack_prefix = bytes([0xa0 + len(kc)]) + kc_bytes
    
    positions = []
    idx = data.find(msgpack_prefix)
    while idx != -1:
        positions.append(idx)
        idx = data.find(msgpack_prefix, idx + 1)
        
    print(f"Keycap '{kc}': found {len(positions)} occurrences at offsets {positions}")

# Let's find all occurrences of common texture types or SVG keywords
for word in [b'png', b'jpg', b'svg', b'png', b'image', b'Asset', b'Texture', b'mesh', b'path', b'vector', b'Shape']:
    idx = 0
    matches = []
    while True:
        idx = data.find(word, idx)
        if idx == -1:
            break
        matches.append(idx)
        idx += 1
    if matches:
        print(f"Keyword '{word.decode()}' found {len(matches)} times. First few offsets: {matches[:10]}")
