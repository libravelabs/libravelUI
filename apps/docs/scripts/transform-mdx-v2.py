
import os
import re
import ast

def transform_example(content):
    def replacer(match):
        props = match.group(1)
        name_match = re.search(r'name="([^"]+)"', props)
        section_match = re.search(r'section="([^"]+)"', props)
        
        if not name_match:
            return match.group(0)
            
        name = name_match.group(1)
        section = section_match.group(1) if section_match else "motion"
        
        path = f"components/examples/{section}/{name}"
        path = path.replace("//", "/")
        
        new_props = props.replace(name_match.group(0), f'path="{path}"')
        if section_match:
            new_props = new_props.replace(section_match.group(0), "")
        
        new_props = re.sub(r'\s+', ' ', new_props).strip()
        return f"<Example {new_props} />"

    return re.sub(r'<Example\b([^>]*)/?>', replacer, content)

def transform_preview_block(content):
    def replacer(match):
        full_tag = match.group(0)
        props_str = match.group(1)
        
        section_match = re.search(r'section="([^"]+)"', props_str)
        if not section_match:
            return full_tag
            
        section = section_match.group(1)
        comp_match = re.search(r'comp=\{([^}]+)\}', props_str, re.DOTALL)
        file_match = re.search(r'file="([^"]+)"', props_str)
        default_file = file_match.group(1) if file_match else "index"
        
        if not comp_match:
            return full_tag
            
        comp_raw = comp_match.group(1).strip()
        # This is tricky because it's JS array/objects not JSON.
        # Minimalist approach: regex replace within the content
        
        def process_item(item_str):
            item_str = item_str.strip()
            if item_str.startswith("{") and item_str.endswith("}"):
                # Object case: { name: "...", file: "..." }
                name_m = re.search(r'name:\s*"([^"]+)"', item_str)
                file_m = re.search(r'file:\s*"([^"]+)"', item_str)
                if name_m:
                    n = name_m.group(1)
                    f = file_m.group(1) if file_m else default_file
                    p = f"components/examples/{section}/{n}/{f}".replace("//", "/")
                    # Check if it has other props like className
                    cn_m = re.search(r'className:\s*("[^"]+"|\{\s*[^}]+\s*\})', item_str)
                    if cn_m:
                        return f'{{ path: "{p}", className: {cn_m.group(1)} }}'
                    return f'"{p}"'
            elif item_str.startswith('"') and item_str.endswith('"'):
                n = item_str[1:-1]
                p = f"components/examples/{section}/{n}/{default_file}".replace("//", "/")
                return f'"{p}"'
            return item_str

        # Split items by comma but keep objects together
        items = []
        depth = 0
        current = ""
        for char in comp_raw:
            if char == "{": depth += 1
            if char == "}": depth -= 1
            if char == "," and depth == 0:
                items.append(current.strip())
                current = ""
            else:
                current += char
        if current.strip():
            items.append(current.strip())
            
        new_items = [process_item(i) for i in items if i]
        new_comp_str = "[" + ", ".join(new_items) + "]"
        
        new_props = props_str.replace(comp_match.group(0), f'path={{{new_comp_str}}}')
        new_props = new_props.replace(section_match.group(0), "")
        if file_match:
            new_props = new_props.replace(file_match.group(0), "")
            
        new_props = re.sub(r'\s+', ' ', new_props).strip()
        return f"<PreviewBlock {new_props} />"

    return re.sub(r'<PreviewBlock\b([^>]*)/?>', replacer, content, flags=re.DOTALL)

def main():
    search_dirs = [
        r"c:\Users\vondoom\Documents\coding\morethanjs\libravelUI\apps\docs\content\docs\components"
    ]

    for base_dir in search_dirs:
        for root, dirs, files in os.walk(base_dir):
            for file in files:
                if file.endswith(".mdx"):
                    file_path = os.path.join(root, file)
                    with open(file_path, "r", encoding="utf-8") as f:
                        content = f.read()
                    
                    new_content = transform_example(content)
                    new_content = transform_preview_block(new_content)
                    
                    if new_content != content:
                        with open(file_path, "w", encoding="utf-8") as f:
                            f.write(new_content)
                        print(f"Updated: {file_path}")

if __name__ == "__main__":
    main()
