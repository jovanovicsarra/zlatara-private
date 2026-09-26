from pathlib import Path

p = Path('index.html')
s = p.read_text(encoding='utf-8')
old = 'image:"Amélie.jpg"'
new = 'image:"Ame%CC%81lie.jpg"'
if old not in s:
    raise SystemExit('Amelie image reference not found')
s = s.replace(old, new, 1)
p.write_text(s, encoding='utf-8')
print('Fixed Amelie filename reference')
