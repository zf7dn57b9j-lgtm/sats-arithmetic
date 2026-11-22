/* KS2 Arithmetic V7: original, reproducible papers generated locally. */
(function(){'use strict';
function rng(seed){let s=(seed>>>0)||1;return ()=>{s^=s<<13;s^=s>>>17;s^=s<<5;return (s>>>0)/4294967296}}
function paper(seed){let R=rng(seed),ri=(a,b)=>a+Math.floor(R()*(b-a+1)),pick=a=>a[ri(0,a.length-1)],shuffle=a=>{for(let i=a.length-1;i>0;i--){let j=ri(0,i);[a[i],a[j]]=[a[j],a[i]]}return a};
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a),fr=(n,d=1)=>{let g=gcd(n,d);return [n/g,d/g]},fmt=([n,d])=>d===1?String(n):`${n}/${d}`,mix=([n,d])=>{let w=Math.floor(n/d),r=n%d;return w?`${w}${r?' '+r+'/'+d:''}`:fmt([n,d])},dec=(n,scale)=>{let s=(n/scale).toFixed(Math.round(Math.log10(scale)));return s.includes('.')?s.replace(/0+$/,'').replace(/\.$/,''):s},q=(family,question,answer,working,difficulty,marks=1)=>({family,question,answer:String(answer),answer_fraction:typeof answer==='number'?[answer,1]:String(answer).includes('/')?(()=>{let v=String(answer).split(' '),f=v.pop().split('/').map(Number);return v.length?[Number(v[0])*f[1]+f[0],f[1]]:f})():[Number(answer),1],working,difficulty,marks,method_mark:marks===2?'Check the written method against the official-style rubric; a method mark may be available.':null});
function make(f,t){let a,b,c,d,x,y,z,ans,den,whole;
switch(f){
case 'whole_add': a=ri(t<2?120:1200,t<2?850:8500);b=ri(t<2?20:150,t<2?600:2800);return q(f,`${a} + ${b} =`,a+b,[`${a} + ${b} = ${a+b}`],t+1);
case 'whole_sub': b=ri(t<2?30:250,t<2?350:2500);a=b+ri(t<2?100:800,t<2?800:7500);return q(f,`${a} − ${b} =`,a-b,[`${a} − ${b} = ${a-b}`],t+1);
case 'fact_mul':a=ri(3,12);b=ri(3,12);return q(f,`${a} × ${b} =`,a*b,[`${a} groups of ${b} = ${a*b}`],t+1);
case 'fact_div':a=ri(3,12);b=ri(3,12);return q(f,`${a*b} ÷ ${a} =`,b,[`${a} × ${b} = ${a*b}`],t+1);
case 'place':a=ri(12,950);b=pick([10,100,1000]);if(R()<.5)return q(f,`${a} × ${b} =`,a*b,[`Multiply by ${b}: ${a*b}`],t+1);return q(f,`${a*b} ÷ ${b} =`,a,[`Divide by ${b}: ${a}`],t+1);
case 'missing':a=ri(120,1800);b=ri(40,850);if(R()<.5)return q(f,`□ + ${b} = ${a+b}`,a,[`${a+b} − ${b} = ${a}`],t+1);return q(f,`${a+b} − □ = ${a}`,b,[`${a+b} − ${a} = ${b}`],t+1);
case 'whole_mul':a=ri(15,98);b=ri(3,9);return q(f,`${a} × ${b} =`,a*b,[`${a} × ${b} = ${a*b}`],t+2);
case 'whole_div':b=ri(3,12);a=ri(25,185);return q(f,`${a*b} ÷ ${b} =`,a,[`${b} × ${a} = ${a*b}`],t+2);
case 'decimal_add':a=ri(110,895);b=ri(15,375);x=dec(a,100);y=dec(b,100);return q(f,`${x} + ${y} =`,dec(a+b,100),[`Line up the decimal points.`,`${x} + ${y} = ${dec(a+b,100)}`],t+2);
case 'decimal_sub':b=ri(15,365);a=b+ri(100,975);x=dec(a,100);y=dec(b,100);return q(f,`${x} − ${y} =`,dec(a-b,100),[`Line up the decimal points.`,`${x} − ${y} = ${dec(a-b,100)}`],t+2);
case 'decimal_mul':a=ri(115,975);b=ri(3,9);x=dec(a,100);return q(f,`${x} × ${b} =`,dec(a*b,100),[`Ignore the decimal point first: ${a} × ${b} = ${a*b}`,`Restore two decimal places: ${dec(a*b,100)}`],t+3);
case 'decimal_div':b=pick([2,4,5,10]);a=ri(25,250)*b;x=dec(a,100);return q(f,`${x} ÷ ${b} =`,dec(a/b,100),[`Divide ${a} hundredths by ${b}.`,`Answer: ${dec(a/b,100)}`],t+3);
case 'fraction_add':case 'fraction_sub':den=pick(t>=3?[6,8,10,12]:[4,6,8,10]);a=ri(1,den-2);b=ri(1,den-a);if(f==='fraction_sub'){a=ri(2,den-1);b=ri(1,a-1)}ans=fr(f==='fraction_add'?a+b:a-b,den);return q(f,`${a}/${den} ${f==='fraction_add'?'+':'−'} ${b}/${den} =`,fmt(ans),[`Keep the denominator ${den} and ${f==='fraction_add'?'add':'subtract'} the numerators.`,`Simplify: ${fmt(ans)}`],t+2);
case 'fraction_unlike':den=pick([3,4,5,6,8,10]);d=pick([2,3,4,5,6]);if(den===d)d=7;a=ri(1,den-1);b=ri(1,d-1);ans=fr(a*d+b*den,den*d);return q(f,`${a}/${den} + ${b}/${d} =`,fmt(ans),[`Use common denominator ${den*d}: ${a*d}/${den*d} + ${b*den}/${den*d}`,`Simplify: ${fmt(ans)}`],t+4);
case 'fraction_of':den=pick([3,4,5,6,8,10]);a=ri(1,den-1);b=ri(3,20)*den;return q(f,`${a}/${den} of ${b} =`,b/den*a,[`${b} ÷ ${den} = ${b/den}`,`${b/den} × ${a} = ${b/den*a}`],t+3);
case 'fraction_mul':den=pick([3,4,5,6,8]);d=pick([2,3,4,5,6]);a=ri(1,den-1);b=ri(1,d-1);ans=fr(a*b,den*d);return q(f,`${a}/${den} × ${b}/${d} =`,fmt(ans),[`Multiply numerators and denominators: ${a*b}/${den*d}`,`Simplify: ${fmt(ans)}`],t+4);
case 'fraction_div':den=pick([3,4,5,6,8]);a=ri(1,den-1);b=pick([2,3,4]);ans=fr(a,den*b);return q(f,`${a}/${den} ÷ ${b} =`,fmt(ans),[`Divide by ${b} by multiplying the denominator by ${b}.`,`Simplify: ${fmt(ans)}`],t+4);
case 'mixed':den=pick([3,4,5,6,8]);d=pick([2,3,4,5,6]);a=ri(1,den-1);b=ri(1,d-1);whole=ri(1,3);c=ri(1,2);ans=fr((whole*den+a)*d+(c*d+b)*den,den*d);return q(f,`${whole} ${a}/${den} + ${c} ${b}/${d} =`,mix(ans),[`Convert to improper fractions: ${whole*den+a}/${den} + ${c*d+b}/${d}`,`Find a common denominator, add and simplify: ${mix(ans)}`],t+5);
case 'percent':a=pick(t>=3?[15,20,25,35,40,60,75]:[10,20,25,50]);b=ri(4,20)*20;return q(f,`${a}% of ${b} =`,a*b/100,[`${a}% = ${a}/100`,`${b} × ${a} ÷ 100 = ${a*b/100}`],t+3);
case 'order':a=ri(3,9);b=ri(2,9);c=ri(2,9);return q(f,`${a}² + ${b} × ${c} =`,a*a+b*c,[`${a}² = ${a*a}`,`${b} × ${c} = ${b*c}`,`Add: ${a*a+b*c}`],t+4);
case 'long_mul':a=ri(1200,4900);b=ri(13,79);return q(f,`${a} × ${b} =`,a*b,[`${a} × ${b%10} = ${a*(b%10)}`,`${a} × ${b-b%10} = ${a*(b-b%10)}`,`Add the partial products: ${a*b}`],t+5,2);
case 'long_div':b=ri(12,39);a=ri(105,295);return q(f,`${a*b} ÷ ${b} =`,a,[`Use formal division to divide ${a*b} by ${b}.`,`Check: ${b} × ${a} = ${a*b}`],t+5,2);
}}
const blocks=[['whole_add','whole_sub','fact_mul','fact_div','place','missing','whole_add','whole_mul','fact_mul'],['whole_sub','whole_div','decimal_add','missing','fraction_add','place','fact_div','decimal_sub','whole_mul'],['decimal_mul','fraction_of','percent','fraction_unlike','decimal_div','order','fraction_sub','whole_div','decimal_add'],['mixed','fraction_mul','percent','fraction_unlike','fraction_div','order','mixed','fraction_of','decimal_sub']];
let families=blocks.flatMap((b)=>shuffle([...b]));let marksSlots=[ri(13,19),ri(21,25),ri(27,31),ri(32,35)];shuffle(marksSlots);let two=['long_mul','long_div','long_mul','long_div'];marksSlots.forEach((slot,i)=>families[slot]=two[i]);
let questions=[],used=new Set();for(let i=0;i<36;i++){let t=Math.floor(i/9),candidate;for(let tries=0;tries<80;tries++){candidate=make(families[i],t);if(!used.has(candidate.question))break}used.add(candidate.question);candidate.number=i+1;questions.push(candidate)}return {seed,title:`Original KS2 arithmetic paper ${seed}`,time_minutes:30,questions,total_marks:40};}
window.makePaper=paper;window.PAPERS=[paper(2026112207)];
})();
