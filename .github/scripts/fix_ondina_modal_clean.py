from pathlib import Path

p = Path('index.html')
s = p.read_text(encoding='utf-8')

old = r'''    /* ONDINA MODAL LEFT FIT V2 */
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

new = r'''    /* ONDINA MODAL CLEAN FIT */
    .modal-box:has(.modal-image img[src="ondina.jpg"]){
      grid-template-columns:50% 50%;
    }
    .modal-image:has(img[src="ondina.jpg"]){
      background:#eadfce;
      overflow:hidden;
    }
    .modal-image img[src="ondina.jpg"]{
      object-fit:contain !important;
      object-position:center center !important;
      width:100% !important;
      height:100% !important;
      left:0 !important;
      right:0 !important;
      top:0 !important;
      bottom:0 !important;
      margin:auto !important;
      transform:none !important;
      background:#eadfce;
    }
'''

if old not in s:
    raise SystemExit('Old Ondina modal block not found')

s = s.replace(old, new, 1)
p.write_text(s, encoding='utf-8')
print('Ondina modal cleaned and centered')
