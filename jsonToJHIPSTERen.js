function initialTemplate(repVal1,repVal2=repVal1){
  return `{
    "home": {
        "pageTitle": "${repVal1}",
        "pageTitle1": "${repVal1} Value",
        "createLabel": "New ${repVal2}",
        "createOrEditLabel": "Create or edit a ${repVal2}",
        "heading": "List All ${repVal2}",
        "${repVal2}Values": "List All ${repVal1} Values",
        "noResultsFound": "No ${repVal2} found."
    },
    "saveError": "An error occured while saving your document",
    "deleteError": "An error occured while deleting your document",
    "serverError": "{{ message }}",
    "created": "Successfully saved {{ name }} ${repVal2}",
    "updated": "Successfully updated {{ name }} ${repVal2}",
    "deleted": "Successfully deleted ${repVal2}",
    "delete": {
        "question": "Are you sure you want to delete ${repVal2} {{ val }}?"
    },
    "detail": {
        "title": "Show ${repVal2}",
        "pageTitle": "Show ${repVal1}"
    },
    "create": {
        "title": "Create New ${repVal2}",
        "pageTitle": "Create ${repVal1}"
    },
    "edit": {
        "title": "Update ${repVal2}",
        "pageTitle": "Update ${repVal1}"
    }
  }`
}
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
function upperCaseFirstLetter(str){
  return str.slice(0,1).toUpperCase()+str.slice(1)
}
function camel2title(camelCase) {
  // helloThere -> Hello There
  // no side-effects
  return camelCase
    // inject space before the upper case letters
    .replace(/([A-Z])/g, function(match) {
       return " " + match;
    })
    // replace first char with upper case
    .replace(/^./, function(match) {
      return match.toUpperCase();
    });
}
function constructJHI(key,nestLevel=0,obj={}){
  // "hello" -> `"helloThere" :  "Hello There",\n`
  if(Object.keys(obj).pop() ===key){
    return `${'\t'.repeat(nestLevel)}"${key}":"${camel2title(key)}"\n`
  }
  return `${'\t'.repeat(nestLevel)}"${key}":"${camel2title(key)}",\n`
}
function convertJSONToFlatJHI(obj,lastCommaFlag=false){
  let nestLevel =1;
  let str='';
  for(let key in obj){
    const value = obj[key];
    const valueType = typeof(obj[key]);
    if(valueType !== 'object' || value == null){
      if(!str.includes(key)){
        if(lastCommaFlag){
          str+= constructJHI(key,nestLevel);
        }else{
          str+= constructJHI(key,nestLevel,obj);
        }
      }
    }else if(valueType === 'object' && Array.isArray(value)){
      if(value.length !== 0){
        str+= constructJHI(key,nestLevel);
        str+= convertJSONToFlatJHI(value[0],true)
      }else{
        console.log("Array empty so no value substituted")
      }
    }else if(valueType === 'object' && !Array.isArray(value)){
      if(!isEmpty(value)){
        str+= constructJHI(key,nestLevel);
        str+= convertJSONToFlatJHI(value,true)
      }
    }else {
      console.log(value)
    }
  }
  return str
}
function returnObjectString(name,objStr,nestLevel=0){
  return `${'\t'.repeat(nestLevel)}"${name}" : {\n${objStr+'\t'.repeat(nestLevel)}}`
}
function convertJSONToNestJHI(obj,nestLevel=1){
  let str=``;
  for(let key in obj){
    const value = obj[key];
    const valueType = typeof(obj[key]);
    if(valueType !== 'object' || value == null){
      if(!str.includes(key)){
        str += constructJHI(key,nestLevel,obj);
      }
    }else if(valueType === 'object' && Array.isArray(value)){
      if(value.length !== 0){
        str += constructJHI(key,nestLevel);
        str += returnObjectString(upperCaseFirstLetter(key),convertJSONToNestJHI(value[0],nestLevel+1),nestLevel)+',\n';
      }else{
        console.log("Array empty so no value substituted")
      }
    }else if(valueType === 'object' && !Array.isArray(value)){
      if(!isEmpty(value)){
        str += constructJHI(key,nestLevel);
        str += returnObjectString(upperCaseFirstLetter(key),convertJSONToNestJHI(value,nestLevel+1),nestLevel)+',\n';
      }
    }else {
      console.log(value)
    }
  }
  return str
}
function extractOneModel(res){
  // First find the result object if exists
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
function getJHITemplate(name,model,type='flat'){
  if(type === 'nest'){
    return initialTemplate(name).slice(0,-1).trim()+",\n"+convertJSONToNestJHI(model)+'}'
  }else{
    return initialTemplate(name).slice(0,-1).trim()+",\n"+convertJSONToFlatJHI(model)+'}'
  }
}
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
  for(let key in urlObj){
    const resultPromise = await fetch( urlObj[key],header)
    const result = await resultPromise.json();
    let parsedJHI=jsonToJHI(result);
    console.log(parsedJHI)
  }

}
function jsonToJHI(json,type){
  try{
    let model  = extractOneModel(json);
    // console.log(model)
    const str = getJHITemplate("Account Associates",model,type);
    return JSON.parse(str);
  }catch(e){
    console.log(e)
  }
}
let urlObj = {
  "ProvisioningTable":`http://localhost:8080/encore/api/loan-od-accounts/listAssociates/100112300056`
}
let json ={"id":1,"version":0,"accountId":"100112300055","associateType":"ANCHOR","name":{"firstName":"Rest","middleName":"er","lastName":"p"},"sequenceNum":1,"associateId":"140","limitCode":"112","displayAssociateType":"Anchor","displayName":"Rest er p"}
let inputArea= document.getElementsByClassName('textarea')[0];
let outputArea = document.getElementsByClassName('textarea')[1];
let copyButton = document.getElementById('copy');
let convertButton = document.getElementById('convert');
let pasteButton = document.getElementById('paste');
let prettifyButton = document.getElementById('pretty');
let isFlatCheckbox = document.getElementById('isFlatCheckbox');

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
      outputArea.value = JSON.stringify(JSON.parse(getJHITemplate("Account Associate",JSON.parse(inputArea.value),'flat')),undefined,4);
    }else{
      outputArea.value = JSON.stringify(JSON.parse(getJHITemplate("Account Associate",JSON.parse(inputArea.value),'nest')),undefined,4);
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
console.log(JSON.parse(getJHITemplate("Account Associate",json,'nest')));
// fetchResult(urlObj)
// console.log(initialTemplate("Provisioning Table","Provisioning")) 
  
  // console.log(JSON.parse());
  // {
  //   "LoanOdAccounts":`http://localhost:8080/encore/api/loan-od-accounts?page=0&size=10&accountId=&productCode=&branchCode=&glSubHead=&customerName=&operationalStatus=&startDate=&endDate=&guarantorCustomerId=&tag=&customerId=&sort=id,asc`,
  //   "ProvisioningTable":`http://localhost:8080/encore/api/provision-table/list`,
  //   OperationalStatus:`http://localhost:8080/encore/api/getOperationStatusList`
  // }