import {readFile,writeFile} from 'node:fs/promises';
import {render,pageInfo} from '../.prerender/prerender.js';
const template=await readFile('dist/index.html','utf8');
const origin='https://justinwessels.com';
const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
for(const [path,info] of Object.entries(pageInfo)){
 const url=origin+(path==='/'?'/':path);
 const graph=[{'@type':'Person','@id':origin+'/#person',name:'Justin Wessels',url:origin,jobTitle:'Product builder, developer and founder',email:'hello@justinwessels.com',sameAs:['https://www.linkedin.com/in/justinwessels/','https://github.com/jjwprotozoa'],worksFor:[{'@id':'https://fluidinvestmentgroup.com/#organization'},{'@id':'https://axisinnovationgroup.co.za/#organization'}]},{'@type':'WebSite','@id':origin+'/#website',url:origin,name:'Justin Wessels',publisher:{'@id':origin+'/#person'}}];
 if(path!=='/'&&path!=='/404')graph.push({'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:origin+'/'},{'@type':'ListItem',position:2,name:info.title.split(' | ')[0],item:url}]});
 if(path==='/kids-call-home')graph.push({'@type':'Article',headline:info.title,author:{'@id':origin+'/#person'},about:{'@type':'SoftwareApplication',name:'Kids Call Home',url:'https://kidscallhome.com',operatingSystem:'iOS, Android, Web, Fire OS, Windows',applicationCategory:'CommunicationApplication',publisher:{'@id':'https://fluidinvestmentgroup.com/#organization'}}});
 const meta=`<title>${esc(info.title)}</title><meta name="description" content="${esc(info.description)}"><link rel="canonical" href="${url}"><meta property="og:type" content="${path==='/kids-call-home'?'article':'website'}"><meta property="og:title" content="${esc(info.title)}"><meta property="og:description" content="${esc(info.description)}"><meta property="og:url" content="${url}"><meta property="og:site_name" content="Justin Wessels"><meta name="twitter:card" content="summary"><meta name="twitter:title" content="${esc(info.title)}"><meta name="twitter:description" content="${esc(info.description)}">${path==='/404'?'<meta name="robots" content="noindex">':''}<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':graph}).replaceAll('<','\\u003c')}</script>`;
 const html=template.replace(/<script type="module"[^>]*>[\s\S]*?<\/script>/g,'').replace(/<link rel="modulepreload"[^>]*>/g,'').replace('</body>','<script src="/site.js" defer></script></body>').replace(/<title>[\s\S]*?<\/title>/,'').replace(/<meta\s+name="description"[\s\S]*?>/,'').replace('</head>',meta+'</head>').replace('<div id="root"></div>',`<div id="root">${render(path)}</div>`);
 const target=path==='/'?'dist/index.html':path==='/404'?'dist/404.html':`dist${path}.html`;
 
 await writeFile(target,html);
}
await writeFile('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+Object.keys(pageInfo).filter(p=>p!=='/404').map(p=>`<url><loc>${origin}${p}</loc></url>`).join('')+'</urlset>');
await writeFile('dist/_redirects','/about /journey 301\n/writing /evidence 301\n');
console.log('Prerendered '+Object.keys(pageInfo).length+' routes with metadata and structured data.');
