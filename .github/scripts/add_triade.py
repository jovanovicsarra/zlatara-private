from pathlib import Path

p = Path('index.html')
s = p.read_text(encoding='utf-8')

if 'name:"Ogrlica Triade"' in s:
    print('Triade already exists')
    raise SystemExit(0)

needle = '  const products = [\n'
if needle not in s:
    raise SystemExit('Products array start not found')

triade = '    {id:11,name:"Ogrlica Triade",cat:"Ogrlice",price:null,available:false,badge:"Novo",material:"Zlato u tri tona",fine:"Podaci uskoro",weight:"Podaci uskoro",size:"Podaci uskoro",desc:"Prefinjena trostruka ogrlica u tri tona zlata — žutom, roze i belom. Fotografija prikazuje stvarni model; tehnički podaci i cena biće uneti pre aktivacije online kupovine.",image:"triade.jpg",hover:""},\n'

s = s.replace(needle, needle + triade, 1)
p.write_text(s, encoding='utf-8')
print('Triade product added')
