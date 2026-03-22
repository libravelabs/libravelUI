import os
import re

# Prefix yang didukung
PREFIXES = [
    "components/examples/core/",
    "components/examples/motion/",
    "components/examples/blocks/",
]

def detect_prefix(path_val: str) -> str:
    """Detect prefix yang digunakan dalam path."""
    for prefix in PREFIXES:
        if prefix in path_val:
            return prefix
    return "components/examples/core/"

def normalize_path(path_val: str) -> str:
    """Normalisasi path: fix duplicate prefix, normalize slashes, tambahkan .tsx."""
    clean_path = path_val.replace('//', '/')

    # Fix duplicate prefix untuk semua prefix
    for p in PREFIXES:
        clean_path = re.sub(rf'({re.escape(p)})+', p, clean_path)

    # Pastikan pakai prefix yang benar
    prefix = detect_prefix(clean_path)
    if not clean_path.startswith(prefix):
        for p in PREFIXES:
            if clean_path.startswith(p):
                clean_path = clean_path[len(p):]
        clean_path = prefix + clean_path

    # Tambahkan .tsx jika belum ada
    if not clean_path.lower().endswith(".tsx"):
        clean_path += ".tsx"

    return clean_path

def transform_playground(content):
    """Transform semua tag <Playground> di content MDX."""
    def replacer(match):
        full_tag = match.group(0)
        props_content = match.group(1)

        path_match = re.search(r'path="([^"]+)"', props_content)
        if not path_match:
            return full_tag

        old_path = path_match.group(1)
        new_path = normalize_path(old_path)

        # Skip jika tidak ada perubahan
        if new_path == old_path:
            # Hanya cleanup kemungkinan trailing slash ganda
            new_props = props_content.strip().rstrip('/')
            return f"<Playground {new_props} />"

        new_props = props_content.replace(
            path_match.group(0),
            f'path="{new_path}"'
        )

        # Hapus demo prop jika ada
        new_props = re.sub(r'\bdemo="[^"]*"', '', new_props)

        # Rapihin spasi dan hapus semua trailing slash liar
        new_props = re.sub(r'\s+', ' ', new_props).strip().rstrip('/')

        # Return dengan satu slash
        return f"<Playground {new_props} />"

    # Regex fix: jangan ikutkan slash asli ke props_content
    content = re.sub(
        r'<Playground\b([^>/]*?)\s*/?>',
        replacer,
        content,
        flags=re.DOTALL
    )

    # Cleanup global untuk file yang udah terlanjur rusak
    content = re.sub(r'/\s*/\s*>', '/>', content)

    return content

# Folder target
search_dirs = [
    r"c:\Users\vondoom\Documents\coding\morethanjs\libravelUI\apps\docs\content\docs\components\core",
    r"c:\Users\vondoom\Documents\coding\morethanjs\libravelUI\apps\docs\content\docs\components\motion",
    r"c:\Users\vondoom\Documents\coding\morethanjs\libravelUI\apps\docs\content\docs\components\blocks",
]

# Loop semua file MDX
for base_dir in search_dirs:
    if not os.path.exists(base_dir):
        continue

    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith(".mdx"):
                file_path = os.path.join(root, file)

                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()

                new_content = transform_playground(content)

                if new_content != content:
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(new_content)

                    print(f"Updated: {file_path}")