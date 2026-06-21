import os
import zipfile

spline_path = r"c:\Users\Asus\my-3d-portfolio-2026-1\public\assets\skills-keyboard.spline"

print(f"File size: {os.path.getsize(spline_path)} bytes")

# Check if it is a ZIP file
if zipfile.is_zipfile(spline_path):
    print("It is a ZIP archive!")
    with zipfile.ZipFile(spline_path, 'r') as z:
        print("Archive contents:")
        for name in z.namelist():
            print(f" - {name}")
else:
    print("It is not a ZIP archive. Checking first 100 bytes...")
    with open(spline_path, 'rb') as f:
        head = f.read(100)
        print(f"Header hex: {head.hex()}")
        print(f"Header ASCII: {repr(head)}")
