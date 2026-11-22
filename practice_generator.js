/* Original SATs practice question generators V3. No changes to approved fixed papers. */
(function(){'use strict';
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1)), P=a=>a[R(0,a.length-1)], N=x=>Number(x.toFixed(9)).toString(), gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a), F=(a,b)=>{let g=gcd(a,b);return (b/g===1)?String(a/g):`${a/g}/${b/g}`};
function make(s,stage){
 let id=s.id,a,b,c,d,k,v,t,ans,steps=[],family=P(s.families||['practice']);
 const small=stage===0,hard=stage===2, den=()=>P(small?[2,3,4,5,8]:[2,3,4,5,6,8,10,12]);
 const fmt=x=>N(x), Q=(text,value,work,marks=1)=>({family,question:text,answer:typeof value==='string'?value:fmt(value),answer_fraction:[typeof value==='number'?value:ans,1],working:Array.isArray(work)?work:[work],marks,difficulty:stage+1,practice_section_ids:[id]});
 // Fractions are returned as exact numerator/denominator, never rounded.
 const frac=(text,n,dd,work)=>{let g=gcd(n,dd);return {family,question:text,answer:F(n,dd),answer_fraction:[n/g,dd/g],working:[work],marks:1,difficulty:stage+1,practice_section_ids:[id]}};
 switch(id){
 case 'S01': case 'S02': {
  let digits=small?3:hard?5:4,low=10**(digits-1),high=10**digits-1;
  a=R(low,high);b=R(small?20:low,small?400:high);if(id==='S02'&&b>a)[a,b]=[b,a];
  let op=id==='S01'?'+':'−';ans=id==='S01'?a+b:a-b;
  if(hard&&R(0,3)===0){let x=R(100,999);return Q(`□ ${op} ${b} = ${ans}`,a,`Use the inverse operation to find the missing number.`)}
  return Q(`${a} ${op} ${b} =`,ans,`Align place-value columns and ${id==='S01'?'add':'subtract'}.`);
 }
 case 'S03': {
  let op=P(['+','−','×','÷']);a=R(small?12:100,hard?1500:500);b=op==='×'||op==='÷'?R(2,hard?24:12):R(10,hard?900:300);
  if(op==='÷'){ans=a;return Q(`□ ÷ ${b} = ${a}`,a*b,`Multiply ${a} by ${b} to find the missing number.`)}
  if(op==='×'){return Q(`□ × ${b} = ${a*b}`,a,`Divide ${a*b} by ${b}.`)}
  ans=op==='+'?a+b:a-b;return Q(`□ ${op} ${b} = ${ans}`,a,`Use the inverse operation.`);
 }
 case 'S04':case 'S05':{
  let dp=small?1:hard?3:2,scale=10**dp;a=R(15,hard?12000:1800)/scale;b=R(12,hard?9000:1100)/scale;
  if(id==='S05'&&a<b)[a,b]=[b,a];ans=id==='S04'?a+b:a-b;
  return Q(`${fmt(a)} ${id==='S04'?'+':'−'} ${fmt(b)} =`,ans,`Align decimal points and calculate.`);
 }
 case 'S06':case 'S11':{
  a=R(2,12);b=R(2,12);ans=a*b;
  if(id==='S11')return Q(`${ans} ÷ ${a} =`,b,`${a} × ${b} = ${ans}.`);
  return Q(`${a} × ${b} =`,ans,`Recall the ${a} times table.`);
 }
 case 'S07':case 'S26':{
  k=10**P([1,2,3]);let op=P(['×','÷']),dp=small?0:hard?R(1,3):1;
  a=R(12,9999)/10**dp;ans=op==='×'?a*k:a/k;
  if(hard&&R(0,2)===0)return Q(`□ ${op} ${k} = ${fmt(ans)}`,a,`Use the inverse operation.`);
  return Q(`${fmt(a)} ${op} ${k} =`,ans,`Use place value to multiply or divide by ${k}.`);
 }
 case 'S08':{
  a=R(small?12:hard?1000:100,small?99:hard?9999:999);b=R(3,9);
  return Q(`${a} × ${b} =`,a*b,`Use short multiplication, carrying where necessary.`);
 }
 case 'S09':{
  a=R(small?120:hard?2000:500,small?999:hard?8999:3999);b=R(small?12:hard?35:20,small?29:hard?89:59);
  return Q(`${a} × ${b} =`,a*b,[`Calculate ${a} × ${b%10} and ${a} × ${Math.floor(b/10)*10}.`,`Add the partial products.`],2);
 }
 case 'S10':{
  a=R(12,hard?999:199)/(hard?100:10);b=R(small?2:3,hard?19:9);ans=a*b;
  return Q(`${fmt(a)} × ${b} =`,ans,`Multiply as whole numbers then place the decimal point.`);
 }
 case 'S13':case 'S14':case 'S15':{
  b=id==='S13'?R(2,9):id==='S14'?P([20,30,40,50,60,70,80,90]):R(small?12:hard?21:15,hard?39:29);
  ans=R(small?12:hard?120:40,small?90:hard?450:200);a=ans*b;
  return Q(`${a} ÷ ${b} =`,ans,`Check using ${ans} × ${b} = ${a}.`,id==='S15'?2:1);
 }
 case 'S16':{
  b=hard?P([0.2,0.4,0.5,1.2,1.5,2.5]):R(2,9);ans=R(small?12:hard?120:30,small?99:hard?999:250)/(hard?10:10);
  a=N(ans*b);return Q(`${a} ÷ ${fmt(b)} =`,ans,`Scale the dividend and divisor equally if necessary, then divide.`);
 }
 case 'S17':{
  d=den();b=R(1,d-1);k=R(small?3:hard?12:6,hard?45:25);a=d*k;
  return Q(`${b}/${d} of ${a} =`,b*k,`Divide ${a} by ${d}, then multiply by ${b}.`);
 }
 case 'S18':{
  d=den();b=R(1,d-1);k=R(2,hard?9:5);
  return frac(`${b}/${d} = □/${d*k}`,b*k,d*k,`Multiply numerator and denominator by ${k}.`);
 }
 case 'S19':case 'S20':{
  d=den();a=R(1,d-1);b=R(1,d-1);if(id==='S20'&&a<b)[a,b]=[b,a];
  return frac(`${a}/${d} ${id==='S19'?'+':'−'} ${b}/${d} =`,id==='S19'?a+b:a-b,d,`Keep the denominator ${d}; ${id==='S19'?'add':'subtract'} the numerators.`);
 }
 case 'S21':case 'S22':{
  // Distinct difficulty bands: multiples, coprime denominators, improper and mixed-number results.
  const add=id==='S21', variant=small?R(0,1):hard?R(2,4):R(0,3);
  let x,y,u,v,left,right,top,bottom,explain;
  if(variant===0){ // One denominator is a multiple of the other.
    x=P([2,3,4,5,6]);y=x*P([2,3]);u=R(1,x-1);v=R(1,y-1);
  }else if(variant===1){ // An unsimplified equivalent fraction is intentional.
    x=P([4,6,8,10,12]);y=P([2,3,4,5,6]);u=R(1,x-1);v=R(1,y-1);
  }else if(variant===2){ // Denominators need a common multiple.
    [x,y]=P([[3,4],[4,5],[5,6],[5,8],[6,8],[6,10],[8,12]]);
    u=R(1,x-1);v=R(1,y-1);
  }else if(variant===3){ // Greater than one, with improper-fraction answers possible.
    [x,y]=P([[3,5],[4,7],[5,8],[6,7],[8,9]]);
    u=R(Math.ceil(x/2),x-1);v=R(Math.ceil(y/2),y-1);
  }else{ // Mixed numbers, reserved for later questions.
    [x,y]=P([[3,4],[4,5],[5,6],[6,8],[5,8]]);
    u=R(1,x-1);v=R(1,y-1);
  }
  // Keep subtraction non-negative and vary whether borrowing is needed.
  let whole=variant===4?R(1,3):0;
  if(!add && variant===4){
    const w=R(2,4), z=R(1,w-1);
    top=(w*x+u)*y-(z*y+v)*x;bottom=x*y;
    return frac(`${w} ${u}/${x} − ${z} ${v}/${y} =`,top,bottom,`Convert both mixed numbers to improper fractions, find a common denominator and subtract.`);
  }
  if(!add && u*y<v*x){[x,y]=[y,x];[u,v]=[v,u];}
  top=add?u*y+v*x:u*y-v*x;bottom=x*y;
  if(add&&variant===4){
    const w=R(1,3);
    return frac(`${w} ${u}/${x} + ${v}/${y} =`,w*bottom+top,bottom,`Use a common denominator, then add the fractional parts to ${w}.`);
  }
  return frac(`${u}/${x} ${add?'+':'−'} ${v}/${y} =`,top,bottom,`Find a common denominator, ${add?'add':'subtract'} the numerators, and simplify if possible.`);
 }
 case 'S23':{
  d=den();c=den();a=R(1,d-1);b=R(1,c-1);let w=R(1,hard?4:2),z=R(1,hard?3:2);
  return frac(`${w} ${a}/${d} + ${z} ${b}/${c} =`,(w+z)*d*c+a*c+b*d,d*c,`Add the whole-number parts and use a common denominator for fractions.`);
 }
 case 'S24':{
  d=den();c=den();a=R(1,d-1);b=R(1,c-1);
  return frac(`${a}/${d} × ${b}/${c} =`,a*b,d*c,`Multiply the numerators and denominators, then simplify.`);
 }
 case 'S25':{
  d=den();a=R(1,d-1);b=R(2,hard?9:5);
  return frac(`${a}/${d} ÷ ${b} =`,a,d*b,`Divide the numerator by ${b}, equivalently multiply the denominator by ${b}.`);
 }
 case 'S27':case 'S28':{
  let pc=id==='S27'?P([10,25,50,75]):P([15,20,30,35,40,45,60,65]);a=R(small?4:hard?20:8,hard?75:35)*20;
  return Q(`${pc}% of ${a} =`,pc*a/100,`Find 1% or 10% of ${a} and scale to ${pc}%.`);
 }
 case 'S29':{
  a=R(small?2:hard?12:6,hard?25:15);if(hard&&R(0,1)){b=R(2,12);return Q(`${a}² + ${b} =`,a*a+b,`Square ${a}, then add ${b}.`);}
  if(stage===1&&R(0,1))return Q(`${a}³ =`,a*a*a,`Multiply ${a} by itself three times.`);
  return Q(`${a}² =`,a*a,`Multiply ${a} by itself.`);
 }
 case 'S30':{
  a=R(3,hard?30:15);b=R(2,hard?15:9);c=R(2,hard?12:8);
  let variant=hard?R(0,3):R(0,1);
  if(variant===3)return Q(`(${a} + ${b}) × ${c} =`,(a+b)*c,`Evaluate the brackets before multiplication.`);
  if(variant===2)return Q(`${a}² + ${b} × ${c} =`,a*a+b*c,`Calculate powers and multiplication before addition.`);
  if(variant===1)return Q(`${a} × ${b} − ${c} =`,a*b-c,`Multiply before subtracting.`);
  return Q(`${a} + ${b} × ${c} =`,a+b*c,`Multiply before adding.`);
 }
 default:throw Error('No generator for '+id);
 }
}
window.makePracticeQuestions=function(section,n){
 if(!section||![5,10,20].includes(n))throw Error('Invalid practice request');
 const out=[],seen=new Set(),sigs=new Map();
 for(let i=0;i<n;i++){
  const stage=i<Math.ceil(n*.2)?0:i<Math.ceil(n*.55)?1:2;
  let q=null;
  for(let tries=0;tries<500;tries++){
   const candidate=make(section,stage),sig=candidate.question.replace(/\d+(?:\.\d+)?/g,'#');
   const limit=n;
   if(!seen.has(candidate.question)&&(sigs.get(sig)||0)<limit){q=candidate;sigs.set(sig,(sigs.get(sig)||0)+1);break}
  }
  if(!q)throw Error('Unable to generate enough varied questions for '+section.id);
  seen.add(q.question);out.push(q);
 }
 return out;
};
})();
