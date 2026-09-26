from pathlib import Path

p = Path('index.html')
s = p.read_text(encoding='utf-8')
marker = '/* ONDINA FULL-NECKLACE FIT */'
if marker in s:
    print('Ondina fit already applied')
    raise SystemExit(0)

css = r'''
    /* ONDINA FULL-NECKLACE FIT */
    .pic:has(img[src="ondina.jpg"]){
      background:#eadfce;
    }
    .pic img[src="ondina.jpg"]{
      object-fit:contain !important;
      object-position:center center !important;
      transform:none !important;
      background:#eadfce;
    }
    .card:hover .pic img[src="ondina.jpg"]{
      transform:none !important;
    }
    .modal-image:has(img[src="ondina.jpg"]){
      background:#eadfce;
    }
    .modal-image img[src="ondina.jpg"]{
      object-fit:contain !important;
      object-position:center center !important;
      background:#eadfce;
      padding:0;
    }
'''

if '</style>' not in s:
    raise SystemExit('No closing style tag found')
s = s.replace('</style>', css + '\n  </style>', 1)
p.write_text(s, encoding='utf-8')
print('Ondina image fit fixed')
