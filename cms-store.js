(() => {
  const KEY = 'stevanovic-cms-v1';
  const SESSION_KEY = 'stevanovic-session-v1';

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
    version: 1,
    products: DEFAULT_PRODUCTS,
    reviews: [],
    blogs: [
      {id:'b1',title:'Kako odabrati nakit koji ostaje',slug:'kako-odabrati-nakit',excerpt:'Vodič kroz izbor komada koji odgovara stilu, prilici i načinu na koji želite da ga nosite.',body:'Dobar komad nakita nije prolazna odluka. Obratite pažnju na proporcije, boju zlata, način nošenja i priliku kojoj je namenjen. U Zlataru Stevanović možete doći i po savet pri izboru.',image:'',published:true,createdAt:new Date().toISOString()}
    ],
    users: [],
    settings: {
      editorialBracelets:[14,4],
      editorialVertical:[13,12,11],
      reviewModeration:true,
      storeName:'Zlatara Stevanović',
      onlinePhone:'069 213 1555',
      storePhone:'018 522 641'
    }
  };

  function clone(v){ return JSON.parse(JSON.stringify(v)); }
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
      return merged;
    }catch(e){ return clone(DEFAULT_STATE); }
  }
  function save(state){ localStorage.setItem(KEY, JSON.stringify(state)); window.dispatchEvent(new CustomEvent('zs:cms-updated')); return state; }
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

  function products(){ return load().products.filter(p=>p.deleted!==true); }
  function getProduct(id){ return products().find(p=>String(p.id)===String(id)) || null; }
  function upsertProduct(product){
    const s=load(); const i=s.products.findIndex(p=>String(p.id)===String(product.id));
    if(i>=0) s.products[i]={...s.products[i],...product}; else s.products.unshift(product);
    save(s); return product;
  }
  function deleteProduct(id){ const s=load(); const p=s.products.find(x=>String(x.id)===String(id)); if(p){p.deleted=true;save(s);} }

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
  function importState(text){ const parsed=JSON.parse(text); if(!parsed||!Array.isArray(parsed.products)) throw new Error('Fajl nije validan CMS export.'); save(parsed); }
  function reset(){ localStorage.removeItem(KEY); localStorage.removeItem(SESSION_KEY); }

  window.ZSCMS={
    KEY,DEFAULT_STATE,state,save,products,getProduct,upsertProduct,deleteProduct,
    blogs,upsertBlog,deleteBlog,reviews,allReviews,addReview,setReviewHidden,deleteReview,
    settings,updateSettings,recommendationsFor,currentUser,register,login,logout,hasAdmin,createFirstAdmin,
    exportState,importState,reset
  };
})();