#!/usr/bin/env python3
import os
import json

def scan_folder(path):
    '''
    Recursively scans the folder at `path` and builds a dictionary representing
    the folder structure. Files are stored in a 'files' array inside each folder.
    '''
    tree = {}
    for entry in sorted(os.listdir(path)):
        full_path = os.path.join(path, entry)
        if os.path.isdir(full_path):
            # Recursive scan for subfolders
            tree[entry] = scan_folder(full_path)
        else:
            # File
            if 'files' not in tree:
                tree['files'] = []
            tree['files'].append(entry)
    return tree

def main():
    # Ask user for root folder path, default to 'tree'
    user_input = input('Enter the root folder to scan [default: tree]: ').strip()
    root_folder = user_input if user_input else 'tree'

    output_js_file = 'scripts/file_structure.js'  # output JS file

    if not os.path.exists(root_folder):
        print(f'Error: root folder "{root_folder}" does not exist.')
        return

    # Create output folder if it doesn't exist
    os.makedirs(os.path.dirname(output_js_file), exist_ok=True)

    # Scan folder
    file_tree = scan_folder(root_folder)

    # Write JS file
    with open(output_js_file, 'w') as f:
        f.write(f'const fileStructure = {json.dumps(file_tree, indent=4)};\n')

    print(f'file_structure.js generated successfully at "{output_js_file}"!')

if __name__ == '__main__':
    main()
