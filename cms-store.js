(() => {
  const KEY = 'stevanovic-cms-v1';
  const SESSION_KEY = 'stevanovic-session-v1';
  const CART_KEY = 'stevanovic-cart-v2';
  const ACTIVE_BUNDLE_KEY = 'stevanovic-active-bundle-v1';

  const DEFAULT_PRODUCTS = [
    {id:14,name:'Narukvica Balustrade',cat:'Narukvice',price:null,available:false,badge:'Novo',material:'Podaci uskoro',fine:'Podaci uskoro',weight:'Podaci uskoro',size:'Podaci uskoro',desc:'Narukvica prepoznatljivog geometrijskog ritma sa ponavljajućim lučnim segmentima i dvobojnim izgledom. Fotografija prikazuje stvarni model; tehnički podaci i cena biće uneti pre aktivacije online kupovine.',image:'Balustrade.jpg',hover:'',orientation:'horizontal',recommendations:[13,12]},
    {id:13,name:'Prsten Cruor',cat:'Prstenje',price:null,available:false,badge:'Novo',material:'Zlato',fine:'Podaci uskoro',weight:'Podaci uskoro',size:'Podaci uskoro',desc:'Prsten izražajnog karaktera sa duboko crvenim centralnim kamenom i toplinom žutog zlata. Fotografija prikazuje stvarni model; tehnički podaci i cena biće uneti pre aktivacije online kupovine.',image:'Cruor.jpg',hover:'',orientation:'vertical',recommendations:[14,12]},
    {id:12,name:'Prsten Éclipse',cat:'Prstenje',price:null,available:false,badge:'Novo',material:'Podaci uskoro',fine:'Podaci uskoro',weight:'Podaci uskoro',size:'Podaci uskoro',desc:'Prsten sa dominantnim okruglim centralnim kamenom i elegantnim zakrivljenim detaljem koji ga uokviruje. Fotografija prikazuje stvarni model; tehnički podaci i cena biće uneti pre aktivacije online kupovine.',image:'E%CC%81clipse.jpg',hover:'',orientation:'vertical',recommendations:[13,10]},
    {id:11,name:'Ogrlica Triade',cat:'Ogrlice',price:null,available:false,badge:'Novo',material:'Zlato u tri tona',fine:'Podaci uskoro',weight:'Podaci uskoro',size:'Podaci uskoro',desc:'Prefinjena trostruka ogrlica u tri tona zlata — žutom, roze i belom. Fotografija prikazuje stvarni model; tehnički podaci i cena biće uneti pre aktivacije online kupovine.',image:'Triade.jpg',hover:'',orientation:'vertical',recommendations:[14,10]},
    {id:10,name:'Ogrlica Amélie',cat:'Ogrlice',price:null,available:false,badge:'Novo',material:'Zlato',fine:'Podaci uskoro',weight:'Podaci uskoro',size:'Podaci uskoro',desc:'Nežna ogrlica sa srcolikim priveskom i svedenom, elegantnom linijom. Fotografija prikazuje stvarni model; tehnički podaci i cena biće uneti pre aktivacije online kupovine.',image:'Ame%CC%81lie.jpg',hover:'',orientation:'vertical',recommendations:[12,14]},
    {id:9,name:'Ogrlica Ondina',cat:'Ogrlice',price:null,available:false,badge:'Novo',material:'Zlato',fine:'Podaci uskoro',weight:'Podaci uskoro',size:'Podaci uskoro',desc:'Elegantna ogrlica talasaste linije sa dvobojnim detaljima. Fotografija prikazuje stvarni model; tehnički podaci i cena biće uneti pre aktivacije online kupovine.',image:'ondina.jpg',hover:'',orientation:'vertical',recommendations:[14,10]},
    {id:1,name:'Ogrlica Aurelia',cat:'Ogrlice',price:32900,available:true,badge:'Najtraženije',material:'Žuto zlato',fine:'585 / 14K',weight:'3.8 g',size:'42–45 cm',desc:'Elegantna ogrlica čistih linija, zamišljena kao svakodnevni potpis.',image:'',hover:'',orientation:'vertical',recommendations:[2,4]},
    {id:2,name:'Prsten Siena',cat:'Prstenje',price:28900,available:true,badge:'Novo',material:'Žuto zlato',fine:'585 / 14K',weight:'3.2 g',size:'Veličina po izboru',desc:'Sveden prsten sa svetlucavim detaljem za diskretnu luksuznu završnicu.',image:'',hover:'',orientation:'vertical',recommendations:[1,4]},
    {id:3,name:'Minđuše Luna',cat:'Minđuše',price:24900,available:true,badge:'',material:'Žuto zlato',fine:'585 / 14K',weight:'2.9 g',size:'18 mm',desc:'Lagane minđuše koje se lako kombinuju od dnevnog do večernjeg izgleda.',image:'',hover:'',orientation:'vertical',recommendations:[1,4]},
    {id:4,name:'Narukvica Venezia',cat:'Narukvice',price:36900,available:true,badge:'Najtraženije',material:'Žuto zlato',fine:'585 / 14K',weight:'4.4 g',size:'17–19 cm',desc:'Klasična zlatna narukvica sa modernim proporcijama i finim sjajem.',image:'',hover:'',orientation:'horizontal',recommendations:[1,2]},
    {id:5,name:'Set Celeste',cat:'Setovi',price:64900,available:true,badge:'Poklon izbor',material:'Belo zlato',fine:'585 / 14K',weight:'7.3 g',size:'Ogrlica + minđuše',desc:'Usklađen set ogrlice i minđuša za poklon koji ostavlja utisak.',image:'',hover:'',orientation:'vertical',recommendations:[3,2]},
    {id:6,name:'Ogrlica Noir',cat:'Ogrlice',price:41900,available:true,badge:'',material:'Žuto zlato',fine:'585 / 14K',weight:'4.9 g',size:'45 cm',desc:'Statement ogrlica sa elegantnim volumenom i večernjim karakterom.',image:'',hover:'',orientation:'vertical',recommendations:[4,8]},
    {id:7,name:'Prsten Heritage',cat:'Prstenje',price:38900,available:true,badge:'Od 1994.',material:'Žuto zlato',fine:'585 / 14K',weight:'4.1 g',size:'Veličina po izboru',desc:'Klasičan komad inspirisan porodičnom tradicijom kuće Stevanović.',image:'',hover:'',orientation:'vertical',recommendations:[1,4]},
    {id:8,name:'Minđuše Riviera',cat:'Minđuše',price:31900,available:true,badge:'',material:'Žuto zlato',fine:'585 / 14K',weight:'3.7 g',size:'24 mm',desc:'Izdužena silueta i suptilno kretanje za sofisticiran večernji izgled.',image:'',hover:'',orientation:'vertical',recommendations:[6,4]}
  ];

  const DEFAULT_STATE = {
    version: 2,
    products: DEFAULT_PRODUCTS,
    reviews: [],
    blogs: [
      {id:'b1',title:'Kako odabrati nakit koji ostaje',slug:'kako-odabrati-nakit',excerpt:'Vodič kroz izbor komada koji odgovara stilu, prilici i načinu na koji želite da ga nosite.',body:'Dobar komad nakita nije prolazna odluka. Obratite pažnju na proporcije, boju zlata, način nošenja i priliku kojoj je namenjen. U Zlataru Stevanović možete doći i po savet pri izboru.',image:'',published:true,createdAt:new Date().toISOString()}
    ],
    users: [],
    bundles: [],
    orders: [],
    settings: {
      editorialBracelets:[14,4],
      editorialVertical:[13,12,11],
      catalogOrder: DEFAULT_PRODUCTS.map(x=>x.id),
      reviewModeration:true,
      storeName:'Zlatara Stevanović',
      onlinePhone:'069 213 1555',
      storePhone:'018 522 641'
    }
  };

  const clone = v => JSON.parse(JSON.stringify(v));

  function load(){
    try{
      const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
      if(!saved) return clone(DEFAULT_STATE);
      const merged = {...clone(DEFAULT_STATE), ...saved};
      merged.settings = {...DEFAULT_STATE.settings, ...(saved.settings||{})};
      merged.products = Array.isArray(saved.products) && saved.products.length ? saved.products : clone(DEFAULT_PRODUCTS);
      merged.reviews = Array.isArray(saved.reviews) ? saved.reviews : [];
      merged.blogs = Array.isArray(saved.blogs) ? saved.blogs : clone(DEFAULT_STATE.blogs);
      merged.users = Array.isArray(saved.users) ? saved.users : [];
      merged.bundles = Array.isArray(saved.bundles) ? saved.bundles : [];
      merged.orders = Array.isArray(saved.orders) ? saved.orders : [];
      if(!Array.isArray(merged.settings.catalogOrder) || !merged.settings.catalogOrder.length){
        merged.settings.catalogOrder = merged.products.filter(p=>!p.deleted).map(p=>p.id);
      }
      merged.version = 2;
      return merged;
    }catch(e){ return clone(DEFAULT_STATE); }
  }

  function save(state){
    localStorage.setItem(KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent('zs:cms-updated'));
    return state;
  }
  function state(){ return load(); }

  async function hash(text){
    const data = new TextEncoder().encode(String(text));
    const digest = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,'0')).join('');
  }

  function currentUser(){
    try{
      const session = JSON.parse(localStorage.getItem(SESSION_KEY)||'null');
      if(!session) return null;
      return load().users.find(u=>u.id===session.userId) || null;
    }catch(e){ return null; }
  }

  async function register({name,email,password,role='customer'}){
    name=String(name||'').trim(); email=String(email||'').trim().toLowerCase();
    if(name.length<2) throw new Error('Unesite ime i prezime.');
    if(!/^\S+@\S+\.\S+$/.test(email)) throw new Error('Unesite ispravnu email adresu.');
    if(String(password||'').length<8) throw new Error('Lozinka mora imati najmanje 8 karaktera.');
    const s=load();
    if(s.users.some(u=>u.email===email)) throw new Error('Nalog sa ovom email adresom već postoji.');
    const user={id:'u_'+Date.now().toString(36)+Math.random().toString(36).slice(2,7),name,email,passwordHash:await hash(password),role,createdAt:new Date().toISOString()};
    s.users.push(user); save(s); localStorage.setItem(SESSION_KEY,JSON.stringify({userId:user.id}));
    return {...user,passwordHash:undefined};
  }

  async function login(email,password){
    email=String(email||'').trim().toLowerCase();
    const s=load(); const u=s.users.find(x=>x.email===email);
    if(!u || u.passwordHash!==await hash(password)) throw new Error('Pogrešan email ili lozinka.');
    localStorage.setItem(SESSION_KEY,JSON.stringify({userId:u.id}));
    return {...u,passwordHash:undefined};
  }
  function logout(){ localStorage.removeItem(SESSION_KEY); }
  function hasAdmin(){ return load().users.some(u=>u.role==='admin'); }
  async function createFirstAdmin(data){ if(hasAdmin()) throw new Error('Admin nalog već postoji.'); return register({...data,role:'admin'}); }

  function products(){
    const s=load();
    const live=s.products.filter(p=>p.deleted!==true);
    const order=s.settings.catalogOrder||[];
    const rank=new Map(order.map((id,i)=>[String(id),i]));
    return live.sort((a,b)=>(rank.get(String(a.id))??9999)-(rank.get(String(b.id))??9999));
  }
  function getProduct(id){ return products().find(p=>String(p.id)===String(id)) || null; }
  function upsertProduct(product){
    const s=load(); const i=s.products.findIndex(p=>String(p.id)===String(product.id));
    if(i>=0) s.products[i]={...s.products[i],...product}; else s.products.unshift(product);
    const order=s.settings.catalogOrder||[];
    if(!order.some(x=>String(x)===String(product.id))) s.settings.catalogOrder=[product.id,...order];
    save(s); return product;
  }
  function deleteProduct(id){ const s=load(); const p=s.products.find(x=>String(x.id)===String(id)); if(p){p.deleted=true;save(s);} }

  function setCatalogOrder(ids){
    const s=load();
    const valid=new Set(s.products.filter(p=>!p.deleted).map(p=>String(p.id)));
    const clean=[...new Set((ids||[]).map(Number).filter(id=>valid.has(String(id))))];
    s.products.filter(p=>!p.deleted).forEach(p=>{if(!clean.includes(Number(p.id)))clean.push(Number(p.id))});
    s.settings.catalogOrder=clean; save(s); return clean;
  }

  function blogs(){ return load().blogs.filter(b=>b.deleted!==true); }
  function upsertBlog(blog){ const s=load(); const i=s.blogs.findIndex(b=>String(b.id)===String(blog.id)); if(i>=0)s.blogs[i]={...s.blogs[i],...blog}; else s.blogs.unshift(blog); save(s); }
  function deleteBlog(id){ const s=load(); const b=s.blogs.find(x=>String(x.id)===String(id)); if(b){b.deleted=true;save(s);} }

  function reviews(productId,{includeHidden=false}={}){
    return load().reviews.filter(r=>String(r.productId)===String(productId) && (includeHidden || !r.hidden));
  }
  function allReviews(){ return load().reviews; }
  function addReview({productId,rating,text,images=[],source='online',customerName=null,verified=false}){
    const u=currentUser();
    if(source==='online' && !u) throw new Error('Morate biti prijavljeni da biste ostavili recenziju.');
    const s=load();
    const review={id:'r_'+Date.now().toString(36)+Math.random().toString(36).slice(2,6),productId:Number(productId),userId:u?.id||null,userName:customerName||u?.name||'Kupac',rating:Math.max(1,Math.min(5,Number(rating)||5)),text:String(text||'').trim().slice(0,1500),images:Array.isArray(images)?images.slice(0,3):[],source,verified:!!verified,hidden:false,createdAt:new Date().toISOString()};
    if(review.text.length<3) throw new Error('Napišite nekoliko reči o proizvodu.');
    s.reviews.unshift(review); save(s); return review;
  }
  function setReviewHidden(id,hidden){ const s=load(); const r=s.reviews.find(x=>x.id===id); if(r){r.hidden=!!hidden;save(s);} }
  function deleteReview(id){ const s=load(); s.reviews=s.reviews.filter(r=>r.id!==id); save(s); }

  function bundles(){ return load().bundles.filter(b=>b.deleted!==true); }
  function getBundle(id){ return bundles().find(b=>String(b.id)===String(id))||null; }
  function upsertBundle(bundle){
    const s=load(); const i=s.bundles.findIndex(b=>String(b.id)===String(bundle.id));
    if(i>=0)s.bundles[i]={...s.bundles[i],...bundle}; else s.bundles.unshift(bundle);
    save(s); return bundle;
  }
  function deleteBundle(id){ const s=load(); const b=s.bundles.find(x=>String(x.id)===String(id)); if(b){b.deleted=true;save(s);} }
  function bundlesForProduct(productId){
    return bundles().filter(b=>b.active!==false && Array.isArray(b.productIds) && b.productIds.some(id=>String(id)===String(productId)));
  }
  function bundleTotals(bundle){
    const items=(bundle.productIds||[]).map(getProduct).filter(Boolean);
    const regular=items.reduce((sum,p)=>sum+(Number.isFinite(Number(p.price))?Number(p.price):0),0);
    let final=regular;
    if(bundle.discountType==='percent') final=Math.max(0,regular*(1-(Number(bundle.discountValue)||0)/100));
    if(bundle.discountType==='fixed') final=Math.max(0,regular-(Number(bundle.discountValue)||0));
    return {regular,final:Math.round(final),saving:Math.max(0,Math.round(regular-final)),complete:items.length===(bundle.productIds||[]).length && items.every(p=>Number.isFinite(Number(p.price)))};
  }

  function orders(){ return load().orders.slice().sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)); }
  function createOrder(order){
    const s=load();
    const o={id:order.id||('ZS-'+Date.now().toString(36).toUpperCase()),status:order.status||'Pokrenuta',items:Array.isArray(order.items)?order.items:[],customer:order.customer||{},total:Number(order.total)||0,bundleId:order.bundleId||null,note:order.note||'',createdAt:order.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()};
    const i=s.orders.findIndex(x=>x.id===o.id);
    if(i>=0)s.orders[i]={...s.orders[i],...o}; else s.orders.unshift(o);
    save(s); return o;
  }
  function updateOrder(id,patch){ const s=load(); const o=s.orders.find(x=>x.id===id); if(o){Object.assign(o,patch,{updatedAt:new Date().toISOString()});save(s);} return o; }
  function deleteOrder(id){ const s=load(); s.orders=s.orders.filter(o=>o.id!==id); save(s); }

  function updateSettings(patch){ const s=load(); s.settings={...s.settings,...patch}; save(s); return s.settings; }
  function settings(){ return load().settings; }

  function recommendationsFor(productId,limit=4){
    const p=getProduct(productId); if(!p) return [];
    const all=products().filter(x=>x.id!==p.id);
    const manual=(p.recommendations||[]).map(id=>all.find(x=>x.id===id)).filter(Boolean);
    const used=new Set(manual.map(x=>x.id));
    const fallback=all.filter(x=>!used.has(x.id)).sort((a,b)=>{
      let sa=0,sb=0;
      if(a.material===p.material)sa+=4;if(b.material===p.material)sb+=4;
      if(a.cat!==p.cat)sa+=2;if(b.cat!==p.cat)sb+=2;
      if(Number.isFinite(a.price)&&Number.isFinite(p.price))sa+=Math.max(0,3-Math.abs(a.price-p.price)/20000);
      if(Number.isFinite(b.price)&&Number.isFinite(p.price))sb+=Math.max(0,3-Math.abs(b.price-p.price)/20000);
      return sb-sa;
    });
    return [...manual,...fallback].slice(0,limit);
  }

  function exportState(){ return JSON.stringify(load(),null,2); }
  function importState(text){ const parsed=JSON.parse(text); if(!parsed||!Array.isArray(parsed.products)) throw new Error('Fajl nije validan CMS export.'); save({...clone(DEFAULT_STATE),...parsed,settings:{...DEFAULT_STATE.settings,...(parsed.settings||{})},bundles:Array.isArray(parsed.bundles)?parsed.bundles:[],orders:Array.isArray(parsed.orders)?parsed.orders:[]}); }
  function reset(){ localStorage.removeItem(KEY); localStorage.removeItem(SESSION_KEY); localStorage.removeItem(ACTIVE_BUNDLE_KEY); }

  function formatMoney(v){
    return Number.isFinite(Number(v)) ? new Intl.NumberFormat('sr-RS').format(Math.round(Number(v)))+' RSD' : 'Cena uskoro';
  }

  function addBundleToCart(bundleId){
    const b=getBundle(bundleId); if(!b)return;
    const cart=JSON.parse(localStorage.getItem(CART_KEY)||'[]');
    (b.productIds||[]).forEach(id=>{
      const p=getProduct(id);
      if(!p?.available || !Number.isFinite(Number(p.price))) return;
      const found=cart.find(x=>String(x.id)===String(id));
      if(found) found.qty+=1; else cart.push({id:Number(id),qty:1});
    });
    localStorage.setItem(CART_KEY,JSON.stringify(cart));
    localStorage.setItem(ACTIVE_BUNDLE_KEY,String(bundleId));
    if(typeof window.updateCartCount==='function')window.updateCartCount();
    if(typeof window.closeOverlay==='function')window.closeOverlay();
    if(typeof window.openCart==='function')window.openCart();
    setTimeout(applyBundleCartVisual,30);
  }

  function applyBundleCartVisual(){
    const bundleId=localStorage.getItem(ACTIVE_BUNDLE_KEY);
    if(!bundleId)return;
    const b=getBundle(bundleId); if(!b)return;
    const totals=bundleTotals(b);
    const cart=JSON.parse(localStorage.getItem(CART_KEY)||'[]');
    const hasAll=(b.productIds||[]).every(id=>cart.some(x=>String(x.id)===String(id)&&Number(x.qty)>0));
    if(!hasAll){localStorage.removeItem(ACTIVE_BUNDLE_KEY);return}
    const box=document.querySelector('.cart-total');
    if(!box || box.dataset.bundleApplied==='1')return;
    box.dataset.bundleApplied='1';
    const note=document.createElement('div');
    note.style.cssText='grid-column:1/-1;margin-top:8px;padding:10px;background:#f4ede2;font-size:11px;line-height:1.5';
    note.innerHTML=`<strong>${b.name}</strong><br>Bundle popust: ${b.discountType==='percent'?Number(b.discountValue)+'%':formatMoney(b.discountValue)}${totals.complete?` · Ušteda ${formatMoney(totals.saving)}`:''}<br><span style="color:#746b62">Popust je trenutno prikaz u CMS prototipu; konačan iznos mora biti potvrđen server-side pre aktivacije kartičnog plaćanja.</span>`;
    box.appendChild(note);
  }

  function injectBundleOffers(){
    const modal=document.querySelector('.product-modal .modal-body');
    if(!modal || modal.querySelector('[data-zs-bundles]'))return;
    const title=modal.querySelector('h2')?.textContent?.trim();
    const p=products().find(x=>x.name===title);
    if(!p)return;
    const bs=bundlesForProduct(p.id);
    if(!bs.length)return;
    const section=document.createElement('div');
    section.dataset.zsBundles='1';
    section.style.cssText='margin-top:28px;border-top:1px solid rgba(24,15,12,.14);padding-top:24px';
    section.innerHTML=`<h3 style="font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:27px;margin:0 0 16px">Paket ponude</h3>`+
      bs.map(b=>{
        const t=bundleTotals(b);
        return `<div style="border:1px solid rgba(24,15,12,.14);padding:14px;margin:10px 0;background:#fbf8f2">
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:19px;margin-bottom:5px">${b.name}</div>
          <div style="font-size:11px;color:#766f68;line-height:1.5">${b.headline||'Odabrani komadi koji se prirodno dopunjuju.'}</div>
          <div style="display:flex;gap:10px;align-items:center;justify-content:space-between;margin-top:10px">
            <div style="font-size:11px">${t.complete?`<s>${formatMoney(t.regular)}</s> &nbsp; <strong>${formatMoney(t.final)}</strong>`:'Cena paketa nakon unosa svih cena'}</div>
            <button type="button" onclick="ZSCMS.addBundleToCart('${b.id}')" style="border:0;background:#180609;color:white;padding:10px 13px;font-size:9px;letter-spacing:.1em;font-weight:700">DODAJ PAKET</button>
          </div>
        </div>`;
      }).join('');
    const recommend=modal.querySelector('.recommend');
    if(recommend) recommend.insertAdjacentElement('afterend',section); else modal.appendChild(section);
  }

  function injectStorefrontVisualFixes(){
    if(document.getElementById('zs-storefront-fixes'))return;
    const style=document.createElement('style');
    style.id='zs-storefront-fixes';
    style.textContent=`
      .product-modal{height:min(780px,88vh)!important;max-height:88vh!important;align-items:stretch!important}
      .modal-photo{position:relative!important;min-height:0!important;height:100%!important;display:block!important;overflow:hidden!important;background:#efe6d9!important}
      .modal-photo img{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;object-fit:contain!important;object-position:center center!important;padding:26px!important}
      .modal-photo.horizontal img{padding:32px!important;object-fit:contain!important;object-position:center center!important}
      .modal-body{height:100%!important;overflow-y:auto!important;overscroll-behavior:contain}
      @media(max-width:720px){
        .product-modal{height:auto!important;max-height:94vh!important}
        .modal-photo{height:42vh!important;min-height:320px!important}
        .modal-photo img,.modal-photo.horizontal img{padding:16px!important;object-fit:contain!important;object-position:center center!important}
        .modal-body{height:auto!important;overflow:visible!important}
      }
    `;
    document.head.appendChild(style);
  }

  function observeStorefront(){
    if(!document.body)return;
    injectStorefrontVisualFixes();
    const mo=new MutationObserver(()=>{ injectBundleOffers(); applyBundleCartVisual(); });
    mo.observe(document.body,{subtree:true,childList:true});
    document.addEventListener('submit',e=>{
      if(e.target?.id!=='checkoutForm')return;
      try{
        const f=new FormData(e.target);
        const items=JSON.parse(localStorage.getItem(CART_KEY)||'[]');
        const ps=items.map(x=>({id:Number(x.id),qty:Number(x.qty)||1,p:getProduct(x.id)})).filter(x=>x.p);
        const total=ps.reduce((s,x)=>s+(Number(x.p.price)||0)*x.qty,0);
        createOrder({
          id:'ZS-'+Date.now().toString(36).toUpperCase(),
          status:'Čeka plaćanje',
          items:ps.map(x=>({id:x.id,name:x.p.name,qty:x.qty,unitPrice:Number(x.p.price)||0})),
          customer:{name:f.get('name'),phone:f.get('phone'),email:f.get('email'),address:f.get('address'),city:f.get('city')},
          total,
          bundleId:localStorage.getItem(ACTIVE_BUNDLE_KEY)||null
        });
      }catch(_){}
    },true);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',observeStorefront); else observeStorefront();

  window.ZSCMS={
    KEY,DEFAULT_STATE,state,save,products,getProduct,upsertProduct,deleteProduct,setCatalogOrder,
    blogs,upsertBlog,deleteBlog,reviews,allReviews,addReview,setReviewHidden,deleteReview,
    bundles,getBundle,upsertBundle,deleteBundle,bundlesForProduct,bundleTotals,addBundleToCart,
    orders,createOrder,updateOrder,deleteOrder,
    settings,updateSettings,recommendationsFor,currentUser,register,login,logout,hasAdmin,createFirstAdmin,
    exportState,importState,reset
  };
})();
