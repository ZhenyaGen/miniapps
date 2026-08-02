"""Unpack the VK docs PDF archives into a flat, deduplicated directory.

Usage: python3 extract_pdfs.py <dir-with-zips> [out-dir]

The archives store Cyrillic names in cp437; unzip(1) chokes on the resulting
path lengths, so files are written under a content hash and the real names are
kept in _manifest.json.
"""
import zipfile, os, json, hashlib, glob, sys

SRC = sys.argv[1] if len(sys.argv) > 1 else '.'
OUT = sys.argv[2] if len(sys.argv) > 2 else '_raw'
os.makedirs(OUT, exist_ok=True)
manifest = []
seen = {}

for z in sorted(glob.glob(os.path.join(SRC, "*.zip"))):
    zf = zipfile.ZipFile(z)
    for info in zf.infolist():
        if info.is_dir():
            continue
        try:
            name = info.filename.encode('cp437').decode('utf-8')
        except Exception:
            name = info.filename
        data = zf.read(info)
        h = hashlib.sha256(data).hexdigest()[:16]
        if h in seen:
            manifest.append({"zip": os.path.basename(z), "orig": name, "file": seen[h], "dup": True, "size": len(data)})
            continue
        ext = os.path.splitext(name)[1] or ".bin"
        out_name = h + ext
        with open(os.path.join(OUT, out_name), "wb") as f:
            f.write(data)
        seen[h] = out_name
        manifest.append({"zip": os.path.basename(z), "orig": name, "file": out_name, "dup": False, "size": len(data)})

with open(os.path.join(OUT, "_manifest.json"), "w", encoding="utf-8") as f:
    json.dump(manifest, f, ensure_ascii=False, indent=1)

print("total entries:", len(manifest), "unique files:", len(seen))
