(function(){
  const C = window.GYM_CONFIG;
  const $ = (s,r=document)=>r.querySelector(s);
  const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
  function pathIs(page){
    return location.pathname.endsWith(page) || (page==="index.html" && (location.pathname.endsWith("/")||location.pathname.endsWith("index.html")));
  }
  function header(){
    const nav=C.nav.map(([n,u])=>`<a href="${u}" class="${pathIs(u)?'active':''}">${n}</a>`).join("");
    return `<div class="topbar"><div class="container topbar-inner"><span>📍 ${C.city}, ${C.region}</span><span>☎ ${C.phone} &nbsp;•&nbsp; ${C.hoursText}</span></div></div>
    <header class="header"><div class="container nav"><a class="brand" href="index.html" aria-label="${C.name} home">${C.shortName}<span> Gym</span></a><button class="menu-toggle" aria-label="Open navigation" aria-expanded="false">☰</button><nav class="menu">${nav}<a class="btn btn-primary" href="free-trial.html">Free Trial</a></nav></div></header>`;
  }
  function footer(){
    const links=C.nav.slice(0,6).map(([n,u])=>`<li><a href="${u}">${n}</a></li>`).join("");
    return `<footer class="footer"><div class="container footer-grid"><div><div class="brand">${C.shortName}<span> Gym</span></div><p>${C.description}</p><div class="hero-actions"><a class="btn btn-primary" href="${C.phoneHref}">Call Gym</a><a class="btn btn-whatsapp" href="${C.whatsappHref}" target="_blank" rel="noopener">WhatsApp</a></div></div><div><h3>Explore</h3><ul>${links}</ul></div><div><h3>Contact</h3><ul><li>${C.address}</li><li><a href="${C.phoneHref}">${C.phone}</a></li><li><a href="mailto:${C.email}">${C.email}</a></li></ul></div></div><div class="container footer-bottom">© ${new Date().getFullYear()} ${C.name}. All rights reserved.</div></footer>
    <div class="float-actions"><a class="float-wa" href="${C.whatsappHref}" target="_blank" rel="noopener" aria-label="WhatsApp">WA</a><a class="float-call" href="${C.phoneHref}" aria-label="Call">☎</a></div>`;
  }
  function base(pageTitle, description){
    document.title=pageTitle;
    const md=document.querySelector('meta[name="description"]'); if(md) md.content=description;
    const og=document.querySelector('meta[property="og:title"]'); if(og) og.content=pageTitle;
    const ogd=document.querySelector('meta[property="og:description"]'); if(ogd) ogd.content=description;
    const img=document.querySelector('meta[property="og:image"]'); if(img) img.content=new URL(C.images.hero,location.href).href;
    $("#site-header").innerHTML=header(); $("#site-footer").innerHTML=footer();
    const toggle=$(".menu-toggle"); const menu=$(".menu");
    toggle&&toggle.addEventListener("click",()=>{const open=menu.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));});
  }
  function serviceCards(){return C.services.map(x=>`<article class="card"><div class="icon">${x.icon}</div><h3>${x.name}</h3><p>${x.text}</p><a class="text-link" href="contact.html?service=${encodeURIComponent(x.name)}">Ask about ${x.name} →</a></article>`).join("")}
  function programCards(){return C.programs.map(x=>`<article class="card"><h3>${x.name}</h3><p>${x.text}</p><a class="btn btn-outline" style="margin-top:18px" href="free-trial.html">Discuss your goal →</a></article>`).join("")}
  function faqItems(){return C.faqs.map(x=>`<details><summary>${x.q}</summary><p>${x.a}</p></details>`).join("")}
  function schema(){
    const ld={"@context":"https://schema.org","@type":"HealthClub","name":C.name,"description":C.description,"telephone":C.phone,"email":C.email,
      "address":{"@type":"PostalAddress","streetAddress":C.streetAddress,"addressLocality":C.city,"addressRegion":C.state,"postalCode":C.postalCode,"addressCountry":C.country},
      "url":location.href,"image":[new URL(C.images.hero,location.href).href]};
    const s=document.createElement("script");s.type="application/ld+json";s.textContent=JSON.stringify(ld);document.head.appendChild(s);
  }
  window.GymSite={C,$,$$,header,footer,base,serviceCards,programCards,faqItems,schema};
})();