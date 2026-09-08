const titles={products:"Products",users:"Customers",orders:"Orders",payments:"Payments",reviews:"Reviews",audit_log:"Audit Log"};
let current="products";
const status=document.getElementById("status");
async function health(){
  try{const r=await fetch("/api/health"); if(!r.ok) throw 0; status.textContent="● Database connected"; status.style.background="#e9f7ef";}
  catch(e){status.textContent="● Database connection failed"; status.style.background="#fdecec";}
}
async function load(name){
  current=name; document.getElementById("table-title").textContent=titles[name];
  const msg=document.getElementById("message"), th=document.getElementById("thead"), tb=document.getElementById("tbody");
  msg.textContent="Loading…"; msg.className=""; th.innerHTML=""; tb.innerHTML="";
  try{
    const r=await fetch("/api/table/"+name); const data=await r.json();
    if(!r.ok) throw new Error(data.error||"Request failed");
    if(!data.length){msg.textContent="No records found.";return;}
    const cols=Object.keys(data[0]);
    th.innerHTML="<tr>"+cols.map(c=>`<th>${c}</th>`).join("")+"</tr>";
    tb.innerHTML=data.map(row=>"<tr>"+cols.map(c=>`<td>${row[c]??""}</td>`).join("")+"</tr>").join("");
    msg.textContent=`Showing ${data.length} record(s).`;
  }catch(e){msg.textContent=e.message;msg.className="error";}
}
document.querySelectorAll("#tabs button").forEach(b=>b.addEventListener("click",()=>load(b.dataset.table)));
document.getElementById("refresh").addEventListener("click",()=>load(current));
health(); load("products");

document.querySelectorAll("#query-modules button").forEach(b =>
  b.addEventListener("click", () => showQuery(b.dataset.module))
);

document.getElementById("queries-button").addEventListener("click", () => {
  document.getElementById("data-panel").style.display = "none";
  document.getElementById("queries-panel").style.display = "block";
});

document.querySelectorAll("#tabs button[data-table]").forEach(b =>
  b.addEventListener("click", () => {
    document.getElementById("data-panel").style.display = "block";
    document.getElementById("queries-panel").style.display = "none";
  })
);
