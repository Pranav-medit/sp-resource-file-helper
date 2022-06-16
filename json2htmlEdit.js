let obj ={
  "id": 1,
  "version": 0,
  "accountId": "100112300055",
  "associateType": "ANCHOR",
  "name": {
      "firstName": "Rest",
      "middleName": "er",
      "lastName": "p"
  },
  "sequenceNum": 1,
  "associateId": "140",
  "limitCode": "112",
  "displayAssociateType": "Anchor",
  "displayName": "Rest er p"
}


function capitalizeFirstLetter(strToCapitalize){
return strToCapitalize[0].toUpperCase() + strToCapitalize.slice(1);
}
function seperateCharectersUponUppercase(strInput,firstCap){
if(firstCap){ 
  return capitalizeFirstLetter(strInput.split(/(?=[A-Z])/).join(' '))
}
return strInput.split(/(?=[A-Z])/).join(' ')
}
let ignoreArray = ['id','version']
let dto='accountAssociate'
let jhiTranslateBase = `encoreclientApp.loanOdAccounts.accountAssociates`
function generateHTML(jhiTranslateBase,obj,data){
let dto = data.name+'Dto';
let form = data.name+"Form";
let htmlTemplate=`<div class="card-body">
<jhi-alert></jhi-alert>
<div class="row">
  <div class="col-8">
    <h6
      *ngIf="!${dto}.id"
      class="modal-title"
      id="associatesLabel"
      jhiTranslate="${jhiTranslateBase}.create.title"
    >
      Create a new ${seperateCharectersUponUppercase(data.name,true)}
    </h6>
    <h6
      *ngIf="${dto}.id"
      class="modal-title"
      id="editAssociatesSettingLabel"
      jhiTranslate="${jhiTranslateBase}.edit.title"
    >
      Edit ${seperateCharectersUponUppercase(data.name,true)}
    </h6>
  </div>
</div>
<div>&nbsp;</div>
<div>
<form [formGroup]="${form}" novalidate (ngSubmit)="save()">
      <div class="row mb-3 d-flex align-items-center">`;
for(let key in obj){
if(
  ignoreArray.includes(key) || 
  Array.isArray(obj[key]) || 
  key.startsWith('display')
) {continue; };
let displayKey = 'display'+capitalizeFirstLetter(key);
let valueKey = key;
if(obj.hasOwnProperty(displayKey.trim())){
  valueKey = displayKey.trim();
}
htmlTemplate +=  `
<div class="text-right form-group col-3">
          <label
            class="form-control-label"
            jhiTranslate="${jhiTranslateBase}.${key}"
            for="field_${key}"
            >${seperateCharectersUponUppercase(key,true)}</label
          >
          <span> : </span>
        </div>
        <div class="form-group col-2 p-0">
          <input
            type="text"
            class="form-control"
            name="${key}"
            id="field_${key}"
            formControlName="${key}"
            required
          />
          <validation-error
            [control]="${form}.get('${key}')"
          ></validation-error>
        </div>
        <div class="col-7"></div>
`
}

return htmlTemplate+`
<div>
        <button type="button" class="btn btn-default" (click)="previousState()">
          <span jhiTranslate="entity.action.cancel">Cancel</span>
        </button>
        <span [ngbTooltip]="${form}.invalid ? 'Form Invalid!' : null">
          <button
            type="submit"
            [disabled]="${form}.invalid"
            class="btn btn-info ml-2"
          >
            <span jhiTranslate="entity.action.save">Save</span>
          </button>
        </span>
      </div>
</div>
</form>
</div>
</div>`;
}
// console.log(generateHTML(jhiTranslateBase,obj,dto))
let inputArea= document.getElementsByClassName('textarea')[0];
let outputArea = document.getElementsByClassName('textarea')[1];
let copyButton = document.getElementById('copy');
let convertButton = document.getElementById('convert');
let pasteButton = document.getElementById('paste');
let prettifyButton = document.getElementById('pretty');
let isFlatCheckbox = document.getElementById('isFlatCheckbox');
let title = document.getElementById('title');
title.innerText = `JSON to Edit HTML`
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
    outputArea.value = generateHTML(jhiTranslateBase,JSON.parse(inputArea.value),{name:'accountAssociate'});
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
outputArea.value = JSON.stringify(JSON.parse(outputArea.value),undefined,4);
});
document.getElementById('check-label').innerText = "TS Class or Interface"