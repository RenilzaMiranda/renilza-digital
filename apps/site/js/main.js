(function(){
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var doc = document.documentElement;
  document.getElementById('yr').textContent = new Date().getFullYear();

  var top = document.getElementById('top');
  var onScroll = function(){ top.classList.toggle('scrolled', window.scrollY > 24); };
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

  var burger = document.getElementById('burger'), nav = document.getElementById('nav');
  burger.addEventListener('click', function(){ nav.classList.toggle('open'); });
  nav.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ nav.classList.remove('open'); }); });

  function applyPlaceholders(lang){
    document.querySelectorAll('[data-ph-pt]').forEach(function(el){ el.placeholder = el.getAttribute('data-ph-'+lang) || el.placeholder; });
    document.querySelectorAll('option[data-pt]').forEach(function(op){ op.textContent = op.getAttribute('data-'+lang) || op.textContent; });
  }
  function setLang(lang){
    doc.setAttribute('data-lang', lang);
    doc.lang = (lang === 'en') ? 'en' : 'pt-BR';
    document.querySelectorAll('.lang button').forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-setlang') === lang); });
    applyPlaceholders(lang);
    try{ localStorage.setItem('renilza-lang', lang); }catch(e){}
  }
  document.querySelectorAll('.lang button').forEach(function(b){ b.addEventListener('click', function(){ setLang(b.getAttribute('data-setlang')); }); });
  function detectLang(){
    var saved = null; try{ saved = localStorage.getItem('renilza-lang'); }catch(e){}
    if(saved === 'pt' || saved === 'en') return saved;
    var langs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || 'pt'];
    for(var i=0;i<langs.length;i++){
      var code = String(langs[i]).toLowerCase();
      if(code.indexOf('pt') === 0) return 'pt';
      if(code.indexOf('en') === 0) return 'en';
    }
    return 'pt';
  }
  setLang(detectLang());

  function runCount(el){
    if(reduce) return;
    var target = parseFloat(el.getAttribute('data-count')); if(isNaN(target)) return;
    var isThousand = target >= 1000, dur = 1600, start = null;
    function fmt(v){ return isThousand ? Math.round(v).toLocaleString('pt-BR') : Math.round(v).toString(); }
    function tick(ts){ if(!start) start = ts; var p = Math.min((ts-start)/dur,1); var eased = 1-Math.pow(1-p,4); el.textContent = fmt(target*eased); if(p<1){requestAnimationFrame(tick);}else{el.textContent = fmt(target);} }
    el.textContent = fmt(0); requestAnimationFrame(tick);
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting) return;
      e.target.classList.add('in');
      if(e.target.hasAttribute('data-count-root') || e.target.querySelector('[data-count]')){ e.target.querySelectorAll('[data-count]').forEach(runCount); }
      io.unobserve(e.target);
    });
  }, {threshold:.14, rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal, .stagger').forEach(function(el){ io.observe(el); });

  function heroIn(){ var hc=document.getElementById('heroCopy'); if(hc) hc.classList.add('in'); var hp=document.querySelector('.hero-photo'); if(hp) hp.classList.add('in'); }
  if(document.readyState==='complete'){ setTimeout(heroIn,80); } else { window.addEventListener('load', function(){ setTimeout(heroIn,80); }); }

  function encodeForm(formEl){
    var data = new FormData(formEl);
    var pairs = [];
    data.forEach(function(value, key){ pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value)); });
    return pairs.join('&');
  }
  var form = document.getElementById('leadForm'), msg = document.getElementById('formMsg');
  form.addEventListener('submit', function(ev){
    ev.preventDefault();
    var lang = doc.getAttribute('data-lang');
    var nome=(document.getElementById('nome').value||'').trim(), email=(document.getElementById('email').value||'').trim();
    msg.className='form-msg';
    if(!nome||!email){ msg.textContent = lang==='en'?'Please fill in at least your name and e-mail.':'Preencha ao menos nome e e-mail.'; msg.classList.add('show','err'); return; }
    var btn=form.querySelector('button[type=submit]'), btnHtml=btn.innerHTML;
    btn.disabled = true; btn.textContent = lang==='en'?'Sending…':'Enviando…';
    fetch('/', {method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body:encodeForm(form)}).then(function(r){
      if(!r.ok){ throw new Error('fail'); }
      msg.textContent = lang==='en'?(nome.split(' ')[0]+', your application has been sent. Renilza will reach out personally.'):(nome.split(' ')[0]+', sua aplicação foi enviada. Renilza retornará pessoalmente.');
      msg.classList.add('show'); form.reset();
    }).catch(function(){ msg.textContent = lang==='en'?'Something went wrong. Please try again or write on Instagram.':'Algo deu errado. Tente novamente ou chame no Instagram.'; msg.classList.add('show','err'); }).finally(function(){ btn.disabled=false; btn.innerHTML=btnHtml; });
  });
})();
