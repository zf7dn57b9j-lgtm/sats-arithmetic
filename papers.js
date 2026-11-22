/* KS2 Arithmetic V8.1 — original SATs-style practice questions. No official endorsement. */
(function(){'use strict';
function rng(seed){let s=(seed>>>0)||1;return ()=>{s^=s<<13;s^=s>>>17;s^=s<<5;return (s>>>0)/4294967296}}
function paper(seed){const R=rng(seed),ri=(a,b)=>a+Math.floor(R()*(b-a+1)),pick=a=>a[ri(0,a.length-1)],shuffle=a=>{for(let i=a.length-1;i>0;i--){let j=ri(0,i);[a[i],a[j]]=[a[j],a[i]]}return a};
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a),fr=(n,d=1)=>{let g=gcd(n,d);return [n/g,d/g]},fmt=([n,d])=>d===1?String(n):`${n}/${d}`,dec=(n,scale)=>{let s=(n/scale).toFixed(Math.round(Math.log10(scale)));return s.includes('.')?s.replace(/0+$/,'').replace(/\.$/,''):s};
function q(f,question,answer,working,marks=1){let val=String(answer),m=val.match(/^(-?\d+)\/([1-9]\d*)$/),af=m?[Number(m[1]),Number(m[2])]:[Number(val),1];return {family:f,question,answer:val,answer_fraction:af,working,marks,method_mark:marks===2?'Review written method if final answer is incorrect.':null}}
function make(f){let a,b,c,d,n,x,y,v,ans;
switch(f){
case 'fact_mul':a=ri(3,12);b=ri(3,12);return q(f,`${a} × ${b} =`,a*b,[`${a} × ${b} = ${a*b}`]);
case 'fact_div':a=ri(3,12);b=ri(3,12);return q(f,`${a*b} ÷ ${a} =`,b,[`${a} × ${b} = ${a*b}`]);
case 'add3':a=ri(110,790);b=ri(110,790);return q(f,`${a} + ${b} =`,a+b,[`Add the hundreds, tens and ones: ${a+b}`]);
case 'sub3':b=ri(110,680);a=b+ri(130,790);return q(f,`${a} − ${b} =`,a-b,[`Subtract using place value: ${a-b}`]);
case 'add4':a=ri(1200,8500);b=ri(380,3900);return q(f,`${a} + ${b} =`,a+b,[`Align the place-value columns and add: ${a+b}`]);
case 'sub4':b=ri(550,4600);a=b+ri(700,6300);return q(f,`${a} − ${b} =`,a-b,[`Align the place-value columns and subtract: ${a-b}`]);
case 'mul2':a=ri(13,98);b=ri(3,9);return q(f,`${a} × ${b} =`,a*b,[`${a} × ${b} = ${a*b}`]);
case 'divsmall':b=ri(3,12);a=ri(13,89);return q(f,`${a*b} ÷ ${b} =`,a,[`Check with multiplication: ${a} × ${b} = ${a*b}`]);
case 'place':a=ri(23,995);b=pick([10,100,1000]);return R()<.5?q(f,`${a} × ${b} =`,a*b,[`Shift digits ${String(b).length-1} place(s) left: ${a*b}`]):q(f,`${a*b} ÷ ${b} =`,a,[`Shift digits ${String(b).length-1} place(s) right: ${a}`]);
case 'missing':a=ri(220,3800);b=ri(65,1100);return R()<.5?q(f,`□ + ${b} = ${a+b}`,a,[`${a+b} − ${b} = ${a}`]):q(f,`${a+b} − □ = ${a}`,b,[`${a+b} − ${a} = ${b}`]);
case 'decimal_add':a=ri(125,899);b=ri(38,680);x=dec(a,100);y=dec(b,100);return q(f,`${x} + ${y} =`,dec(a+b,100),['Line up the decimal points.',`${x} + ${y} = ${dec(a+b,100)}`]);
case 'decimal_sub':b=ri(30,570);a=b+ri(125,890);x=dec(a,100);y=dec(b,100);return q(f,`${x} − ${y} =`,dec(a-b,100),['Line up the decimal points.',`${x} − ${y} = ${dec(a-b,100)}`]);
case 'decimal_mul':a=ri(112,897);b=ri(3,9);x=dec(a,100);return q(f,`${x} × ${b} =`,dec(a*b,100),[`${a} × ${b} = ${a*b} hundredths`,`Answer: ${dec(a*b,100)}`]);
case 'decimal_div':b=pick([2,4,5,8]);a=ri(25,145)*b;x=dec(a,100);return q(f,`${x} ÷ ${b} =`,dec(a/b,100),[`Divide ${a} hundredths by ${b}.`,`Answer: ${dec(a/b,100)}`]);
case 'decimal_place':a=ri(125,875);b=pick([10,100]);x=dec(a,100);return q(f,`${x} × ${b} =`,dec(a*b,100),[`Multiplying by ${b} shifts digits left.`,`Answer: ${dec(a*b,100)}`]);
case 'fraction_same':d=pick([4,5,6,8,10,12]);a=ri(2,d-1);b=ri(1,a-1);if(R()<.5){ans=fr(a+b,d);return q(f,`${a}/${d} + ${b}/${d} =`,fmt(ans),[`Add the numerators: ${a+b}/${d}`,`Simplify: ${fmt(ans)}`])}ans=fr(a-b,d);return q(f,`${a}/${d} − ${b}/${d} =`,fmt(ans),[`Subtract the numerators: ${a-b}/${d}`,`Simplify: ${fmt(ans)}`]);
case 'fraction_related':{let pairs=[[4,2],[6,3],[8,4],[10,5],[12,6],[12,4],[12,3],[16,8],[18,6],[21,7]];let [den,small]=pick(pairs.slice(0,7).concat(R()<.12?pairs.slice(7):[]));let ratio=den/small; a=ri(1,Math.min(den-1,7));c=ri(1,Math.min(small-1,4));if(a+c*ratio>den){a=ri(1,Math.max(1,den-c*ratio))}ans=fr(a+c*ratio,den);return q(f,`${a}/${den} + ${c}/${small} =`,fmt(ans),[`Convert ${c}/${small} to ${c*ratio}/${den}.`,`Add and simplify: ${fmt(ans)}`]);}
case 'fraction_unlike':{let pairs=[[3,4],[4,6],[5,8],[6,8],[8,12],[4,5],[7,21],[8,16],[6,18]];let [den,other]=pick(pairs.slice(0,6).concat(R()<.12?pairs.slice(6):[]));a=ri(1,Math.min(den-1,5));c=ri(1,Math.min(other-1,5));ans=fr(a*other+c*den,den*other);return q(f,`${a}/${den} + ${c}/${other} =`,fmt(ans),[`Use a common denominator to add the fractions.`,`Simplify: ${fmt(ans)}`]);}
case 'fraction_of':{let den=pick([2,3,4,5,6,8,10,12]);a=ri(1,Math.min(den-1,5));b=ri(5,28)*den;return q(f,`${a}/${den} of ${b} =`,b/den*a,[`${b} ÷ ${den} = ${b/den}`,`${b/den} × ${a} = ${b/den*a}`]);}
case 'fraction_mul':{let den=pick([3,4,5,6,8,10]),other=pick([2,3,4,5,6,8]);a=ri(1,Math.min(den-1,4));c=ri(1,Math.min(other-1,4));ans=fr(a*c,den*other);return q(f,`${a}/${den} × ${c}/${other} =`,fmt(ans),[`Multiply numerators and denominators: ${a*c}/${den*other}`,`Simplify: ${fmt(ans)}`]);}
case 'fraction_div':{let den=pick([3,4,5,6,8,10]);a=ri(1,Math.min(den-1,4));b=pick([2,3,4]);ans=fr(a,den*b);return q(f,`${a}/${den} ÷ ${b} =`,fmt(ans),[`Divide by ${b} by multiplying the denominator by ${b}.`,`Simplify: ${fmt(ans)}`]);}
case 'percent':a=pick([10,20,25,30,40,50,75]);b=ri(4,28)*20;return q(f,`${a}% of ${b} =`,a*b/100,[`${a}% = ${a}/100`,`${b} × ${a} ÷ 100 = ${a*b/100}`]);
case 'percent_hard':a=pick([15,35,45,65]);b=pick([200,400,600,800]);return q(f,`${a}% of ${b} =`,a*b/100,[`Find 10% and 5% of ${b}, then combine them.`,`Answer: ${a*b/100}`]);
case 'order':a=ri(3,12);b=ri(2,9);c=ri(3,9);return q(f,`${a}² + ${b} × ${c} =`,a*a+b*c,[`Calculate ${a}² = ${a*a} and ${b} × ${c} = ${b*c}.`,`Add: ${a*a+b*c}`]);
case 'brackets':a=ri(15,65);b=ri(6,29);c=ri(3,9);return q(f,`(${a} + ${b}) × ${c} =`,(a+b)*c,[`Brackets first: ${a+b}.`,`Then multiply by ${c}: ${(a+b)*c}`]);
case 'square_cube':a=ri(4,12);b=ri(2,5);return q(f,`${a}² − ${b}³ =`,a*a-b*b*b,[`${a}² = ${a*a}; ${b}³ = ${b*b*b}.`,`Subtract: ${a*a-b*b*b}`]);
case 'large_div':b=ri(12,29);a=ri(110,390);return q(f,`${a*b} ÷ ${b} =`,a,[`Use division, then check ${a} × ${b} = ${a*b}.`]);
case 'long_mul':a=ri(1234,6985);b=ri(23,87);if(b%10===0)b++;return q(f,`${a} × ${b} =`,a*b,[`${a} × ${b%10} = ${a*(b%10)}`,`${a} × ${b-b%10} = ${a*(b-b%10)}`,`Add: ${a*b}`],2);
case 'long_div':b=ri(13,39);a=ri(123,396);return q(f,`${a*b} ÷ ${b} =`,a,[`Use formal division to calculate ${a*b} ÷ ${b}.`,`Check: ${a} × ${b} = ${a*b}`],2);
}}
// Every paper follows a balanced 36-question blueprint. Harder skills occur late,
// but no family repeats consecutively and the final 8 include substantial calculation.
const blueprint=[
['fact_mul','add3','missing','fact_div','sub3','place','mul2','add3'],
['sub4','divsmall','decimal_add','missing','fraction_same','add4','place','decimal_sub'],
['fraction_of','decimal_mul','percent','fraction_related','decimal_div','mul2','fraction_same','sub4'],
['percent_hard','fraction_unlike','decimal_mul','order','fraction_mul','decimal_sub','fraction_div','brackets','large_div','fraction_of','square_cube','fraction_related']
];
let families=blueprint.flatMap(b=>shuffle([...b]));
// Four genuine written-method tasks, spaced across the middle and latter sections.
const slots=[ri(17,20),ri(23,26),ri(28,31),ri(33,35)];
const method=['long_mul','long_div','long_mul','long_div'];shuffle(method);slots.forEach((s,i)=>families[s]=method[i]);
// Repair neighbouring repeated families without moving method-mark questions.
const locked=new Set(slots);for(let i=1;i<families.length;i++)if(families[i]===families[i-1]){for(let j=i+1;j<families.length;j++){if(locked.has(i)||locked.has(j)||families[j]===families[i-1]||(j+1<families.length&&families[i]===families[j+1])||(j>i+1&&families[j]===families[j-1]))continue;[families[i],families[j]]=[families[j],families[i]];break}}
// Preserve the blueprint's late-paper mix without introducing a repeated family by a forced swap.
let questions=[],used=new Set();for(let i=0;i<36;i++){let candidate;for(let tries=0;tries<120;tries++){candidate=make(families[i]);if(!used.has(candidate.question))break}if(!candidate)throw Error('Unknown question family: '+families[i]);used.add(candidate.question);candidate.number=i+1;questions.push(candidate)}return {seed,title:`Original KS2 arithmetic paper ${seed}`,time_minutes:30,questions,total_marks:40}}
window.makePaper=paper;window.PAPERS=[paper(2026112208)];
})();
