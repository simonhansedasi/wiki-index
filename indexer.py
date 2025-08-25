#!/usr/bin/env python3
import os
import json

root = '/home/simonhans/coding/wiki-index/tree'  

output = 'scripts/file_structure.js'



def scan_folder(path):

    tree = {}
    files = []

    for entry in sorted(os.listdir(path)):
        if entry.startswith('.'):
            continue
        full_path = os.path.join(path, entry)
        if os.path.isdir(full_path):
            tree[entry] = scan_folder(full_path)
        else:
            files.append(entry)

    if files:
        tree['files'] = files
    return tree




def main():
    if not os.path.exists(root):
        print(f'Error: repo folder "{root}" does not exist.')
        return

    # Top-level key is the folder name of the repo
    top_key = os.path.basename(root.rstrip(os.sep))
    file_tree = {top_key: scan_folder(root)}

    # Make sure output folder exists
    os.makedirs(os.path.dirname(output), exist_ok=True)

    with open(output, 'w') as f:
        f.write(f'const fileStructure = {json.dumps(file_tree, indent=4)};\n')

    print(f'file_structure.js generated successfully at "{output}"!')

if __name__ == '__main__':
    main()
