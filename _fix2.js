const fs=require('fs');
let t=fs.readFileSync('app.js','utf8');
t=t.replace(/\r\n/g,'\n');
// 1. Fix addToCartFromDetail
const s=t.indexOf('function addToCartFromDetail');
const se=t.indexOf('\n}',s);
const body='function addToCartFromDetail() {\n'+
'  const p = DB.products.find((x) => x.id === currentDetailId);\n'+
'  if (!p) return;\n'+
'  const ok = addToCart(currentDetailId, false);\n'+
'  if (!ok) return;\n'+
'  for (let i=1;i<detailQty;i++) addToCart(currentDetailId, false);\n'+
'  toast(p.emoji + " Added " + detailQty + "x " + p.name + "!");\n'+
'}';
t=t.slice(0,s)+body+t.slice(se+2);
// 2. Remove junk statements
['ehafqag','ajfpqg','qljfpqgw','qlkfhqpo'].forEach(w=>{t=t.replace(new RegExp('^\\s*'+w+';\\s*$','gm'),'');});
// 3. Custom order logic before toast()
const tj=t.indexOf('function toast(msg');
const customJs=''+
'let customImageData=null;\n'+
'function openCustomOrder() {\n'+
'  if (!session || session.type !== "customer") {\n'+
'    toast("Please sign in to request a custom order.");\n'+
'    openAuthModal();\n'+
'    return;\n'+
'  }\n'+
'  showPage("custom");\n'+
'  document.getElementById("coName").value = session.name || "";\n'+
'  document.getElementById("coEmail").value = session.email || "";\n'+
'  document.getElementById("coDesc").value = "";\n'+
'  document.getElementById("coImage").value = "";\n'+
'  var box0=document.getElementById("coImagePreview");box0.innerHTML="";\n'+
'  customImageData = null;\n'+
'}\n'+
'function previewCustomImage(input) {\n'+
'  const file = input.files && input.files[0];\n'+
'  if (!file) return;\n'+
'  if (file.type.indexOf("image/") !== 0) {\n'+
'    toast("Please choose an image file.");\n'+
'    input.value = "";\n'+
'    return;\n'+
'  }\n'+
'  const reader = new FileReader();\n'+
'  reader.onload = (e) => {\n'+
'    customImageData = e.target.result;\n'+
'    const box=document.getElementById("coImagePreview");\n'+
'    box.innerHTML="";\n'+
'    const im=document.createElement("img");\n'+
'    im.src=customImageData;\n'+
'    im.alt="Reference preview";\n'+
'    box.appendChild(im);\n'+
'  };\n'+
'  reader.readAsDataURL(file);\n'+
'}\n'+
'function submitCustomOrder() {\n'+
'  if (!session || session.type !== "customer") { openAuthModal(); return; }\n'+
'  const name = document.getElementById("coName").value.trim();\n'+
'  const email = document.getElementById("coEmail").value.trim();\n'+
'  const type = document.getElementById("coType").value;\n'+
'  const budget = document.getElementById("coBudget").value;\n'+
'  const desc = document.getElementById("coDesc").value.trim();\n'+
'  if (!name || !email || !desc) {\n'+
'    toast("Please fill in your name, email,and description.");\n'+
'    return;\n'+
'  }\n'+
'  const orders = DB.customOrders;\n'+
'  orders.unshift({\n'+
'    id: "CO-" + Date.now(),\n'+
'    customerId: session.id,\n'+
'    name,\n'+
'    email,\n'+
'    type,\n'+
'    budget,\n'+
'    desc,\n'+
'    image: customImageData || null,\n'+
'    date: today(),\n'+
'  });\n'+
'  DB.customOrders = orders;\n'+
'  addAdminNotif("New Custom Order Request", name + " requested a custom " + type + " (" + budget + ").");\n'+
'  const box=document.getElementById("coImagePreview");box.innerHTML="";\n'+
'  document.getElementById("coImage").value = "";\n'+
'  customImageData = null;\n'+
'  toast("Request sent! We will get back to you shortly.");\n'+
'  showPage("home");\n'+
'}\n'+
'function deleteCustomOrder(id) {\n'+
'  if (!confirm("Delete this custom order request?")) return;\n'+
'  DB.customOrders = DB.customOrders.filter(o=>o.id!==id);\n'+
'  renderAdmin();\n'+
'  toast("Request deleted.");\n'+
'}\n';
t=t.slice(0,tj)+customJs+t.slice(tj);
fs.writeFileSync('app.js',t);
console.log('PART1-DONE',t.length);
// 3b. renderCustomTable DOM-building (no quote nesting issues
const rc=''+
'function renderCustomTable() {\n'+
'  const orders = DB.customOrders;\n'+
'  const el = document.getElementById("customTable");\n'+
'  if (!el) return;\n'+
'  el.innerHTML="";\n'+
'  if (orders.length === 0) {\n'+
'    const tr=document.createElement("tr");\n'+
'    const td=document.createElement("td");\n'+
'    td.colSpan=7;\n'+
'    td.className="table-empty";\n'+
'    td.textContent="No custom requests yet";\n'+
'    tr.appendChild(td);\n'+
'    el.appendChild(tr);\n'+
'    return;\n'+
'  }\n'+
'  orders.forEach((o)=>{\n'+
'    const tr=document.createElement("tr");\n'+
'    const cells=[["name",o.name],["email",o.email],["type",o.type],["budget",o.budget],["desc",o.desc]];\n'+
'    cells.forEach((c)=>{\n'+
'      const td=document.createElement("td");\n'+
'      if (c[0]==="desc" || c[0]==="name") {\n'+
'        const b=document.createElement("strong");b.textContent=c[1];td.appendChild(b);\n'+
'      } else td.textContent=c[1];\n'+
'      tr.appendChild(td);\n'+
'    });\n'+
'    const tdImg=document.createElement("td");\n'+
'    if (o.image) {\n'+
'      const im=document.createElement("img");im.className="custom-thumb";im.src=o.image;im.alt="Reference";tdImg.appendChild(im);\n'+
'    } else tdImg.textContent="-";\n'+
'    tr.appendChild(tdImg);\n'+
'    const tdAct=document.createElement("td");\n'+
'    const btn=document.createElement("button");\n'+
'    btn.className="btn-danger";\n'+
'    btn.textContent="Delete";\n'+
'    btn.onclick=function(){deleteCustomOrder(o.id);};\n'+
'    tdAct.appendChild(btn);\n'+
'    tr.appendChild(tdAct);\n'+
'    el.appendChild(tr);\n'+
'});\n'+
'}\n';
t=t.replace(/\nfunction adminTab\(/, '\n'+rc+'function adminTab(');
t=t.replace(/(\n\}\n\nfunction adminTab\()/, '\n\n  renderCustomTable();\n}\n\nfunction adminTab(');
// 5. adminTab map includes custom
t=t.replace('customers: "adminCustomers",', 'customers: "adminCustomers",\n    custom: "adminCustom",');
// 6. placeOrder session guard
const po=t.indexOf('function placeOrder()');
const guard='function placeOrder() {\n'+
'  if (!session || session.type !== "customer") { openAuthModal(); return; }\n';
t=t.slice(0,po)+guard+t.slice(po+('function placeOrder() {\n').length);
fs.writeFileSync('app.js',t);
console.log('ALL-DONE',t.length);