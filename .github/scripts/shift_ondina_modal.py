from pathlib import Path

p = Path('index.html')
s = p.read_text(encoding='utf-8')
marker = '/* ONDINA MODAL LEFT FIT V2 */'

if marker in s:
    print('Ondina modal fit already applied')
    raise SystemExit(0)

css = r'''
    /* ONDINA MODAL LEFT FIT V2 */
    .modal-image:has(img[src="ondina.jpg"]){
      background:#eadfce;
      overflow:hidden;
    }
    .modal-image img[src="ondina.jpg"]{
      object-fit:contain !important;
      object-position:left center !important;
      width:90% !important;
      height:100% !important;
      left:0 !important;
      right:auto !important;
      top:0 !important;
      bottom:0 !important;
      margin:0 !important;
      transform:none !important;
      background:#eadfce;
    }
'''

if '</style>' not in s:
    raise SystemExit('No closing style tag found')

s = s.replace('</style>', css + '\n  </style>', 1)
p.write_text(s, encoding='utf-8')
print('Ondina modal shifted left and reduced to show full necklace')
