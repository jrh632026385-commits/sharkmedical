import fs from 'fs';
import os from 'os';
import path from 'path';

const p = 'index.html';
let s = fs.readFileSync(p, 'utf8');

if (!s.includes('image-loader.js')) {
  s = s.replace(
    '<script src="data/system-icons.js"></script>',
    '<script src="data/system-icons.js"></script>\n<script src="/image-loader.js" defer></script>'
  );
}

s = s.replace(
  `function bindImgFallback(img){
  if(!img||img.dataset.fallbackBound)return;
  img.dataset.fallbackBound='1';
  img.addEventListener('error',function(){`,
  `function bindImgProxyFallback(img){
  if(!img||img.dataset.fallbackBound)return;
  img.dataset.fallbackBound='1';
  img.addEventListener('error',function(){`
);

s = s.replace(
  `function bindImgFallbacks(root){
  (root||document).querySelectorAll('img[src]').forEach(bindImgFallback);
}`,
  `function bindImgFallbacks(root){
  (root||document).querySelectorAll('img[src],img[data-src]').forEach(bindImgProxyFallback);
}`
);

s = s.replace(
  `function bindImgFallback(root){
  (root||document).querySelectorAll('img.dc-radiograph,img.gal-crop-img').forEach(img=>{`,
  `function bindGallerySlideFallback(root){
  (root||document).querySelectorAll('img.dc-radiograph,img.gal-crop-img').forEach(img=>{`
);

s = s.replace(
  `  bindImgFallback(atlasContainer);
  initGalleries(atlasContainer);
  initImageAttributions(atlasContainer);
  bindMobileAttribBars(atlasContainer);
  observeReveals();`,
  `  rewriteImgUrlsToProxy(atlasContainer,360);
  bindGallerySlideFallback(atlasContainer);
  bindImgFallbacks(atlasContainer);
  initGalleries(atlasContainer);
  initImageAttributions(atlasContainer);
  bindMobileAttribBars(atlasContainer);
  if(window.sharkLazyLoadImages)window.sharkLazyLoadImages(atlasContainer);
  observeReveals();`
);

s = s.replace(
  `  bindImgFallback(modalScroll);
  initGalleries(modalScroll);
  initImageAttributions(modalScroll);`,
  `  rewriteImgUrlsToProxy(modalScroll,960);
  bindGallerySlideFallback(modalScroll);
  bindImgFallbacks(modalScroll);
  initGalleries(modalScroll);
  initImageAttributions(modalScroll);
  if(window.sharkLazyLoadImages)window.sharkLazyLoadImages(modalScroll);`
);

s = s.replace(
  `  const src=galleryImgSrc(item,w);
  if(item.crop){
    return \`<div class="gal-crop-wrap gal-slide\${i===0?' active':''}" data-index="\${i}" aria-hidden="\${i?'true':'false'}"><img class="\${cls} gal-crop-img" style="\${galleryCropImgStyle(item.crop)}" src="\${src}" alt="\${alt}" loading="lazy" data-fallback-type="\${opts.type||''}" data-index="\${i}"></div>\`;
  }
  return \`<img class="gal-slide \${cls}" src="\${src}" alt="\${alt}" loading="lazy" data-fallback-type="\${opts.type||''}" data-index="\${i}" aria-hidden="\${i?'true':'false'}">\`;`,
  `  const src=galleryImgSrc(item,w);
  const lazy=opts.lazy&&i>0;
  const srcAttr=lazy?'data-src="'+src+'" src=""':'src="'+src+'"';
  if(item.crop){
    return \`<div class="gal-crop-wrap gal-slide\${i===0?' active':''}" data-index="\${i}" aria-hidden="\${i?'true':'false'}"><img class="\${cls} gal-crop-img" style="\${galleryCropImgStyle(item.crop)}" \${srcAttr} alt="\${alt}" loading="lazy" decoding="async" data-fallback-type="\${opts.type||''}" data-index="\${i}"></div>\`;
  }
  return \`<img class="gal-slide \${cls}" \${srcAttr} alt="\${alt}" loading="lazy" decoding="async" data-fallback-type="\${opts.type||''}" data-index="\${i}" aria-hidden="\${i?'true':'false'}">\`;`
);

s = s.replace(
  '${renderVisual(d.type,d.title)}',
  '${renderVisual(d.type,d.title,{width:360,lazy:true})}'
);

const tmp = path.join(os.tmpdir(), `shark-index-perf-${process.pid}.html`);
fs.writeFileSync(tmp, s);
fs.copyFileSync(tmp, p);
fs.unlinkSync(tmp);
console.log('index.html image perf patched');
