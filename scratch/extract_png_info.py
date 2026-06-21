spline_path = r"c:\Users\Asus\my-3d-portfolio-2026-1\public\assets\skills-keyboard.spline"

with open(spline_path, 'rb') as f:
    data = f.read()

# Search for the string ".png" or "png" and dump around it
idx = 0
while True:
    idx = data.find(b'png', idx)
    if idx == -1:
        break
    
    # Grab 50 bytes before and 20 bytes after
    start = max(0, idx - 50)
    end = min(len(data), idx + 20)
    chunk = data[start:end]
    print(f"Offset {idx:6d}: {repr(chunk)}")
    idx += 1
