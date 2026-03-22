
import os
import re

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

def transform_installation(content):
    def replacer(match):
        props = match.group(1)
        name_match = re.search(r'name="([^"]+)"', props)
        section_match = re.search(r'section="([^"]+)"', props)
        
        if not name_match:
            return match.group(0)
            
        name = name_match.group(1)
        section = section_match.group(1) if section_match else "motion"
        
        path = f"components/ui/{section}/{name}"
        path = path.replace("//", "/")
        
        new_props = props.replace(name_match.group(0), f'path="{path}"')
        if section_match:
            new_props = new_props.replace(section_match.group(0), "")
        
        new_props = re.sub(r'\s+', ' ', new_props).strip()
        # Keep name and section if they are needed for something else, but here we prefer path.
        # Actually my refactored Installation still supports them as fallback.
        return f"<Installation {new_props} />"

    return re.sub(r'<Installation\b([^>]*)/?>', replacer, content)

def main():
    search_dirs = [
        r"c:\Users\vondoom\Documents\coding\morethanjs\libravelUI\apps\docs\content\docs\components"
    ]

    for base_dir in search_dirs:
        for root, dirs, files in os.walk(base_dir):
            for file in files:
                if file.endswith(".mdx"):
                    file_path = os.path.join(root, file)
                    # Skip index.mdx since I fixed it manually
                    if file == "index.mdx": continue
                    
                    with open(file_path, "r", encoding="utf-8") as f:
                        content = f.read()
                    
                    new_content = transform_example(content)
                    new_content = transform_installation(new_content)
                    
                    if new_content != content:
                        with open(file_path, "w", encoding="utf-8") as f:
                            f.write(new_content)
                        print(f"Updated: {file_path}")

if __name__ == "__main__":
    main()
