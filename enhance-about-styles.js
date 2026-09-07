const fs = require('fs');

// ── ENHANCE ABOUT US PAGE CSS ──
let css = fs.readFileSync('style.css', 'utf8');

// Remove old about CSS
css = css.replace(/\/\* ── ABOUT US PAGE[\s\S]*?#navUserArea\{[^\}]*\}/, '');

const enhancedAboutCSS = `

/* ── ABOUT US PAGE (ENHANCED) ── */
.about-page{max-width:900px;margin:0 auto;padding:0 2rem 4rem}
.about-hero{background:linear-gradient(135deg,var(--warm-brown) 0%,var(--terracotta) 50%,var(--rose) 100%);padding:6rem 2rem;text-align:center;margin:0 -2rem 3rem;position:relative;overflow:hidden}
.about-hero::before{content:"\\u{1F9F6}";font-size:18rem;position:absolute;right:-4rem;top:-4rem;opacity:.1;line-height:1;animation:float 6s ease-in-out infinite}
.about-hero::after{content:"\\u{1F33B}";font-size:12rem;position:absolute;left:-3rem;bottom:-3rem;opacity:.08;line-height:1;animation:float 8s ease-in-out infinite reverse}
@keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-20px) rotate(5deg)}}
.about-hero-inner{position:relative;z-index:1;max-width:700px;margin:0 auto}
.about-eyebrow{display:inline-flex;align-items:center;gap:.9rem;color:rgba(253,249,244,.8);font-size:.78rem;font-weight:500;letter-spacing:.16em;text-transform:uppercase;margin-bottom:1.6rem}
.about-eyebrow-line{display:block;width:34px;height:2px;border-radius:2px;background:rgba(253,249,244,.5)}
.about-hero h1{font-size:3.2rem;color:var(--warm-white);margin-bottom:1rem;text-shadow:0 4px 30px rgba(18,12,9,.4);animation:fadeUp .8s ease}
.about-hero p{color:rgba(253,249,244,.88);font-size:1.1rem;line-height:1.8;font-weight:300;max-width:550px;margin:0 auto;animation:fadeUp 1s ease}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.about-content{display:flex;flex-direction:column;gap:2.5rem}
.about-section{background:var(--card-bg);border:1px solid var(--border);border-radius:var(--radius);padding:2.5rem;box-shadow:var(--shadow);transition:all .3s}
.about-section:hover{transform:translateY(-4px);box-shadow:var(--shadow-hover);border-color:var(--rose)}
.about-section-icon{font-size:2.8rem;margin-bottom:1rem;display:inline-flex;align-items:center;justify-content;width:70px;height:70px;border-radius:50%;background:linear-gradient(135deg,var(--blush) 0%,var(--sage-light) 100%)}
.about-section h2{font-family:"Playfair Display",serif;font-size:1.6rem;color:var(--warm-brown);margin-bottom:1.2rem}
.about-section p{color:var(--mid);line-height:1.8;font-size:.95rem;margin-bottom:1rem}
.about-section p:last-child{margin-bottom:0}
.about-creator{display:flex;gap:2rem;align-items:flex-start;margin-top:1rem;padding:1.5rem;background:var(--cream);border-radius:var(--radius-sm)}
.creator-avatar{width:100px;height:100px;border-radius:50%;background:linear-gradient(135deg,var(--terracotta) 0%,var(--rose) 100%);display:flex;align-items:center;justify-content:center;font-size:2.8rem;flex-shrink:0;box-shadow:0 8px 30px rgba(181,96,58,.3)}
.creator-info h3{font-family:"Playfair Display",serif;font-size:1.4rem;color:var(--warm-brown);margin-bottom:.2rem}
.creator-role{color:var(--terracotta);font-size:.85rem;font-weight:600;margin-bottom:1rem;text-transform:uppercase;letter-spacing:.05em}
.creator-info p{color:var(--mid);line-height:1.7;font-size:.9rem;margin-bottom:.8rem}
.creator-links{display:flex;gap:.8rem;flex-wrap:wrap;margin-top:1rem}
.creator-links span{background:var(--warm-white);border:1px solid var(--border);border-radius:50px;padding:.4rem .9rem;font-size:.8rem;color:var(--mid);transition:all .2s}
.creator-links span:hover{background:var(--blush);border-color:var(--rose);transform:translateY(-2px)}
.values-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.2rem;margin-top:1.2rem}
.value-card{background:var(--cream);border:1px solid var(--border);border-radius:var(--radius-sm);padding:1.5rem;text-align:center;transition:all .3s}
.value-card:hover{transform:translateY(-4px);box-shadow:var(--shadow);border-color:var(--rose)}
.value-icon{font-size:2.2rem;margin-bottom:.8rem}
.value-card h4{font-family:"Playfair Display",serif;font-size:1rem;color:var(--warm-brown);margin-bottom:.4rem}
.value-card p{font-size:.82rem;color:var(--light-text);line-height:1.5}
.about-cta{text-align:center;padding:4rem 2rem;background:linear-gradient(135deg,var(--sage-light) 0%,var(--blush) 50%,var(--sage-light) 100%);border-radius:var(--radius);position:relative;overflow:hidden}
.about-cta::before{content:"\\u{1F9F6}";font-size:10rem;position:absolute;right:-2rem;top:-2rem;opacity:.08;line-height:1}
.about-cta h2{font-family:"Playfair Display",serif;font-size:2rem;color:var(--warm-brown);margin-bottom:.8rem}
.about-cta p{color:var(--mid);font-size:1rem;margin-bottom:1.5rem}
.about-cta-btns{display:flex;justify-content:center;gap:1rem;flex-wrap:wrap}
.about-cta .btn-primary{padding:1rem 2.2rem;font-size:1rem}
.about-cta .btn-secondary{background:var(--warm-white);padding:1rem 2.2rem;font-size:1rem}
#navUserArea{display:flex;align-items:center;gap:.6rem}
@media(max-width:768px){
  .about-hero{padding:4rem 1.25rem;margin:0 -1.25rem 2rem}
  .about-hero h1{font-size:2.2rem}
  .about-section{padding:1.5rem}
  .about-creator{flex-direction:column;align-items:center;text-align:center}
  .creator-links{justify-content:center}
  .values-grid{grid-template-columns:1fr}
  .about-cta{padding:2.5rem 1.25rem}
  .about-cta h2{font-size:1.5rem}
}
`;

css += enhancedAboutCSS;
fs.writeFileSync('style.css', css);
console.log('CSS_ABOUT_OK');
