const startText = `export class AssoicateType{
  constructor(
){
    
  }
}`
 async function fetchResult(urlObj){
  const [username,password] =['god','god'] 
  let header = {method: 'GET',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json',
    'Authorization': 'Basic ' + btoa(`${username}:${password}`)
  },
  credentials:'same-origin'
  }
  // let url = `http://localhost:8080/encore/api/loan-od-accounts?page=0&size=10&accountId=&productCode=&branchCode=&glSubHead=&customerName=&operationalStatus=&startDate=&endDate=&guarantorCustomerId=&tag=&customerId=&sort=id,asc`
  for(let key in urlObj){

    const resultPromise = await fetch( urlObj[key],header)
    const result = await resultPromise.json();
    const model =extractOneModel(result);
    const jsDto = convertObjectToJSClassModel(model,key);
    console.log(jsDto)
  }
  // .then((response) => { return response.json()})
  // .then((messages) => {console.log(convertObjectToJSClassModel(extractOneModel(messages),'ProvisioningTable'));});

}

function extractOneModel(res){
  if(!res) throw new Error("Empty result")
  if(typeof(res) === 'object' && Array.isArray(res)){
    if(res.length !==0){
      return res[0];
    }else{
      throw new Error('Array is empty')
    }
  }else if(typeof(res) === 'object' && !Array.isArray(res)){
    if(res.results){
      if(res.results.length !== 0 ){
        return res.results[0];
      }else{
        throw new Error('Result array is empty')
      }
    }else{
      return res;
    }
  }
}
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
function upperCaseFirstLetter(str){
  return str.slice(0,1).toUpperCase()+str.slice(1)
}
function convertObjectToJSClassModel(obj,modelName="Default"){
  const accessModifiers = {
    pu:"public",
    pv:"private",
    pr:"protected"
  }
  let currentModifier = accessModifiers.pu;
  let str=`export class ${modelName}{
    constructor(
  `
  let insideConstructorStr='';
  let totalVal =0;
  let convertedVal = 0;
  let arrStr='',objStr='';
  if(!obj || Array.isArray(obj) || typeof(obj) !=="object" || isEmpty(obj)) {throw  "Error in input object"};
  if(obj && isEmpty(obj)){

  }
  for(let key in obj){
    totalVal++
    let value = obj[key];
    let type = typeof(value);
    let upperCasedKey = upperCaseFirstLetter(key);
    if(type === 'object' && value==null){
      type = 'any'
    }else if(type === 'object' && Array.isArray(value)){
      type = `Array<${upperCasedKey}>`
      if(value.length !== 0){
        arrStr += '\n'+convertObjectToJSClassModel(value[0],upperCasedKey)+'\n'
        insideConstructorStr += `this.${upperCasedKey} = new ${upperCasedKey}();`+'\n'
      }else{
        
      }
    }else if( type ==='object' && !Array.isArray(value)){
      type = `${upperCasedKey}`
      objStr += '\n'+convertObjectToJSClassModel(value,upperCasedKey)+'\n'
      insideConstructorStr += `this.${upperCasedKey} = new ${upperCasedKey}();`+'\n'
    }else{
      if(forcedTypes.hasOwnProperty(key.trim())){
        type = forcedTypes[key];
      }
    }
    str+=`\t${currentModifier} ${key}?: ${type},\n`
  }
  if(insideConstructorStr!==''){
    str+=`  ){
      ${insideConstructorStr}  }\n}`;
  }else{
    str+=`  ){}\n}`;
  }
  return str+arrStr+objStr;
}

function convertObjectToJSInterface(obj,modelName="Default"){
  const accessModifiers = {
    pu:"public",
    pv:"private",
    pr:"protected"
  }
  let currentModifier = accessModifiers.pu;
  let str=`export interface ${modelName}{\n`
  let insideConstructorStr='';
  let totalVal =0;
  let convertedVal = 0;
  let arrStr='',objStr='';
  if(!obj || Array.isArray(obj) || typeof(obj) !=="object" || isEmpty(obj)) {throw  "Error in input object"};
  if(obj && isEmpty(obj)){

  }
  for(let key in obj){
    totalVal++
    let value = obj[key];
    let type = typeof(value);
    let upperCasedKey = upperCaseFirstLetter(key);
    // if(type!=='object'){
    //   convertedVal++
    //   type = type;
    // }
    if(type === 'object' && value==null){
      type = 'any'
    }else if(type === 'object' && Array.isArray(value)){
      type = `Array<${upperCasedKey}>`
      if(value.length !== 0){
        arrStr += '\n'+convertObjectToJSInterface(value[0],upperCasedKey)+'\n'
        // insideConstructorStr += `this.${upperCasedKey} = new ${upperCasedKey}();`+'\n'
      }else{
        
      }
    }else if( type ==='object' && !Array.isArray(value)){
      type = `${upperCasedKey}`
      objStr += '\n'+convertObjectToJSInterface(value,upperCasedKey)+'\n'
      // insideConstructorStr += `this.${upperCasedKey} = new ${upperCasedKey}();`+'\n'
    }else{
      if(forcedTypes.hasOwnProperty(key.trim())){
        type = forcedTypes[key];
      }
    }
    str+=`\t${key}: ${type};\n`
  }
  str+=`}`;
  return str+arrStr+objStr;
}
let urlObj = {
  "LoanOdAccounts":`http://localhost:8080/encore/api/loan-od-accounts?page=0&size=10&accountId=&productCode=&branchCode=&glSubHead=&customerName=&operationalStatus=&startDate=&endDate=&guarantorCustomerId=&tag=&customerId=&sort=id,asc`,
  "ProvisioningTable":`http://localhost:8080/encore/api/provision-table/list`,
  OperationalStatus:`http://localhost:8080/encore/api/getOperationStatusList`
}
// urlObj={"getDpdTypes" : "http://localhost:8080/encore/api/provision-table/getDpdTypes",
// "getProvisioningBasis" : "http://localhost:8080/encore/api/provision-table/getProvisioningBasis",
// "getAssetCategoryChangeBasis" : "http://localhost:8080/encore/api/provision-table/getAssetCategoryChangeBasis",
// "getDemandOffsetSequences" : "http://localhost:8080/encore/api/provision-table/getDemandOffsetSequences",
// "getAssetCategories" : "http://localhost:8080/encore/api/provision-table/getAssetCategories"}
// urlObj = {
//   "ProvisioningTable":`http://localhost:8080/encore/api/provision-table/list`
// }
urlObj = {
  AssociateTypes:"http://localhost:8080/encore/api/getAssociateTypes",
  "AccountAssociates":"http://localhost:8080/encore/api/loan-od-accounts/listAssociates/100112300056"
}
fetchResult(urlObj)
function getModels(key,result){
  const model =extractOneModel(result);
  const jsDto = convertObjectToJSClassModel(model,key);
  return jsDto;
}
function getInterface(key,result){
  const model =extractOneModel(result);
  const jsDto = convertObjectToJSInterface(model,key);
  return jsDto;
}
let inputArea= document.getElementsByClassName('textarea')[0];
let outputArea = document.getElementsByClassName('textarea')[1];
let copyButton = document.getElementById('copy');
let convertButton = document.getElementById('convert');
let pasteButton = document.getElementById('paste');
let prettifyButton = document.getElementById('pretty');
let isFlatCheckbox = document.getElementById('isFlatCheckbox');
let title = document.getElementById('title');
title.innerText = `JSON to TS-Class or Interface`
forcedTypes = {
  id:'string'
};
pasteButton.addEventListener('click', ()=>{
  let pasteArea =inputArea;
  pasteArea.value = '';
  navigator.clipboard.readText()
  .then((text)=>{
    console.log(text,pasteArea)
      pasteArea.value = text;
  });
})
convertButton.addEventListener('click', ()=>{
  // console.log(JSON.parse(getJHITemplate("Account Associate",JSON.parse(inputArea.value),'nest'),undefined,4))
  outputArea.value='';
  setTimeout(()=>{

    if(isFlatCheckbox.checked){
      outputArea.value = getModels("AccountAssociate",JSON.parse(inputArea.value));
    }else{
      outputArea.value = getInterface("AccountAssociate",JSON.parse(inputArea.value));
    }
  },100)
});
copyButton.addEventListener('click', ()=>{
  /* document.getElementById('copyArea').select();
  document.execCommand('copy'); */
  let copyArea = outputArea;
  navigator.clipboard.writeText(copyArea.value);
});
prettifyButton.addEventListener('click', ()=>{
  inputArea.value = JSON.stringify(JSON.parse(inputArea.value),undefined,4);
  outputArea.value = JSON.stringify(JSON.parse(outputArea.value),undefined,4);;
});
document.getElementById('check-label').innerText = "TS Class or Interface"
// console.log(convertObjectToJSClassModel({a:[{bas:{
//   cas:{ d:{alla:12}}
// }}]})+'\n')