from pathlib import Path
import re

p=Path('index.html')
s=p.read_text(encoding='utf-8')

if 'name:"Ogrlica Ondina"' in s:
    print('Ondina already present')
    raise SystemExit(0)

needle='  const products = [\n'
if needle not in s:
    raise SystemExit('Products array not found')

ondina='    {id:9,name:"Ogrlica Ondina",cat:"Ogrlice",price:null,available:false,badge:"Novo",material:"Zlato",fine:"Podaci uskoro",weight:"Podaci uskoro",size:"Podaci uskoro",desc:"Elegantna ogrlica talasaste linije sa dvobojnim detaljima. Fotografija prikazuje stvarni model; tehnički podaci i cena biće uneti pre aktivacije online kupovine.",image:"ondina.jpg",hover:""},\n'
s=s.replace(needle,needle+ondina,1)

# Make money() safe for products whose verified price is not entered yet.
old='''  function money(v){\n    return new Intl.NumberFormat("sr-RS",{\n      style:"currency",\n      currency:"RSD",\n      maximumFractionDigits:0\n    }).format(v);\n  }'''
new='''  function money(v){\n    if(!Number.isFinite(v)) return "Cena uskoro";\n    return new Intl.NumberFormat("sr-RS",{\n      style:"currency",\n      currency:"RSD",\n      maximumFractionDigits:0\n    }).format(v);\n  }'''
if old not in s:
    raise SystemExit('money function not found')
s=s.replace(old,new,1)

# Quick-add button becomes a detail button until verified selling data is entered.
old='''        <button class="quick" onclick="event.stopPropagation();addToCart(${p.id})">＋ DODAJ U KORPU</button>'''
new='''        ${p.available===false\n          ? `<button class="quick" onclick="event.stopPropagation();openProduct(${p.id})">POGLEDAJ DETALJE</button>`\n          : `<button class="quick" onclick="event.stopPropagation();addToCart(${p.id})">＋ DODAJ U KORPU</button>`}'''
if old not in s:
    raise SystemExit('quick button not found')
s=s.replace(old,new,1)

# Keep unpriced product at the end for price sorting.
s=s.replace('if(sort==="low") list.sort((a,b)=>a.price-b.price);','if(sort==="low") list.sort((a,b)=>(a.price??Infinity)-(b.price??Infinity));',1)
s=s.replace('if(sort==="high") list.sort((a,b)=>b.price-a.price);','if(sort==="high") list.sort((a,b)=>(b.price??-Infinity)-(a.price??-Infinity));',1)

# Prevent unavailable products from ever reaching cart.
old='''  function addToCart(id){\n    const found=cart.find(x=>x.id===id);\n    found ? found.qty++ : cart.push({id,qty:1});\n    saveCart();\n    openCart();\n  }'''
new='''  function addToCart(id){\n    const product=products.find(p=>p.id===id);\n    if(!product || product.available===false || !Number.isFinite(product.price)) return;\n    const found=cart.find(x=>x.id===id);\n    found ? found.qty++ : cart.push({id,qty:1});\n    saveCart();\n    openCart();\n  }'''
if old not in s:
    raise SystemExit('addToCart function not found')
s=s.replace(old,new,1)

# Product modal buttons clearly show that selling data is not yet verified.
old='''    document.getElementById("mAdd").onclick=()=>{\n      addToCart(p.id);\n      closeProduct();\n    };\n\n    document.getElementById("mBuy").onclick=()=>{\n      addToCart(p.id);\n      closeProduct();\n      openCheckout();\n    };\n\n    document.getElementById("mobileBuyPrice").textContent=money(p.price);\n    document.getElementById("mobileBuyButton").onclick=()=>addToCart(p.id);'''
new='''    const addBtn=document.getElementById("mAdd");\n    const buyBtn=document.getElementById("mBuy");\n    const mobileBtn=document.getElementById("mobileBuyButton");\n\n    if(p.available===false || !Number.isFinite(p.price)){\n      addBtn.textContent="USKORO U ONLINE PONUDI";\n      buyBtn.textContent="POZOVITE ZA INFORMACIJE";\n      addBtn.disabled=true;\n      buyBtn.disabled=false;\n      buyBtn.onclick=()=>window.location.href="tel:+381692131555";\n      mobileBtn.textContent="USKORO";\n      mobileBtn.disabled=true;\n    }else{\n      addBtn.textContent="DODAJ U KORPU";\n      buyBtn.textContent="KUPI ODMAH";\n      addBtn.disabled=false;\n      buyBtn.disabled=false;\n      mobileBtn.textContent="DODAJ U KORPU";\n      mobileBtn.disabled=false;\n      addBtn.onclick=()=>{addToCart(p.id);closeProduct();};\n      buyBtn.onclick=()=>{addToCart(p.id);closeProduct();openCheckout();};\n      mobileBtn.onclick=()=>addToCart(p.id);\n    }\n\n    document.getElementById("mobileBuyPrice").textContent=money(p.price);'''
if old not in s:
    raise SystemExit('modal button block not found')
s=s.replace(old,new,1)

# Small style improvement for disabled buttons.
css='''\n    .btn:disabled{opacity:.55;cursor:not-allowed;transform:none!important}\n'''
s=s.replace('</style>',css+'  </style>',1)

p.write_text(s,encoding='utf-8')
print('Ondina prepared')
