let role = null;
let currentUser = null;  // the logged-in account object
let currentTab = null;
let cart = [];
let loginTab = 'admin'; // currently selected login tab


let accounts = [
  // Admin
  {id:'a1', name:'Amina Odhiambo', email:'amina@fundilink.co.ke', password:'admin123', role:'admin',
   av:'AO', color:'#f59e0b', jobTitle:'Platform Administrator', phone:'+254 700 111 000',
   status:'active', joined:'Jan 2023', loggedIn:false},
  // Fundis
  {id:'f1', name:'Ibrahim Abdi',   email:'ibrahim@fundilink.co.ke',   password:'fundi123', role:'fundi',
   av:'IA', color:'#10b981', jobTitle:'Certified Electrician', phone:'+254 712 345 678',
   status:'active', joined:'Jan 2024', loggedIn:false},
  {id:'f2', name:'Leeroy Kariuki', email:'leeroy@fundilink.co.ke',  password:'fundi456', role:'fundi',
   av:'LK', color:'#06d6a0', jobTitle:'Plumber', phone:'+254 723 456 789',
   status:'active', joined:'Feb 2024', loggedIn:false},
  {id:'f3', name:'Grace Njeri',    email:'grace@fundilink.co.ke',   password:'fundi789', role:'fundi',
   av:'GN', color:'#34d399', jobTitle:'Painter', phone:'+254 734 567 890',
   status:'inactive', joined:'Mar 2024', loggedIn:false},
  // Merchants
  {id:'m1', name:'Lena Waweru',    email:'lena@fundilink.co.ke',    password:'merch123', role:'merchant',
   av:'LW', color:'#8b5cf6', jobTitle:'Hardware Merchant', phone:'+254 745 678 901',
   status:'active', joined:'Dec 2023', loggedIn:false},
  {id:'m2', name:'Hassan Omar',    email:'hassan@fundilink.co.ke',  password:'merch456', role:'merchant',
   av:'HO', color:'#a78bfa', jobTitle:'Electrical Supplier', phone:'+254 756 789 012',
   status:'active', joined:'Nov 2023', loggedIn:false},
  {id:'m3', name:'Wanjiku Mugo',   email:'wanjiku@fundilink.co.ke', password:'merch789', role:'merchant',
   av:'WM', color:'#7c3aed', jobTitle:'Plumbing Merchant', phone:'+254 767 890 123',
   status:'pending', joined:'Feb 2024', loggedIn:false},
];

const ACCENT = {admin:'var(--admin)', fundi:'var(--fundi)', merchant:'var(--merchant)'};

// mutable data
let tasks = [
  {id:1,title:'Install Solar Panels',client:'Kibera Estate',location:'Nairobi',pay:4500,status:'open',icon:'⚡',urgency:'high',date:'Today',assignedTo:null},
  {id:2,title:'Plumbing Repair – Kitchen',client:'Westlands Mall',location:'Westlands',pay:2200,status:'open',icon:'🔧',urgency:'medium',date:'Today',assignedTo:null},
  {id:3,title:'Ceiling Fan Installation',client:'Runda Apartments',location:'Runda',pay:1800,status:'open',icon:'⚡',urgency:'low',date:'Tomorrow',assignedTo:null},
  {id:4,title:'Water Pump Maintenance',client:'Lavington House',location:'Lavington',pay:3500,status:'open',icon:'💧',urgency:'high',date:'Today',assignedTo:null},
  {id:5,title:'Electrical Wiring – Office',client:'CBD Tower',location:'CBD',pay:6000,status:'in-progress',icon:'⚡',urgency:'medium',date:'03 Mar',assignedTo:'James Mwangi'},
  {id:6,title:'Geyser Replacement',client:'Karen Estate',location:'Karen',pay:5200,status:'open',icon:'🔥',urgency:'low',date:'04 Mar',assignedTo:null},
  {id:7,title:'Gate Motor Installation',client:'Muthaiga Home',location:'Muthaiga',pay:7500,status:'completed',icon:'⚙️',urgency:'medium',date:'01 Mar',assignedTo:'Otieno Kariuki'},
];

let inventory = [
  {id:1,name:'MCB Circuit Breaker',category:'Electrical',price:380,stock:142,icon:'⚡',unit:'piece'},
  {id:2,name:'PVC Conduit Pipe 20mm',category:'Electrical',price:90,stock:380,icon:'📦',unit:'metre'},
  {id:3,name:'Copper Cable 2.5mm²',category:'Wiring',price:720,stock:95,icon:'🔌',unit:'roll'},
  {id:4,name:'Teflon Tape',category:'Plumbing',price:45,stock:620,icon:'🔧',unit:'roll'},
  {id:5,name:'CPVC Ball Valve ½"',category:'Plumbing',price:280,stock:76,icon:'💧',unit:'piece'},
  {id:6,name:'JB Weld Epoxy',category:'Adhesives',price:550,stock:44,icon:'🧪',unit:'pack'},
  {id:7,name:'LED Downlight 9W',category:'Lighting',price:420,stock:200,icon:'💡',unit:'piece'},
  {id:8,name:'Steel Drill Bit Set',category:'Tools',price:1200,stock:30,icon:'🛠️',unit:'set'},
  {id:9,name:'PVC Junction Box',category:'Electrical',price:95,stock:310,icon:'📦',unit:'piece'},
  {id:10,name:'Float Valve ½"',category:'Plumbing',price:190,stock:58,icon:'💧',unit:'piece'},
  {id:11,name:'Safety Gloves (Pair)',category:'Safety',price:250,stock:150,icon:'🧤',unit:'pair'},
  {id:12,name:'Pipe Wrench 14"',category:'Tools',price:890,stock:25,icon:'🔩',unit:'piece'},
];

let users_list = [
  {id:1,name:'James Mwangi',role:'Fundi',location:'Nairobi',status:'active',joined:'Jan 2024',phone:'+254 712 345 678',speciality:'Electrical'},
  {id:2,name:'Otieno Kariuki',role:'Fundi',location:'Mombasa',status:'active',joined:'Feb 2024',phone:'+254 723 456 789',speciality:'Plumbing'},
  {id:3,name:'Grace Njeri',role:'Fundi',location:'Kisumu',status:'inactive',joined:'Mar 2024',phone:'+254 734 567 890',speciality:'Painting'},
  {id:4,name:'Lena Waweru',role:'Merchant',location:'Nairobi',status:'active',joined:'Dec 2023',phone:'+254 745 678 901',speciality:'Hardware'},
  {id:5,name:'Hassan Omar',role:'Merchant',location:'Mombasa',status:'active',joined:'Nov 2023',phone:'+254 756 789 012',speciality:'Electrical'},
  {id:6,name:'Wanjiku Mugo',role:'Merchant',location:'Nakuru',status:'pending',joined:'Feb 2024',phone:'+254 767 890 123',speciality:'Plumbing'},
];

let orders = [
  {id:'ORD-0241',fundi:'James Mwangi',items:[{name:'Copper Cable 2.5mm²',qty:2,price:720}],status:'pending',date:'Today'},
  {id:'ORD-0238',fundi:'Otieno Kariuki',items:[{name:'MCB Circuit Breaker',qty:5,price:380}],status:'processing',date:'Yesterday'},
  {id:'ORD-0234',fundi:'Grace Njeri',items:[{name:'PVC Conduit Pipe 20mm',qty:10,price:90},{name:'Teflon Tape',qty:3,price:45}],status:'delivered',date:'28 Feb'},
  {id:'ORD-0230',fundi:'James Mwangi',items:[{name:'LED Downlight 9W',qty:8,price:420}],status:'delivered',date:'26 Feb'},
];

// fundi profile (editable, keyed by account id)
let fundiProfiles = {
  'f1':{name:'James Mwangi', phone:'+254 712 345 678', email:'james@fundilink.co.ke',
    location:'Nairobi, Kenya', id_no:'29384756', joined:'January 2024',
    skills:['Electrical Wiring','Solar Installation','Circuit Boards','Safety Compliance','Generator Repair','Panel Upgrades'],
    areas:['Nairobi CBD','Westlands','Karen','Runda','Lavington'],
    bio:'Certified electrician with 6+ years of experience in residential and commercial installations.'},
  'f2':{name:'Otieno Kariuki', phone:'+254 723 456 789', email:'otieno@fundilink.co.ke',
    location:'Mombasa, Kenya', id_no:'38495867', joined:'February 2024',
    skills:['Pipe Fitting','Water Systems','Drainage','Waterproofing'],
    areas:['Mombasa CBD','Nyali','Bamburi','Kisauni'],
    bio:'Expert plumber specialising in residential and commercial water systems.'},
  'f3':{name:'Grace Njeri', phone:'+254 734 567 890', email:'grace@fundilink.co.ke',
    location:'Kisumu, Kenya', id_no:'47506978', joined:'March 2024',
    skills:['Interior Painting','Exterior Coating','Texture Finishing','Colour Consulting'],
    areas:['Kisumu CBD','Milimani','Mamboleo'],
    bio:'Professional painter with an eye for detail and colour.'},
};

// get profile for current fundi
function getFundiProfile(){
  return fundiProfiles[currentUser.id] || {name:currentUser.name,phone:currentUser.phone,email:currentUser.email,
    location:'Kenya',id_no:'—',joined:currentUser.joined,skills:[],areas:[],bio:''};
}
function setFundiProfile(p){ fundiProfiles[currentUser.id]=p; }

// ══════════════════════════════════════════
//  NAV CONFIG
// ══════════════════════════════════════════
const TABS = {
  admin:[
    {id:'overview',label:'Overview',icon:'📊'},
    {id:'users',label:'Users',icon:'👥'},
    {id:'tasks',label:'Tasks',icon:'📋'},
    {id:'inventory',label:'Inventory',icon:'📦'},
  ],
  fundi:[
    {id:'tasks',label:'Available Tasks',icon:'🔧'},
    {id:'profile',label:'My Profile',icon:'👤'},
    {id:'shop',label:'Shop',icon:'🛒'},
    {id:'my-orders',label:'My Orders',icon:'🧾'},
  ],
  merchant:[
    {id:'inventory',label:'My Inventory',icon:'📦'},
    {id:'orders',label:'Orders',icon:'🧾'},
    {id:'analytics',label:'Analytics',icon:'📈'},
  ]
};

// ══════════════════════════════════════════
//  AUTH
// ══════════════════════════════════════════
function switchLoginTab(r){
  loginTab = r;
  ['admin','fundi','merchant'].forEach(t=>{
    document.getElementById('lt-'+t).classList.toggle('active',t===r);
  });
  const btn = document.getElementById('login-btn');
  btn.className = `login-btn login-btn-${r}`;
  btn.textContent = `Sign In as ${r.charAt(0).toUpperCase()+r.slice(1)}`;
  document.getElementById('login-err').classList.remove('show');
  document.getElementById('l-email').value='';
  document.getElementById('l-pw').value='';
  // update focus colour
  document.getElementById('l-email').style.setProperty('--lc', r==='admin'?'var(--admin)':r==='fundi'?'var(--fundi)':'var(--merchant)');
  renderDemoUsers();
}

function renderDemoUsers(){
  const list = document.getElementById('demo-users-list');
  const roleAccounts = accounts.filter(a=>a.role===loginTab && a.status!=='suspended');
  list.innerHTML = roleAccounts.map(a=>`
    <div class="demo-user" onclick="fillCredentials('${a.email}','${a.password}')">
      <div class="demo-av" style="background:${a.color};color:${a.role==='merchant'?'#fff':'#0a0f1a'}">${a.av}</div>
      <div class="demo-name">${a.name}</div>
      <div style="display:flex;align-items:center;gap:.4rem">
        ${a.loggedIn?'<span style="font-size:.65rem;color:var(--fundi)">● online</span>':''}
        <div class="demo-fill">click to fill</div>
      </div>
    </div>`).join('');
}

function fillCredentials(email, pw){
  document.getElementById('l-email').value = email;
  document.getElementById('l-pw').value = pw;
  document.getElementById('login-err').classList.remove('show');
}

function togglePw(){
  const inp = document.getElementById('l-pw');
  inp.type = inp.type==='password' ? 'text' : 'password';
}

function doLogin(){
  const email = document.getElementById('l-email').value.trim().toLowerCase();
  const pw    = document.getElementById('l-pw').value;
  const err   = document.getElementById('login-err');
  err.classList.remove('show');

  const acct = accounts.find(a=>a.email.toLowerCase()===email && a.password===pw && a.role===loginTab);

  if(!acct){
    err.textContent = 'Incorrect email or password. Please try again.';
    err.classList.add('show');
    document.getElementById('l-pw').value='';
    return;
  }
  if(acct.status==='suspended'){
    err.textContent = '🚫 This account has been suspended. Contact your administrator.';
    err.classList.add('show');
    return;
  }
  if(acct.status==='inactive'){
    err.textContent = '⚠️ This account is inactive. Contact your administrator.';
    err.classList.add('show');
    return;
  }
  if(acct.status==='pending'){
    err.textContent = '⏳ Account pending approval. Please wait for admin activation.';
    err.classList.add('show');
    return;
  }

  // mark logged in
  acct.loggedIn = true;
  currentUser = acct;
  role = acct.role;
  cart = [];

  document.getElementById('login').style.display = 'none';
  const app = document.getElementById('app');
  app.classList.add('show');
  app.style.setProperty('--accent', ACCENT[role]);

  const av = document.getElementById('hdr-av');
  av.textContent = acct.av;
  av.style.background = acct.color;
  av.style.color = role==='merchant'?'#fff':'#0a0f1a';
  document.getElementById('hdr-name').textContent = acct.name;
  document.getElementById('hdr-role').textContent = acct.jobTitle;

  buildNav();
  goTo(TABS[role][0].id);
}

function logout(){
  if(currentUser) currentUser.loggedIn = false;
  role = null; currentUser = null; cart = [];
  document.getElementById('app').classList.remove('show');
  document.getElementById('login').style.display = 'flex';
  // reset login form
  document.getElementById('l-email').value='';
  document.getElementById('l-pw').value='';
  document.getElementById('login-err').classList.remove('show');
  renderDemoUsers();
}

// Admin force-logout a user
function forceLogout(accountId){
  const a = accounts.find(a=>a.id===accountId);
  a.loggedIn = false;
  closeModal();
  toast(`🔒 ${a.name} has been logged out`,'#f59e0b');
  goTo('users');
}

// Admin reset password
function openResetPasswordModal(accountId){
  const a = accounts.find(a=>a.id===accountId);
  showModal(`
    <div class="modal-title">Reset Password</div>
    <div style="font-size:.85rem;color:var(--muted);margin-bottom:1rem">Resetting password for <strong style="color:var(--text)">${a.name}</strong></div>
    <div class="form-row"><label>New Password</label><input type="text" id="rp-pw" placeholder="Enter new password" value="${a.password}"></div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-a" onclick="submitResetPassword('${accountId}')">Set Password</button>
    </div>`);
}

function submitResetPassword(accountId){
  const pw = document.getElementById('rp-pw').value.trim();
  if(pw.length<4){toast('Password too short','#ef4444');return;}
  accounts.find(a=>a.id===accountId).password = pw;
  closeModal(); toast('🔑 Password updated','#10b981');
}

// Admin suspend/activate account
function toggleAccountStatus(accountId){
  const a = accounts.find(a=>a.id===accountId);
  const isSuspended = a.status==='suspended';
  showModal(`
    <div class="modal-title">${isSuspended?'Activate':'Suspend'} Account</div>
    <div class="confirm-msg">${isSuspended?`Reactivate <strong>${a.name}</strong>? They will be able to log in again.`:`Suspend <strong>${a.name}</strong>? They will be immediately logged out and blocked.`}</div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn ${isSuspended?'btn-f':'btn-danger'}" onclick="doToggleAccountStatus('${accountId}')">${isSuspended?'Activate':'Suspend'}</button>
    </div>`);
}

function doToggleAccountStatus(accountId){
  const a = accounts.find(a=>a.id===accountId);
  if(a.status==='suspended'){
    a.status='active';
    toast(`✅ ${a.name} reactivated`,'#10b981');
  } else {
    a.status='suspended';
    a.loggedIn=false;
    toast(`🚫 ${a.name} suspended`,'#ef4444');
  }
  closeModal(); goTo('users');
}

// init login UI
window.addEventListener('DOMContentLoaded',()=>{
  switchLoginTab('admin');
});

// ══════════════════════════════════════════
//  NAV
// ══════════════════════════════════════════
function buildNav(){
  const nav = document.getElementById('app-nav');
  nav.innerHTML = TABS[role].map(t=>
    `<button class="nav-tab" id="tab-${t.id}" onclick="goTo('${t.id}')">${t.icon} ${t.label}${t.id==='shop'?`<span class="cart-badge" id="cart-count">${cart.length||''}</span>`:''}</button>`
  ).join('');
}

function goTo(id){
  currentTab = id;
  document.querySelectorAll('.nav-tab').forEach(el=>el.classList.remove('active'));
  const tab = document.getElementById('tab-'+id);
  if(tab) tab.classList.add('active');
  const main = document.getElementById('app-main');
  main.innerHTML = '';
  renderSection(id, main);
}

// ══════════════════════════════════════════
//  ROUTER
// ══════════════════════════════════════════
function renderSection(id, el){
  const html = ({
    // ADMIN
    'overview':  adminOverview,
    'users':     adminUsers,
    'tasks':     adminTasks,
    'inventory': role==='admin' ? adminInventory : (role==='merchant' ? merchantInventory : null),
    // FUNDI
    'profile':   fundiProfilePage,
    'shop':      fundiShop,
    'my-orders': fundiMyOrders,
    // MERCHANT
    'orders':    merchantOrders,
    'analytics': merchantAnalytics,
  }[id] || (()=>`<div class="empty"><div class="empty-ico">🚧</div><div class="empty-txt">Coming soon</div></div>`))();
  el.innerHTML = html;
  // handle fundi tasks specially (needs event listeners)
  if(id==='tasks' && role==='fundi') renderFundiTasks(el);
  if(id==='tasks' && role==='admin') {}
}

// helpers
const fmt = n => 'KES '+n.toLocaleString();
const urgBadge = u => u==='high'?'<span class="badge br">high</span>':u==='medium'?'<span class="badge ba">medium</span>':'<span class="badge bb">low</span>';
const statusBadge = s => ({
  'open':'<span class="badge bb">open</span>',
  'in-progress':'<span class="badge ba">in-progress</span>',
  'completed':'<span class="badge bg">completed</span>',
  'pending':'<span class="badge bp">pending</span>',
  'processing':'<span class="badge ba">processing</span>',
  'delivered':'<span class="badge bg">delivered</span>',
  'active':'<span class="badge bg">active</span>',
  'inactive':'<span class="badge br">inactive</span>',
  'suspended':'<span class="badge br">suspended</span>',
  'review':'<span class="badge bp">review</span>',
}[s]||`<span class="badge bb">${s}</span>`);

// ══════════════════════════════════════════
//  ADMIN – OVERVIEW
// ══════════════════════════════════════════
function adminOverview(){
  const openT = tasks.filter(t=>t.status==='open').length;
  const doneT = tasks.filter(t=>t.status==='completed').length;
  const pending_u = users_list.filter(u=>u.status==='pending').length;
  return `
  <div class="pg-title">Platform Overview</div>
  <div class="pg-sub">Welcome back, Amina. Here's what's happening today.</div>
  <div class="stats">
    <div class="stat" style="--c:var(--admin)"><div class="stat-v">${users_list.length}</div><div class="stat-l">Total Users</div></div>
    <div class="stat" style="--c:var(--fundi)"><div class="stat-v">${openT}</div><div class="stat-l">Open Tasks</div></div>
    <div class="stat" style="--c:var(--merchant)"><div class="stat-v">${inventory.length}</div><div class="stat-l">Inventory Items</div></div>
    <div class="stat" style="--c:var(--danger)"><div class="stat-v">${pending_u}</div><div class="stat-l">Pending Review</div></div>
  </div>
  <div class="two-col">
    <div class="card">
      <div class="card-title" style="margin-bottom:.75rem">Weekly Task Completions</div>
      <div class="chart-wrap">${[40,65,50,80,55,90,72].map(h=>`<div class="bar bar-f" style="height:${h}%"></div>`).join('')}</div>
      <div class="chart-lbl"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
    </div>
    <div class="card">
      <div class="card-title" style="margin-bottom:.75rem">Revenue by Category</div>
      <div class="chart-wrap">${[70,45,85,35,60,50].map((h,i)=>`<div class="bar ${i%2===0?'bar-a':'bar-m'}" style="height:${h}%"></div>`).join('')}</div>
      <div class="chart-lbl"><span>Elec</span><span>Plumb</span><span>HVAC</span><span>Paint</span><span>Tile</span><span>Other</span></div>
    </div>
  </div>
  <div class="card">
    <div class="card-hdr"><div class="card-title">Recent Activity</div><span class="badge bg">Live</span></div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>User</th><th>Action</th><th>Time</th><th>Status</th></tr></thead><tbody>
      <tr><td>James Mwangi</td><td>Accepted task: Install Solar Panels</td><td>5 min ago</td><td>${statusBadge('completed')}</td></tr>
      <tr><td>Lena Waweru</td><td>Added item: LED Downlight 9W</td><td>12 min ago</td><td><span class="badge bb">listed</span></td></tr>
      <tr><td>Hassan Omar</td><td>Order ORD-0241 updated</td><td>30 min ago</td><td>${statusBadge('processing')}</td></tr>
      <tr><td>Wanjiku Mugo</td><td>New merchant registration</td><td>1 hr ago</td><td>${statusBadge('review')}</td></tr>
      <tr><td>Grace Njeri</td><td>Profile updated</td><td>2 hrs ago</td><td><span class="badge bb">info</span></td></tr>
    </tbody></table></div>
  </div>`;
}

// ══════════════════════════════════════════
//  ADMIN – USERS
// ══════════════════════════════════════════
function adminUsers(){
  const fundis    = accounts.filter(a=>a.role==='fundi');
  const merchants = accounts.filter(a=>a.role==='merchant');
  const online    = accounts.filter(a=>a.loggedIn).length;
  return `
  <div class="pg-title">User Management</div>
  <div class="pg-sub">Manage accounts, sessions, passwords and access.</div>
  <div class="stats">
    <div class="stat" style="--c:var(--fundi)"><div class="stat-v">${fundis.length}</div><div class="stat-l">Fundis</div></div>
    <div class="stat" style="--c:var(--merchant)"><div class="stat-v">${merchants.length}</div><div class="stat-l">Merchants</div></div>
    <div class="stat" style="--c:var(--admin)"><div class="stat-v">${accounts.filter(a=>a.status==='active').length}</div><div class="stat-l">Active</div></div>
    <div class="stat" style="--c:var(--fundi)" style="--c:#06d6a0"><div class="stat-v">${online}</div><div class="stat-l">Online Now</div></div>
  </div>

  <!-- ADMIN account -->
  <div class="card">
    <div class="card-hdr"><div class="card-title">🛡️ Admin Accounts</div></div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Name</th><th>Email</th><th>Status</th><th>Session</th><th>Actions</th></tr></thead>
    <tbody>${accounts.filter(a=>a.role==='admin').map(a=>`
      <tr>
        <td><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:7px;background:color-mix(in srgb,var(--admin) 20%,transparent);color:#fbbf24;font-size:.7rem;font-weight:700;margin-right:.45rem">${a.av}</span>${a.name}</td>
        <td style="font-size:.78rem;color:var(--muted)">${a.email}</td>
        <td>${accountStatusBadge(a.status)}</td>
        <td>${a.loggedIn?'<span class="badge bg">● Online</span>':'<span style="font-size:.75rem;color:var(--muted)">Offline</span>'}</td>
        <td style="display:flex;gap:.35rem;flex-wrap:wrap">
          <button class="btn btn-ghost btn-sm" onclick="openResetPasswordModal('${a.id}')">🔑 Reset PW</button>
          ${a.loggedIn&&a.id!==currentUser.id?`<button class="btn btn-sm" style="background:color-mix(in srgb,var(--danger) 20%,transparent);color:#f87171;border:none" onclick="confirmForceLogout('${a.id}')">Force Logout</button>`:''}
        </td>
      </tr>`).join('')}
    </tbody></table></div>
  </div>

  <!-- FUNDI accounts -->
  <div class="card">
    <div class="card-hdr">
      <div class="card-title">🔧 Fundi Accounts</div>
      <button class="btn btn-f btn-sm" onclick="openAddAccountModal('fundi')">+ Add Fundi</button>
    </div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Name</th><th>Email</th><th>Speciality</th><th>Status</th><th>Session</th><th>Actions</th></tr></thead>
    <tbody>${fundis.map(a=>`
      <tr>
        <td><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:7px;background:color-mix(in srgb,var(--fundi) 20%,transparent);color:#34d399;font-size:.7rem;font-weight:700;margin-right:.45rem">${a.av}</span>${a.name}</td>
        <td style="font-size:.78rem;color:var(--muted)">${a.email}</td>
        <td>${a.jobTitle}</td>
        <td>${accountStatusBadge(a.status)}</td>
        <td>${a.loggedIn?'<span class="badge bg">● Online</span>':'<span style="font-size:.75rem;color:var(--muted)">Offline</span>'}</td>
        <td style="display:flex;gap:.35rem;flex-wrap:wrap">
          <button class="btn btn-ghost btn-sm" onclick="openEditAccountModal('${a.id}')">Edit</button>
          <button class="btn btn-ghost btn-sm" onclick="openResetPasswordModal('${a.id}')">🔑 PW</button>
          ${a.loggedIn?`<button class="btn btn-sm" style="background:color-mix(in srgb,var(--admin) 20%,transparent);color:#fbbf24;border:none" onclick="confirmForceLogout('${a.id}')">Logout</button>`:''}
          <button class="btn btn-sm" style="background:color-mix(in srgb,${a.status==='suspended'?'var(--fundi)':'var(--danger)'} 20%,transparent);color:${a.status==='suspended'?'#34d399':'#f87171'};border:none" onclick="toggleAccountStatus('${a.id}')">${a.status==='suspended'?'Activate':'Suspend'}</button>
        </td>
      </tr>`).join('')}
    </tbody></table></div>
  </div>

  <!-- MERCHANT accounts -->
  <div class="card">
    <div class="card-hdr">
      <div class="card-title">🏪 Merchant Accounts</div>
      <button class="btn btn-m btn-sm" onclick="openAddAccountModal('merchant')">+ Add Merchant</button>
    </div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Name</th><th>Email</th><th>Business</th><th>Status</th><th>Session</th><th>Actions</th></tr></thead>
    <tbody>${merchants.map(a=>`
      <tr>
        <td><span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:7px;background:color-mix(in srgb,var(--merchant) 20%,transparent);color:#a78bfa;font-size:.7rem;font-weight:700;margin-right:.45rem">${a.av}</span>${a.name}</td>
        <td style="font-size:.78rem;color:var(--muted)">${a.email}</td>
        <td>${a.jobTitle}</td>
        <td>${accountStatusBadge(a.status)}</td>
        <td>${a.loggedIn?'<span class="badge bg">● Online</span>':'<span style="font-size:.75rem;color:var(--muted)">Offline</span>'}</td>
        <td style="display:flex;gap:.35rem;flex-wrap:wrap">
          <button class="btn btn-ghost btn-sm" onclick="openEditAccountModal('${a.id}')">Edit</button>
          <button class="btn btn-ghost btn-sm" onclick="openResetPasswordModal('${a.id}')">🔑 PW</button>
          ${a.loggedIn?`<button class="btn btn-sm" style="background:color-mix(in srgb,var(--admin) 20%,transparent);color:#fbbf24;border:none" onclick="confirmForceLogout('${a.id}')">Logout</button>`:''}
          <button class="btn btn-sm" style="background:color-mix(in srgb,${a.status==='suspended'?'var(--merchant)':'var(--danger)'} 20%,transparent);color:${a.status==='suspended'?'#a78bfa':'#f87171'};border:none" onclick="toggleAccountStatus('${a.id}')">${a.status==='suspended'?'Activate':'Suspend'}</button>
        </td>
      </tr>`).join('')}
    </tbody></table></div>
  </div>`;
}

function accountStatusBadge(s){
  return s==='active'?'<span class="badge bg">active</span>':
         s==='inactive'?'<span class="badge br">inactive</span>':
         s==='pending'?'<span class="badge ba">pending</span>':
         s==='suspended'?'<span class="badge br">suspended</span>':
         `<span class="badge bb">${s}</span>`;
}

function confirmForceLogout(accountId){
  const a = accounts.find(a=>a.id===accountId);
  showModal(`
    <div class="modal-title">Force Logout</div>
    <div class="confirm-msg">Immediately end <strong>${a.name}</strong>'s session? They will be redirected to the login screen.</div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-danger" onclick="forceLogout('${accountId}')">Force Logout</button>
    </div>`);
}

function openAddAccountModal(targetRole){
  showModal(`
    <div class="modal-title">Add ${targetRole==='fundi'?'Fundi':'Merchant'} Account</div>
    <div class="form-row-2">
      <div class="form-row"><label>First Name</label><input id="na-fname" placeholder="First name"></div>
      <div class="form-row"><label>Last Name</label><input id="na-lname" placeholder="Last name"></div>
    </div>
    <div class="form-row"><label>Email Address</label><input id="na-email" type="email" placeholder="user@example.com"></div>
    <div class="form-row"><label>Password</label><input id="na-pw" type="text" placeholder="Temporary password"></div>
    <div class="form-row-2">
      <div class="form-row"><label>Phone</label><input id="na-phone" placeholder="+254..."></div>
      <div class="form-row"><label>${targetRole==='fundi'?'Speciality':'Business Type'}</label><input id="na-job" placeholder="${targetRole==='fundi'?'e.g. Electrician':'e.g. Hardware'}"></div>
    </div>
    <div class="form-row"><label>Status</label><select id="na-status"><option value="active">Active</option><option value="pending">Pending</option></select></div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn ${targetRole==='fundi'?'btn-f':'btn-m'}" onclick="submitAddAccount('${targetRole}')">Create Account</button>
    </div>`);
}

function submitAddAccount(targetRole){
  const fname = document.getElementById('na-fname').value.trim();
  const lname = document.getElementById('na-lname').value.trim();
  const email = document.getElementById('na-email').value.trim();
  const pw    = document.getElementById('na-pw').value.trim();
  if(!fname||!lname||!email||!pw){toast('Please fill all required fields','#ef4444');return;}
  if(accounts.find(a=>a.email.toLowerCase()===email.toLowerCase())){toast('Email already exists','#ef4444');return;}
  const initials = (fname[0]+lname[0]).toUpperCase();
  const colors = ['#10b981','#06d6a0','#34d399','#8b5cf6','#a78bfa','#7c3aed'];
  const newAcct = {
    id: targetRole[0]+(Date.now()%10000),
    name:`${fname} ${lname}`, email, password:pw, role:targetRole,
    av: initials, color: colors[Math.floor(Math.random()*colors.length)],
    jobTitle: document.getElementById('na-job').value || (targetRole==='fundi'?'Fundi':'Merchant'),
    phone: document.getElementById('na-phone').value||'—',
    status: document.getElementById('na-status').value,
    joined: new Date().toLocaleDateString('en-GB',{month:'short',year:'numeric'}),
    loggedIn: false
  };
  accounts.push(newAcct);
  if(targetRole==='fundi'){
    fundiProfiles[newAcct.id]={name:newAcct.name,phone:newAcct.phone,email:newAcct.email,
      location:'Kenya',id_no:'—',joined:newAcct.joined,skills:[],areas:[],bio:''};
  }
  closeModal(); toast(`✅ ${newAcct.name}'s account created`,'#10b981'); goTo('users');
}

function openEditAccountModal(accountId){
  const a = accounts.find(a=>a.id===accountId);
  showModal(`
    <div class="modal-title">Edit Account</div>
    <div class="form-row"><label>Full Name</label><input id="ea-name" value="${a.name}"></div>
    <div class="form-row"><label>Email</label><input id="ea-email" value="${a.email}"></div>
    <div class="form-row-2">
      <div class="form-row"><label>Phone</label><input id="ea-phone" value="${a.phone}"></div>
      <div class="form-row"><label>Job Title</label><input id="ea-job" value="${a.jobTitle}"></div>
    </div>
    <div class="form-row"><label>Status</label>
      <select id="ea-status">
        ${['active','inactive','pending','suspended'].map(s=>`<option ${a.status===s?'selected':''}>${s}</option>`).join('')}
      </select>
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-a" onclick="submitEditAccount('${accountId}')">Save Changes</button>
    </div>`);
}

function submitEditAccount(accountId){
  const a = accounts.find(a=>a.id===accountId);
  a.name   = document.getElementById('ea-name').value.trim()||a.name;
  a.email  = document.getElementById('ea-email').value.trim()||a.email;
  a.phone  = document.getElementById('ea-phone').value||a.phone;
  a.jobTitle = document.getElementById('ea-job').value||a.jobTitle;
  const newStatus = document.getElementById('ea-status').value;
  if(newStatus==='suspended'||newStatus==='inactive') a.loggedIn=false;
  a.status = newStatus;
  closeModal(); toast('✅ Account updated','#10b981'); goTo('users');
}

// ══════════════════════════════════════════
//  ADMIN – TASKS
// ══════════════════════════════════════════
function adminTasks(){
  return `
  <div class="pg-title">Task Management</div>
  <div class="pg-sub">Create, assign and monitor all platform tasks.</div>
  <div class="stats">
    <div class="stat" style="--c:var(--fundi)"><div class="stat-v">${tasks.filter(t=>t.status==='open').length}</div><div class="stat-l">Open</div></div>
    <div class="stat" style="--c:var(--admin)"><div class="stat-v">${tasks.filter(t=>t.status==='in-progress').length}</div><div class="stat-l">In Progress</div></div>
    <div class="stat" style="--c:var(--merchant)"><div class="stat-v">${tasks.filter(t=>t.status==='completed').length}</div><div class="stat-l">Completed</div></div>
  </div>
  <div class="card">
    <div class="card-hdr">
      <div class="card-title">All Tasks</div>
      <button class="btn btn-a btn-sm" onclick="openAddTaskModal()">+ New Task</button>
    </div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Task</th><th>Client</th><th>Location</th><th>Pay</th><th>Date</th><th>Urgency</th><th>Status</th><th>Assigned</th><th>Actions</th></tr></thead>
    <tbody>${tasks.map(t=>`
      <tr>
        <td>${t.icon} ${t.title}</td>
        <td>${t.client}</td>
        <td>${t.location}</td>
        <td style="font-family:'Syne',sans-serif;font-weight:700;color:var(--fundi)">${fmt(t.pay)}</td>
        <td>${t.date}</td>
        <td>${urgBadge(t.urgency)}</td>
        <td>${statusBadge(t.status)}</td>
        <td>${t.assignedTo||'<span style="color:var(--muted)">—</span>'}</td>
        <td style="display:flex;gap:.35rem;flex-wrap:wrap">
          <button class="btn btn-ghost btn-sm" onclick="openEditTaskModal(${t.id})">Edit</button>
          <button class="btn btn-sm" style="background:color-mix(in srgb,var(--danger) 20%,transparent);color:#f87171;border:none" onclick="confirmDeleteTask(${t.id})">Del</button>
        </td>
      </tr>`).join('')}
    </tbody></table></div>
  </div>`;
}

function openAddTaskModal(){
  showModal(`
    <div class="modal-title">Create New Task</div>
    <div class="form-row"><label>Task Title</label><input id="nt-title" placeholder="e.g. Install Solar Panels"></div>
    <div class="form-row-2">
      <div class="form-row"><label>Client</label><input id="nt-client" placeholder="Client name"></div>
      <div class="form-row"><label>Location</label><input id="nt-loc" placeholder="City/Area"></div>
    </div>
    <div class="form-row-2">
      <div class="form-row"><label>Pay (KES)</label><input id="nt-pay" type="number" placeholder="3000"></div>
      <div class="form-row"><label>Date</label><input id="nt-date" placeholder="e.g. Today / 05 Mar"></div>
    </div>
    <div class="form-row-2">
      <div class="form-row"><label>Urgency</label><select id="nt-urg"><option>high</option><option>medium</option><option>low</option></select></div>
      <div class="form-row"><label>Icon</label><select id="nt-icon"><option>⚡</option><option>🔧</option><option>💧</option><option>🔥</option><option>⚙️</option><option>🏠</option></select></div>
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-a" onclick="submitAddTask()">Create Task</button>
    </div>`);
}

function submitAddTask(){
  const title = document.getElementById('nt-title').value.trim();
  const client = document.getElementById('nt-client').value.trim();
  if(!title||!client){toast('Please fill required fields','#ef4444');return;}
  tasks.push({
    id: tasks.length+1,
    title, client,
    location: document.getElementById('nt-loc').value||'Kenya',
    pay: parseInt(document.getElementById('nt-pay').value)||0,
    date: document.getElementById('nt-date').value||'TBD',
    urgency: document.getElementById('nt-urg').value,
    icon: document.getElementById('nt-icon').value,
    status:'open', assignedTo:null
  });
  closeModal(); toast('✅ Task created','#10b981'); goTo('tasks');
}

function openEditTaskModal(id){
  const t = tasks.find(t=>t.id===id);
  showModal(`
    <div class="modal-title">Edit Task</div>
    <div class="form-row"><label>Task Title</label><input id="et-title" value="${t.title}"></div>
    <div class="form-row-2">
      <div class="form-row"><label>Client</label><input id="et-client" value="${t.client}"></div>
      <div class="form-row"><label>Location</label><input id="et-loc" value="${t.location}"></div>
    </div>
    <div class="form-row-2">
      <div class="form-row"><label>Pay (KES)</label><input id="et-pay" type="number" value="${t.pay}"></div>
      <div class="form-row"><label>Date</label><input id="et-date" value="${t.date}"></div>
    </div>
    <div class="form-row-2">
      <div class="form-row"><label>Status</label><select id="et-status"><option ${t.status==='open'?'selected':''}>open</option><option ${t.status==='in-progress'?'selected':''}>in-progress</option><option ${t.status==='completed'?'selected':''}>completed</option></select></div>
      <div class="form-row"><label>Urgency</label><select id="et-urg"><option ${t.urgency==='high'?'selected':''}>high</option><option ${t.urgency==='medium'?'selected':''}>medium</option><option ${t.urgency==='low'?'selected':''}>low</option></select></div>
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-a" onclick="submitEditTask(${id})">Save Changes</button>
    </div>`);
}

function submitEditTask(id){
  const t = tasks.find(t=>t.id===id);
  t.title = document.getElementById('et-title').value.trim()||t.title;
  t.client = document.getElementById('et-client').value||t.client;
  t.location = document.getElementById('et-loc').value||t.location;
  t.pay = parseInt(document.getElementById('et-pay').value)||t.pay;
  t.date = document.getElementById('et-date').value||t.date;
  t.status = document.getElementById('et-status').value;
  t.urgency = document.getElementById('et-urg').value;
  closeModal(); toast('✅ Task updated','#10b981'); goTo('tasks');
}

function confirmDeleteTask(id){
  showModal(`
    <div class="modal-title">Delete Task</div>
    <div class="confirm-msg">Delete this task? This cannot be undone.</div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-danger" onclick="doDeleteTask(${id})">Delete</button>
    </div>`);
}
function doDeleteTask(id){tasks=tasks.filter(t=>t.id!==id);closeModal();toast('🗑️ Task deleted','#ef4444');goTo('tasks');}

// ══════════════════════════════════════════
//  ADMIN – INVENTORY
// ══════════════════════════════════════════
function adminInventory(){
  return `
  <div class="pg-title">Inventory Overview</div>
  <div class="pg-sub">All items listed by merchants on the platform.</div>
  <div class="stats">
    <div class="stat" style="--c:var(--merchant)"><div class="stat-v">${inventory.length}</div><div class="stat-l">Total Items</div></div>
    <div class="stat" style="--c:var(--fundi)"><div class="stat-v">${inventory.filter(i=>i.stock>100).length}</div><div class="stat-l">Well Stocked</div></div>
    <div class="stat" style="--c:var(--admin)"><div class="stat-v">${inventory.filter(i=>i.stock<=30).length}</div><div class="stat-l">Low Stock</div></div>
  </div>
  <div class="card">
    <div class="card-title" style="margin-bottom:.85rem">Inventory List</div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Item</th><th>Category</th><th>Unit Price</th><th>Stock</th><th>Status</th></tr></thead>
    <tbody>${inventory.map(i=>`
      <tr>
        <td>${i.icon} ${i.name}</td>
        <td>${i.category}</td>
        <td style="font-family:'Syne',sans-serif;font-weight:700;color:var(--merchant)">${fmt(i.price)}</td>
        <td>${i.stock} ${i.unit}s</td>
        <td>${i.stock>100?'<span class="badge bg">In Stock</span>':i.stock>30?'<span class="badge ba">Low</span>':'<span class="badge br">Critical</span>'}</td>
      </tr>`).join('')}
    </tbody></table></div>
  </div>`;
}

// ══════════════════════════════════════════
//  FUNDI – TASKS
// ══════════════════════════════════════════
function renderFundiTasks(el){
  const open = tasks.filter(t=>t.status==='open');
  el.innerHTML = `
  <div class="pg-title">Available Tasks</div>
  <div class="pg-sub">${open.length} tasks available near you.</div>
  <div class="stats">
    <div class="stat" style="--c:var(--fundi)"><div class="stat-v">${open.length}</div><div class="stat-l">Open Tasks</div></div>
    <div class="stat" style="--c:var(--danger)"><div class="stat-v">${open.filter(t=>t.urgency==='high').length}</div><div class="stat-l">Urgent</div></div>
    <div class="stat" style="--c:var(--admin)"><div class="stat-v">${fmt(open.reduce((a,t)=>a+t.pay,0))}</div><div class="stat-l">Potential Earn</div></div>
  </div>
  <div class="task-list">
    ${open.length===0?'<div class="empty"><div class="empty-ico">🎉</div><div class="empty-txt">No tasks right now. Check back soon!</div></div>':
    open.map(t=>`
      <div class="task-item">
        <div class="t-icon">${t.icon}</div>
        <div class="t-info">
          <div class="t-name">${t.title}</div>
          <div class="t-meta">📍 ${t.location} · 👤 ${t.client} · 📅 ${t.date}</div>
          <div style="margin-top:.35rem">${urgBadge(t.urgency)}</div>
        </div>
        <div style="text-align:right;flex-shrink:0;display:flex;flex-direction:column;align-items:flex-end;gap:.4rem">
          <div class="t-pay">${fmt(t.pay)}</div>
          <button class="btn btn-f btn-sm" onclick="acceptTask(${t.id})">Accept</button>
          <button class="btn btn-ghost btn-sm" onclick="viewTask(${t.id})">Details</button>
        </div>
      </div>`).join('')}
  </div>`;
}

function acceptTask(id){
  const t = tasks.find(t=>t.id===id);
  showModal(`
    <div class="modal-title">Accept Task</div>
    <div style="background:var(--surface2);border-radius:10px;padding:1rem;margin-bottom:1.2rem">
      <div style="font-size:1.3rem;margin-bottom:.5rem">${t.icon} <strong>${t.title}</strong></div>
      <div style="font-size:.82rem;color:var(--muted);line-height:1.7">
        📍 ${t.location}<br>👤 ${t.client}<br>📅 ${t.date}<br>💰 <span style="color:var(--fundi);font-weight:700">${fmt(t.pay)}</span>
      </div>
    </div>
    <div class="confirm-msg">By accepting, you confirm availability and agree to complete this task professionally.</div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-f" onclick="confirmAcceptTask(${id})">✅ Accept Task</button>
    </div>`);
}

function confirmAcceptTask(id){
  const t = tasks.find(t=>t.id===id);
  t.status = 'in-progress';
  t.assignedTo = getFundiProfile().name;
  closeModal();
  toast(`✅ Task "${t.title}" accepted!`,'#10b981');
  goTo('tasks');
}

function viewTask(id){
  const t = tasks.find(t=>t.id===id);
  showModal(`
    <div class="modal-title">${t.icon} ${t.title}</div>
    <div class="info-item"><div class="info-lbl">Client</div><div class="info-val">${t.client}</div></div>
    <div class="info-item"><div class="info-lbl">Location</div><div class="info-val">📍 ${t.location}</div></div>
    <div class="info-item"><div class="info-lbl">Date</div><div class="info-val">📅 ${t.date}</div></div>
    <div class="info-item"><div class="info-lbl">Pay</div><div class="info-val" style="color:var(--fundi);font-weight:700;font-family:'Syne',sans-serif">${fmt(t.pay)}</div></div>
    <div class="info-item"><div class="info-lbl">Urgency</div><div class="info-val">${urgBadge(t.urgency)}</div></div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Close</button>
      <button class="btn btn-f" onclick="closeModal();acceptTask(${id})">Accept Task</button>
    </div>`);
}

// ══════════════════════════════════════════
//  FUNDI – PROFILE
// ══════════════════════════════════════════
function fundiProfilePage(){
  const fp = getFundiProfile();
  const myTasks = tasks.filter(t=>t.assignedTo===fp.name);
  const done = myTasks.filter(t=>t.status==='completed').length;
  return `
  <div class="pg-title">My Profile</div>
  <div class="pg-sub">Your professional details and statistics.</div>
  <div class="profile-hero">
    <div class="avatar av-lg" style="background:${currentUser.color};color:#0a0f1a">${currentUser.av}</div>
    <div>
      <div class="p-name">${fp.name}</div>
      <div class="p-title">${currentUser.jobTitle}</div>
      <div class="p-rating">★★★★☆ <span style="color:var(--muted);margin-left:5px">4.2 (38 reviews)</span></div>
      <div style="margin-top:.65rem">
        <button class="btn btn-f btn-sm" onclick="openEditProfileModal()">✏️ Edit Profile</button>
      </div>
    </div>
  </div>
  <div class="stats">
    <div class="stat" style="--c:var(--fundi)"><div class="stat-v">127</div><div class="stat-l">Tasks Done</div></div>
    <div class="stat" style="--c:var(--admin)"><div class="stat-v">4.2</div><div class="stat-l">Rating</div></div>
    <div class="stat" style="--c:var(--merchant)"><div class="stat-v">KES 312K</div><div class="stat-l">Total Earned</div></div>
    <div class="stat" style="--c:var(--fundi)"><div class="stat-v">${myTasks.length}</div><div class="stat-l">Active Tasks</div></div>
  </div>
  <div class="two-col">
    <div class="card">
      <div class="card-title">Personal Information</div>
      <div class="info-grid">
        <div class="info-item"><div class="info-lbl">Full Name</div><div class="info-val">${fp.name}</div></div>
        <div class="info-item"><div class="info-lbl">Phone</div><div class="info-val">${fp.phone}</div></div>
        <div class="info-item"><div class="info-lbl">Email</div><div class="info-val">${fp.email}</div></div>
        <div class="info-item"><div class="info-lbl">Location</div><div class="info-val">${fp.location}</div></div>
        <div class="info-item"><div class="info-lbl">ID Number</div><div class="info-val">${fp.id_no}</div></div>
        <div class="info-item"><div class="info-lbl">Joined</div><div class="info-val">${fp.joined}</div></div>
      </div>
      ${fp.bio?`<div style="margin-top:.75rem;font-size:.83rem;color:var(--muted);line-height:1.55;padding-top:.75rem;border-top:1px solid var(--border)">${fp.bio}</div>`:''}
    </div>
    <div class="card">
      <div class="card-hdr"><div class="card-title">Skills</div><button class="btn btn-ghost btn-sm" onclick="openEditSkillsModal()">Edit</button></div>
      <div class="tag-wrap">${fp.skills.length?fp.skills.map(s=>`<span class="tag badge bg">${s}</span>`).join(''):'<span style="font-size:.8rem;color:var(--muted)">No skills added yet.</span>'}</div>
      <div class="card-title" style="margin-top:1.1rem;margin-bottom:.75rem">Certifications</div>
      <div class="info-item"><div class="info-lbl">EPRA Certificate</div><div class="info-val">✅ Verified · Exp: Dec 2025</div></div>
      <div class="info-item"><div class="info-lbl">Business Permit</div><div class="info-val">✅ Active · 2024</div></div>
    </div>
  </div>
  <div class="card">
    <div class="card-hdr"><div class="card-title">Service Areas</div><button class="btn btn-ghost btn-sm" onclick="openEditAreasModal()">Edit</button></div>
    <div class="tag-wrap">${fp.areas.length?fp.areas.map(a=>`<span class="tag badge bb">📍 ${a}</span>`).join(''):'<span style="font-size:.8rem;color:var(--muted)">No service areas added yet.</span>'}</div>
  </div>
  ${myTasks.length>0?`<div class="card">
    <div class="card-title">My Current Tasks</div>
    <div class="task-list" style="margin-top:.75rem">${myTasks.map(t=>`
      <div class="task-item">
        <div class="t-icon">${t.icon}</div>
        <div class="t-info"><div class="t-name">${t.title}</div><div class="t-meta">📍 ${t.location} · ${t.date}</div></div>
        <div style="display:flex;flex-direction:column;gap:.4rem;align-items:flex-end">
          <div class="t-pay">${fmt(t.pay)}</div>
          ${statusBadge(t.status)}
          ${t.status==='in-progress'?`<button class="btn btn-f btn-sm" onclick="markTaskDone(${t.id})">Mark Done</button>`:''}
        </div>
      </div>`).join('')}
    </div>
  </div>`:''}`;
}

function markTaskDone(id){
  tasks.find(t=>t.id===id).status='completed';
  toast('🎉 Task marked as complete!','#10b981');
  goTo('profile');
}

function openEditProfileModal(){
  const fp = getFundiProfile();
  showModal(`
    <div class="modal-title">Edit Profile</div>
    <div class="form-row"><label>Full Name</label><input id="ep-name" value="${fp.name}"></div>
    <div class="form-row-2">
      <div class="form-row"><label>Phone</label><input id="ep-phone" value="${fp.phone}"></div>
      <div class="form-row"><label>Email</label><input id="ep-email" value="${fp.email}"></div>
    </div>
    <div class="form-row"><label>Location</label><input id="ep-loc" value="${fp.location}"></div>
    <div class="form-row"><label>Bio</label><textarea id="ep-bio" rows="3" style="resize:vertical">${fp.bio}</textarea></div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-f" onclick="submitEditProfile()">Save Profile</button>
    </div>`);
}

function submitEditProfile(){
  const fp = getFundiProfile();
  fp.name   = document.getElementById('ep-name').value.trim()||fp.name;
  fp.phone  = document.getElementById('ep-phone').value||fp.phone;
  fp.email  = document.getElementById('ep-email').value||fp.email;
  fp.location = document.getElementById('ep-loc').value||fp.location;
  fp.bio    = document.getElementById('ep-bio').value;
  setFundiProfile(fp);
  closeModal(); toast('✅ Profile updated','#10b981'); goTo('profile');
}

function openEditSkillsModal(){
  const fp = getFundiProfile();
  showModal(`
    <div class="modal-title">Edit Skills</div>
    <div class="form-row"><label>Skills (comma-separated)</label>
      <textarea id="sk-input" rows="3" style="resize:vertical">${fp.skills.join(', ')}</textarea>
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-f" onclick="submitEditSkills()">Save Skills</button>
    </div>`);
}

function submitEditSkills(){
  const fp = getFundiProfile();
  fp.skills = document.getElementById('sk-input').value.split(',').map(s=>s.trim()).filter(Boolean);
  setFundiProfile(fp);
  closeModal(); toast('✅ Skills updated','#10b981'); goTo('profile');
}

function openEditAreasModal(){
  const fp = getFundiProfile();
  showModal(`
    <div class="modal-title">Edit Service Areas</div>
    <div class="form-row"><label>Areas (comma-separated)</label>
      <textarea id="ar-input" rows="3" style="resize:vertical">${fp.areas.join(', ')}</textarea>
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-f" onclick="submitEditAreas()">Save Areas</button>
    </div>`);
}

function submitEditAreas(){
  const fp = getFundiProfile();
  fp.areas = document.getElementById('ar-input').value.split(',').map(s=>s.trim()).filter(Boolean);
  setFundiProfile(fp);
  closeModal(); toast('✅ Areas updated','#10b981'); goTo('profile');
}

// ══════════════════════════════════════════
//  FUNDI – SHOP
// ══════════════════════════════════════════
function fundiShop(){
  const cartTotal = cart.reduce((a,c)=>a+c.price*c.qty,0);
  return `
  <div class="pg-title">Shop for Materials</div>
  <div class="pg-sub">Browse tools & materials from verified merchants.</div>
  ${cart.length>0?`
  <div class="card" style="border-color:color-mix(in srgb,var(--merchant) 35%,transparent);background:color-mix(in srgb,var(--merchant) 6%,var(--surface))">
    <div class="card-hdr">
      <div class="card-title">🛒 Cart (${cart.length} item${cart.length>1?'s':''})</div>
      <span style="font-family:'Syne',sans-serif;font-weight:700;color:var(--merchant)">${fmt(cartTotal)}</span>
    </div>
    <div style="display:flex;flex-direction:column;gap:.5rem;margin-bottom:.9rem">
      ${cart.map(c=>`
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:.83rem;background:var(--surface2);padding:.55rem .85rem;border-radius:8px">
          <span>${c.icon} ${c.name}</span>
          <div style="display:flex;align-items:center;gap:.75rem">
            <div style="display:flex;align-items:center;gap:.35rem">
              <button class="btn btn-ghost btn-sm" onclick="cartQty(${c.id},-1)" style="padding:.2rem .5rem;font-size:.85rem">−</button>
              <span style="font-weight:600;min-width:20px;text-align:center">${c.qty}</span>
              <button class="btn btn-ghost btn-sm" onclick="cartQty(${c.id},1)" style="padding:.2rem .5rem;font-size:.85rem">+</button>
            </div>
            <span style="color:var(--merchant);font-weight:700;font-family:'Syne',sans-serif">${fmt(c.price*c.qty)}</span>
            <button onclick="removeFromCart(${c.id})" style="background:none;border:none;color:var(--muted);font-size:.9rem;cursor:pointer" title="Remove">✕</button>
          </div>
        </div>`).join('')}
    </div>
    <div style="display:flex;gap:.65rem;justify-content:flex-end">
      <button class="btn btn-ghost btn-sm" onclick="clearCart()">Clear Cart</button>
      <button class="btn btn-m btn-sm" onclick="checkoutCart()">Checkout ${fmt(cartTotal)}</button>
    </div>
  </div>`:''}
  <div class="inv-grid">
    ${inventory.map(i=>`
      <div class="inv-card">
        <div class="inv-ico">${i.icon}</div>
        <div class="inv-name">${i.name}</div>
        <div class="inv-cat">${i.category}</div>
        <div class="inv-price">${fmt(i.price)} <span style="font-size:.7rem;color:var(--muted);font-weight:400">/${i.unit}</span></div>
        <div class="inv-stock">${i.stock>50?'✅':'⚠️'} ${i.stock} ${i.unit}s in stock</div>
        <button class="btn-cart" onclick="addToCart(${i.id})" ${i.stock===0?'disabled':''}>
          ${cart.find(c=>c.id===i.id)?'✓ In Cart — Add More':'Add to Cart'}
        </button>
      </div>`).join('')}
  </div>`;
}

function addToCart(id){
  const item = inventory.find(i=>i.id===id);
  const existing = cart.find(c=>c.id===id);
  if(existing){ existing.qty++; }
  else { cart.push({...item, qty:1}); }
  updateCartBadge();
  toast(`🛒 ${item.name} added`,'#8b5cf6');
  goTo('shop');
}

function removeFromCart(id){
  cart = cart.filter(c=>c.id!==id);
  updateCartBadge(); goTo('shop');
}

function cartQty(id, delta){
  const c = cart.find(c=>c.id===id);
  if(!c) return;
  c.qty = Math.max(1, c.qty+delta);
  updateCartBadge(); goTo('shop');
}

function clearCart(){
  cart=[];
  updateCartBadge(); goTo('shop');
}

function checkoutCart(){
  if(cart.length===0) return;
  const total = cart.reduce((a,c)=>a+c.price*c.qty,0);
  const newOrder = {
    id:'ORD-0'+(orders.length+242),
    fundi: getFundiProfile().name,
    items: cart.map(c=>({name:c.name,qty:c.qty,price:c.price})),
    status:'pending',
    date:'Today'
  };
  orders.unshift(newOrder);
  showModal(`
    <div style="text-align:center;padding:1rem 0">
      <div style="font-size:3rem;margin-bottom:.75rem">🎉</div>
      <div class="modal-title" style="text-align:center">Order Placed!</div>
      <div style="font-size:.85rem;color:var(--muted);margin-bottom:1.2rem">Your order <strong>${newOrder.id}</strong> has been sent to the merchant.</div>
      <div style="background:var(--surface2);border-radius:10px;padding:1rem;text-align:left;margin-bottom:1rem">
        ${cart.map(c=>`<div style="display:flex;justify-content:space-between;font-size:.82rem;padding:.3rem 0">${c.icon} ${c.name} ×${c.qty}<span style="color:var(--merchant);font-weight:700">${fmt(c.price*c.qty)}</span></div>`).join('')}
        <div style="border-top:1px solid var(--border);margin-top:.5rem;padding-top:.5rem;display:flex;justify-content:space-between;font-weight:700;font-family:'Syne',sans-serif">Total<span style="color:var(--merchant)">${fmt(total)}</span></div>
      </div>
      <button class="btn btn-m" onclick="closeModal();cart=[];updateCartBadge();goTo('my-orders')">View My Orders</button>
    </div>`);
}

function updateCartBadge(){
  const el = document.getElementById('cart-count');
  if(el) el.textContent = cart.length||'';
}

// ══════════════════════════════════════════
//  FUNDI – MY ORDERS
// ══════════════════════════════════════════
function fundiMyOrders(){
  const myOrds = orders.filter(o=>o.fundi===getFundiProfile().name);
  return `
  <div class="pg-title">My Orders</div>
  <div class="pg-sub">Track your purchases from merchants.</div>
  ${myOrds.length===0?'<div class="empty"><div class="empty-ico">🛍️</div><div class="empty-txt">No orders yet. Shop for materials!</div></div>':
  myOrds.map(o=>`
    <div class="card">
      <div class="card-hdr">
        <div>
          <div style="font-family:'Syne',sans-serif;font-weight:700">${o.id}</div>
          <div style="font-size:.75rem;color:var(--muted)">${o.date}</div>
        </div>
        ${statusBadge(o.status)}
      </div>
      <div style="display:flex;flex-direction:column;gap:.4rem;margin-bottom:.75rem">
        ${o.items.map(i=>`<div style="display:flex;justify-content:space-between;font-size:.83rem"><span>${i.name} ×${i.qty}</span><span style="color:var(--merchant);font-weight:600">${fmt(i.price*i.qty)}</span></div>`).join('')}
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--border);padding-top:.75rem">
        <span style="font-family:'Syne',sans-serif;font-weight:800;color:var(--merchant)">${fmt(o.items.reduce((a,i)=>a+i.price*i.qty,0))}</span>
        ${o.status==='delivered'?'<span class="badge bg">✓ Received</span>':`<button class="btn btn-ghost btn-sm" onclick="cancelOrder('${o.id}')">Cancel Order</button>`}
      </div>
    </div>`).join('')}`;
}

function cancelOrder(id){
  showModal(`
    <div class="modal-title">Cancel Order</div>
    <div class="confirm-msg">Cancel order <strong>${id}</strong>? The merchant will be notified.</div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Keep Order</button>
      <button class="btn btn-danger" onclick="doCancelOrder('${id}')">Cancel Order</button>
    </div>`);
}

function doCancelOrder(id){
  orders = orders.filter(o=>o.id!==id);
  closeModal(); toast('Order cancelled','#ef4444'); goTo('my-orders');
}

// ══════════════════════════════════════════
//  MERCHANT – INVENTORY
// ══════════════════════════════════════════
function merchantInventory(){
  return `
  <div class="pg-title">My Inventory</div>
  <div class="pg-sub">Manage your listed items available to Fundis.</div>
  <div class="stats">
    <div class="stat" style="--c:var(--merchant)"><div class="stat-v">${inventory.length}</div><div class="stat-l">Listed Items</div></div>
    <div class="stat" style="--c:var(--fundi)"><div class="stat-v">${inventory.filter(i=>i.stock>50).length}</div><div class="stat-l">Well Stocked</div></div>
    <div class="stat" style="--c:var(--admin)"><div class="stat-v">${inventory.filter(i=>i.stock<=30).length}</div><div class="stat-l">Low Stock</div></div>
    <div class="stat" style="--c:var(--danger)"><div class="stat-v">${inventory.filter(i=>i.stock===0).length}</div><div class="stat-l">Out of Stock</div></div>
  </div>
  <div class="card">
    <div class="card-hdr">
      <div class="card-title">Inventory List</div>
      <button class="btn btn-m btn-sm" onclick="openAddItemModal()">+ Add Item</button>
    </div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Item</th><th>Category</th><th>Unit Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody>${inventory.map(i=>`
      <tr>
        <td>${i.icon} ${i.name}</td>
        <td>${i.category}</td>
        <td style="font-family:'Syne',sans-serif;font-weight:700;color:var(--merchant)">${fmt(i.price)}</td>
        <td>${i.stock} ${i.unit}s</td>
        <td>${i.stock>100?'<span class="badge bg">In Stock</span>':i.stock>30?'<span class="badge ba">Low</span>':'<span class="badge br">Critical</span>'}</td>
        <td style="display:flex;gap:.35rem;flex-wrap:wrap">
          <button class="btn btn-ghost btn-sm" onclick="openEditItemModal(${i.id})">Edit</button>
          <button class="btn btn-ghost btn-sm" onclick="openRestockModal(${i.id})">Restock</button>
          <button class="btn btn-sm" style="background:color-mix(in srgb,var(--danger) 20%,transparent);color:#f87171;border:none" onclick="confirmDeleteItem(${i.id})">Del</button>
        </td>
      </tr>`).join('')}
    </tbody></table></div>
  </div>`;
}

function openAddItemModal(){
  showModal(`
    <div class="modal-title">Add Inventory Item</div>
    <div class="form-row"><label>Item Name</label><input id="ni-name" placeholder="e.g. PVC Pipe 25mm"></div>
    <div class="form-row-2">
      <div class="form-row"><label>Category</label><select id="ni-cat"><option>Electrical</option><option>Plumbing</option><option>Wiring</option><option>Lighting</option><option>Tools</option><option>Safety</option><option>Adhesives</option><option>Other</option></select></div>
      <div class="form-row"><label>Icon</label><select id="ni-icon"><option>📦</option><option>⚡</option><option>🔧</option><option>💧</option><option>🔌</option><option>💡</option><option>🛠️</option><option>🧪</option><option>🔩</option><option>🧤</option></select></div>
    </div>
    <div class="form-row-2">
      <div class="form-row"><label>Unit Price (KES)</label><input id="ni-price" type="number" placeholder="250"></div>
      <div class="form-row"><label>Initial Stock</label><input id="ni-stock" type="number" placeholder="100"></div>
    </div>
    <div class="form-row"><label>Unit</label><select id="ni-unit"><option>piece</option><option>metre</option><option>roll</option><option>pack</option><option>set</option><option>pair</option><option>litre</option></select></div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-m" onclick="submitAddItem()">Add Item</button>
    </div>`);
}

function submitAddItem(){
  const name = document.getElementById('ni-name').value.trim();
  if(!name){toast('Item name is required','#ef4444');return;}
  inventory.push({
    id: inventory.length+1,
    name,
    category: document.getElementById('ni-cat').value,
    icon: document.getElementById('ni-icon').value,
    price: parseInt(document.getElementById('ni-price').value)||0,
    stock: parseInt(document.getElementById('ni-stock').value)||0,
    unit: document.getElementById('ni-unit').value,
  });
  closeModal(); toast('✅ Item added to inventory','#8b5cf6'); goTo('inventory');
}

function openEditItemModal(id){
  const i = inventory.find(i=>i.id===id);
  showModal(`
    <div class="modal-title">Edit Item</div>
    <div class="form-row"><label>Item Name</label><input id="ei-name" value="${i.name}"></div>
    <div class="form-row-2">
      <div class="form-row"><label>Unit Price (KES)</label><input id="ei-price" type="number" value="${i.price}"></div>
      <div class="form-row"><label>Stock</label><input id="ei-stock" type="number" value="${i.stock}"></div>
    </div>
    <div class="form-row-2">
      <div class="form-row"><label>Category</label><select id="ei-cat">${['Electrical','Plumbing','Wiring','Lighting','Tools','Safety','Adhesives','Other'].map(c=>`<option ${i.category===c?'selected':''}>${c}</option>`).join('')}</select></div>
      <div class="form-row"><label>Unit</label><select id="ei-unit">${['piece','metre','roll','pack','set','pair','litre'].map(u=>`<option ${i.unit===u?'selected':''}>${u}</option>`).join('')}</select></div>
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-m" onclick="submitEditItem(${id})">Save Changes</button>
    </div>`);
}

function submitEditItem(id){
  const i = inventory.find(i=>i.id===id);
  i.name = document.getElementById('ei-name').value.trim()||i.name;
  i.price = parseInt(document.getElementById('ei-price').value)||i.price;
  i.stock = parseInt(document.getElementById('ei-stock').value)||i.stock;
  i.category = document.getElementById('ei-cat').value;
  i.unit = document.getElementById('ei-unit').value;
  closeModal(); toast('✅ Item updated','#8b5cf6'); goTo('inventory');
}

function openRestockModal(id){
  const i = inventory.find(i=>i.id===id);
  showModal(`
    <div class="modal-title">Restock: ${i.name}</div>
    <div style="font-size:.85rem;color:var(--muted);margin-bottom:1rem">Current stock: <strong style="color:var(--text)">${i.stock} ${i.unit}s</strong></div>
    <div class="form-row"><label>Add Quantity</label><input id="rs-qty" type="number" placeholder="50" min="1"></div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-m" onclick="submitRestock(${id})">Add Stock</button>
    </div>`);
}

function submitRestock(id){
  const qty = parseInt(document.getElementById('rs-qty').value)||0;
  if(qty<1){toast('Enter a valid quantity','#ef4444');return;}
  inventory.find(i=>i.id===id).stock += qty;
  closeModal(); toast('✅ Stock updated','#8b5cf6'); goTo('inventory');
}

function confirmDeleteItem(id){
  const i = inventory.find(i=>i.id===id);
  showModal(`
    <div class="modal-title">Remove Item</div>
    <div class="confirm-msg">Remove <strong>${i.name}</strong> from inventory?</div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn-danger" onclick="doDeleteItem(${id})">Remove</button>
    </div>`);
}

function doDeleteItem(id){
  inventory = inventory.filter(i=>i.id!==id);
  closeModal(); toast('🗑️ Item removed','#ef4444'); goTo('inventory');
}

// ══════════════════════════════════════════
//  MERCHANT – ORDERS
// ══════════════════════════════════════════
function merchantOrders(){
  return `
  <div class="pg-title">Orders</div>
  <div class="pg-sub">Purchase orders from Fundis.</div>
  <div class="stats">
    <div class="stat" style="--c:var(--admin)"><div class="stat-v">${orders.filter(o=>o.status==='pending').length}</div><div class="stat-l">Pending</div></div>
    <div class="stat" style="--c:var(--merchant)"><div class="stat-v">${orders.filter(o=>o.status==='processing').length}</div><div class="stat-l">Processing</div></div>
    <div class="stat" style="--c:var(--fundi)"><div class="stat-v">${orders.filter(o=>o.status==='delivered').length}</div><div class="stat-l">Delivered</div></div>
  </div>
  ${orders.map(o=>`
    <div class="card">
      <div class="card-hdr">
        <div>
          <div style="font-family:'Syne',sans-serif;font-weight:700">${o.id}</div>
          <div style="font-size:.75rem;color:var(--muted)">👤 ${o.fundi} · ${o.date}</div>
        </div>
        <div style="display:flex;align-items:center;gap:.65rem">
          ${statusBadge(o.status)}
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:.35rem;margin-bottom:.75rem">
        ${o.items.map(i=>`<div style="display:flex;justify-content:space-between;font-size:.83rem"><span>${i.name} ×${i.qty}</span><span style="color:var(--merchant);font-weight:600">${fmt(i.price*i.qty)}</span></div>`).join('')}
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--border);padding-top:.75rem;flex-wrap:wrap;gap:.5rem">
        <span style="font-family:'Syne',sans-serif;font-weight:800;color:var(--merchant)">${fmt(o.items.reduce((a,i)=>a+i.price*i.qty,0))}</span>
        <div style="display:flex;gap:.5rem">
          ${o.status==='pending'?`<button class="btn btn-m btn-sm" onclick="updateOrderStatus('${o.id}','processing')">Start Processing</button>`:''}
          ${o.status==='processing'?`<button class="btn btn-m btn-sm" onclick="updateOrderStatus('${o.id}','delivered')">Mark Delivered</button>`:''}
          ${o.status==='delivered'?'<span class="badge bg">✓ Completed</span>':''}
        </div>
      </div>
    </div>`).join('')}`;
}

function updateOrderStatus(id, newStatus){
  const o = orders.find(o=>o.id===id);
  o.status = newStatus;
  toast(`Order ${id} → ${newStatus}`,'#8b5cf6');
  goTo('orders');
}

// ══════════════════════════════════════════
//  MERCHANT – ANALYTICS
// ══════════════════════════════════════════
function merchantAnalytics(){
  const totalRev = orders.filter(o=>o.status==='delivered').reduce((a,o)=>a+o.items.reduce((b,i)=>b+i.price*i.qty,0),0);
  return `
  <div class="pg-title">Analytics</div>
  <div class="pg-sub">Sales performance and store insights.</div>
  <div class="stats">
    <div class="stat" style="--c:var(--merchant)"><div class="stat-v">${fmt(totalRev)}</div><div class="stat-l">Total Revenue</div></div>
    <div class="stat" style="--c:var(--fundi)"><div class="stat-v">+18%</div><div class="stat-l">vs Last Month</div></div>
    <div class="stat" style="--c:var(--admin)"><div class="stat-v">${orders.length}</div><div class="stat-l">All Orders</div></div>
  </div>
  <div class="two-col">
    <div class="card">
      <div class="card-title" style="margin-bottom:.75rem">Monthly Revenue (KES K)</div>
      <div class="chart-wrap">${[45,62,55,78,68,84].map(h=>`<div class="bar bar-m" style="height:${h/84*100}%"></div>`).join('')}</div>
      <div class="chart-lbl"><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span></div>
    </div>
    <div class="card">
      <div class="card-title" style="margin-bottom:.9rem">Top Selling Items</div>
      ${[
        {name:'Copper Cable 2.5mm²',pct:84,val:'KES 23,520'},
        {name:'LED Downlight 9W',pct:63,val:'KES 17,640'},
        {name:'MCB Circuit Breaker',pct:51,val:'KES 14,280'},
        {name:'Steel Drill Bit Set',pct:42,val:'KES 11,760'},
      ].map(i=>`
        <div style="margin-bottom:.8rem">
          <div style="display:flex;justify-content:space-between;font-size:.8rem;margin-bottom:5px"><span>${i.name}</span><span style="color:var(--merchant)">${i.val}</span></div>
          <div class="prog-bar-wrap"><div class="prog-bar" style="width:${i.pct}%"></div></div>
        </div>`).join('')}
    </div>
  </div>
  <div class="card">
    <div class="card-title" style="margin-bottom:.85rem">Order Breakdown</div>
    <div style="display:flex;gap:1rem;flex-wrap:wrap">
      ${[
        {label:'Pending', count: orders.filter(o=>o.status==='pending').length, c:'var(--admin)'},
        {label:'Processing', count: orders.filter(o=>o.status==='processing').length, c:'var(--merchant)'},
        {label:'Delivered', count: orders.filter(o=>o.status==='delivered').length, c:'var(--fundi)'},
      ].map(s=>`
        <div style="flex:1;min-width:120px;background:var(--surface2);border-radius:10px;padding:1rem;text-align:center">
          <div style="font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:${s.c}">${s.count}</div>
          <div style="font-size:.75rem;color:var(--muted);margin-top:.25rem;text-transform:uppercase;letter-spacing:.05em">${s.label}</div>
        </div>`).join('')}
    </div>
  </div>`;
}

// ══════════════════════════════════════════
//  MODAL HELPERS
// ══════════════════════════════════════════
function showModal(html){
  document.getElementById('modal-content').innerHTML = html;
  document.getElementById('modal-overlay').classList.remove('hidden');
}

function closeModal(){
  document.getElementById('modal-overlay').classList.add('hidden');
}

function closeModalOnBg(e){
  if(e.target===document.getElementById('modal-overlay')) closeModal();
}

// ══════════════════════════════════════════
//  TOAST
// ══════════════════════════════════════════
function toast(msg, color='#10b981'){
  const wrap = document.getElementById('toast-wrap');
  const el = document.createElement('div');
  el.className='toast';
  el.innerHTML=`<div class="toast-dot" style="background:${color}"></div><span>${msg}</span>`;
  wrap.appendChild(el);
  setTimeout(()=>{el.classList.add('out');setTimeout(()=>el.remove(),300)}, 3000);
}

// ══════════════════════════════════════════
//  KEYBOARD ESC
// ══════════════════════════════════════════
document.addEventListener('keydown',e=>{if(e.key==='Escape') closeModal();});
