

let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let total =document.getElementById('total');
let category =document.getElementById('category');
let count =document.getElementById('count');
let create =document.getElementById('create');

let tmp ;
let mood = 'create';


function getTotal(){
if(price.value != ""){
let result =( +price.value + +taxes.value + +ads.value) - +discount.value ;
total.innerHTML = result ;
total.style.background ="green" ;
}else{
    total.innerHTML = "" ;
    total.style.background =" rgb(241, 75, 75)" }
}

/////////////////////////////////////////////////////////

if(localStorage.product != null){
  dataPro =JSON.parse(localStorage.product )
}else{
    dataPro =[];
}

create.onclick=function () {  
    let obPro ={
 title:title.value.toLowerCase(),
 price:price.value,
 ads:ads.value,
 taxes:taxes.value,
 discount:discount.value,
 category:category.value.toLowerCase(),
 count:count.value,
 total:total.innerHTML
    }

    if(title.value != '' && price.value != '' && category.value !=''){
if(mood === "create"){
  
if(obPro.count > 1){
for(let f = 0 ; f<obPro.count; f++){
  dataPro.push(obPro);
}
}else{
    dataPro.push(obPro);
}
}else{
dataPro[tmp]=obPro;
create.innerHTML ="create";
count.style.display ="block";
mood="create";
} DEL();
}else{
  if(title.value ==""){
    title.style.background ="red";
  }
 
}

  
localStorage.setItem("product", JSON.stringify(dataPro));

write() ;


}

function DEL() {
    title.value ="";
    ads.value ="";
    taxes.value ="";
    discount.value =""; 
    count.value ="";
    price.value ="";
    category.value ="";
    total.innerHTML ="";
}


function write(){getTotal();
let table = '';
for(let i = 0 ; i<dataPro.length ; i++){
table +=`
<tr>
  <td>${i +1}</td>
  <td>${dataPro[i].title}</td>
  <td>${dataPro[i].price}</td>
  <td>${dataPro[i].taxes}</td>
  <td>${dataPro[i].ads}</td>
  <td>${dataPro[i].discount}</td>
  <td>${dataPro[i].category}</td>
  <td>${dataPro[i].total}</td>
  <td><button onclick="upData(${i})"  id="update">update</button></td>
  <td><button onclick="delet(${i})" id="delete">delete</button></td>
</tr>


`
}
document.getElementById('tbody').innerHTML = table ;
let deleteall =document.getElementById('deleteall')
if(dataPro.length > 0){
  deleteall.innerHTML =`
  <button onclick="ammer()" >DELETE ALL (${dataPro.length})</button>
  `
}else{
  deleteall.innerHTML="";
}


}
write()
function delet(i){
dataPro.splice(i,1);
localStorage.product =JSON.stringify(dataPro);
write();
}

function ammer() {
    localStorage.clear();
    dataPro.splice(0);
    write();
  }
///////////////////////////////
function upData(i) {
  title.value = dataPro[i].title;
  ads.value = dataPro[i].ads;
  category.value = dataPro[i].category;
  discount.value = dataPro[i].discount;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  getTotal();
 tmp= i;
 count.style.display ="none";
  create.innerHTML = 'UpData';
  mood='updata';
  scroll({
    top:0 ,behavior:"smooth" ,
  })
}

////////////////////////////////////////
let searchMood = 'title' ;
let search =document.getElementById('search')


function getsearchMood(id) { write()

 if(id ==='searchTitle'){
  searchMood ="title"
 }else{
  searchMood ="category"
 }
search.focus();
search.placeholder = `search by ${searchMood.toUpperCase()}` ;
search.value='';

}
//////////////////////
function findData(value){

   let table ='';
    for(let i = 0 ; i<dataPro.length; i++){
  if(searchMood == 'title'){
   
if(dataPro[i].title.includes(value.toLowerCase())){
  table +=`
  <tr>
    <td>${i +1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].category}</td>
    <td>${dataPro[i].total}</td>
    <td><button onclick="upData(${i})"  id="update">update</button></td>
    <td><button onclick="delet(${i})" id="delete">delete</button></td>
  </tr>
  
  
  `
  }
}else{
  
    if(dataPro[i].category.includes(value.toLowerCase())){
      table +=`
      <tr>
        <td>${i +1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].category}</td>
        <td>${dataPro[i].total}</td>
        <td><button onclick="upData(${i})"  id="update">update</button></td>
        <td><button onclick="delet(${i})" id="delete">delete</button></td>
      </tr>
      
      
      `
      }
}
  }
 document.getElementById('tbody').innerHTML = table ;
}


