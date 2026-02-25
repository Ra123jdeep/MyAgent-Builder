
import sys

filename = sys.argv[1] if len(sys.argv) > 1 else 'pnpm_install.log'
with open(filename, 'r', encoding='utf-16le', errors='ignore') as f:
    lines = f.readlines()
    for i, line in enumerate(lines):
        if "ERR_PNPM" in line or "No matching version" in line:
            print(f"Match at line {i}: {line.strip()}")
            # Print prev 5 lines
            for j in range(1, 6):
                if i - j >= 0:
                    print(f"Prev {j}: {lines[i-j].strip()}")
            # Print next 10 lines
            for j in range(1, 11):
                if i + j < len(lines):
                    print(lines[i+j].strip())
