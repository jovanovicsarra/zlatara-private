from pathlib import Path

p = Path('index.html')
s = p.read_text(encoding='utf-8')

if 'name:"Ogrlica Amélie"' in s:
    print('Ogrlica Amélie već postoji u katalogu.')
    raise SystemExit(0)

anchor = '  const products = [\n    {id:9,name:"Ogrlica Ondina"'
if anchor not in s:
    raise SystemExit('Nije pronađen početak kataloga sa Ogrlicom Ondina.')

product = '''  const products = [\n    {id:10,name:"Ogrlica Amélie",cat:"Ogrlice",price:null,available:false,badge:"Novo",material:"Zlato",fine:"Podaci uskoro",weight:"Podaci uskoro",size:"Podaci uskoro",desc:"Nežna ogrlica sa srcolikim priveskom i svedenom, elegantnom linijom. Fotografija prikazuje stvarni model; tehnički podaci i cena biće uneti pre aktivacije online kupovine.",image:"Amélie.jpg",hover:""},\n    {id:9,name:"Ogrlica Ondina"'''

s = s.replace(anchor, product, 1)
p.write_text(s, encoding='utf-8')
print('Ogrlica Amélie je dodata u katalog i čeka fajl Amélie.jpg.')
