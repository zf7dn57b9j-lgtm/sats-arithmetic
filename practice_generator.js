/* SATs practice V2: separate from the 50 approved fixed papers. */
(function(){'use strict';
function rand(a,b){return a+Math.floor(Math.random()*(b-a+1))}
function pick(a){return a[rand(0,a.length-1)]}
function shuffle(a){for(let i=a.length-1;i>0;i--){let j=rand(0,i);[a[i],a[j]]=[a[j],a[i]]}return a}
function num(x){return Number(x.toPrecision(12)).toString()}
function powerQuestion(level,used){
 for(let attempt=0;attempt<150;attempt++){
  let exp=pick([1,2,3]),k=10**exp,op=pick(['×','÷']);
  let a,answer,variant=level===0?'integer':level===1?pick(['decimal','decimal','integer']):pick(['decimal','decimal','missing','missing']);
  if(variant==='integer'){
   if(op==='×'){a=rand(12,999);answer=a*k}
   else {answer=rand(12,999);a=answer*k}
  }else{
   let decimals=level===1?1:rand(1,3),base=rand(12,9999)/(10**decimals);
   a=Number(base.toFixed(decimals));answer=op==='×'?a*k:a/k;
  }
  let text=variant==='missing'?(op==='×'?`□ × ${k} = ${num(answer)}`:`□ ÷ ${k} = ${num(answer)}`):`${num(a)} ${op} ${k} =`;
  let value=variant==='missing'?a:answer;
  if(used.has(text))continue;
  used.add(text);
  return {family:'place',question:text,answer:num(value),answer_fraction:[Math.round(value*1e6),1e6],working:[variant==='missing'?`Use the inverse operation to find the missing number: ${num(value)}`:`Moving each digit ${exp} place${exp>1?'s':''} ${op==='×'?'left':'right'} gives ${num(value)}`],marks:1,difficulty:level+1,practice_section_ids:['S07']};
 }
 throw new Error('Could not create distinct place-value question');
}
function signature(q){return q.question.replace(/\d+(?:\.\d+)?/g,'#').replace(/\s+/g,' ').trim()}
function bankQuestions(section,n){
 let bank=section.pool.filter(q=>q&&q.question&&q.answer_fraction&&q.answer_fraction.length===2),used=new Set(),out=[],lastSig='';
 const groups=[[],[],[]];
 for(let q of bank){let d=Number(q.difficulty)||2;groups[d<=2?0:d<=4?1:2].push(q)}
 for(let i=0;i<n;i++){
  let stage=i<Math.max(1,Math.ceil(n*.2))?0:i<Math.ceil(n*.55)?1:2;
  let candidates=[...groups[stage],...groups[(stage+1)%3],...groups[(stage+2)%3]];
  shuffle(candidates);
  let q=candidates.find(x=>!used.has(x.question)&&signature(x)!==lastSig);
  if(!q)q=candidates.find(x=>!used.has(x.question));
  if(!q)break;
  used.add(q.question);lastSig=signature(q);out.push({...q});
 }
 return out;
}
window.makePracticeQuestions=function(section,n){
 if(!section||![5,10,20].includes(n))throw new Error('Invalid practice request');
 if(section.id==='S07'){
  let used=new Set(),out=[];
  for(let i=0;i<n;i++)out.push(powerQuestion(i<Math.ceil(n*.2)?0:i<Math.ceil(n*.55)?1:2,used));
  return out;
 }
 return bankQuestions(section,n);
};
})();
