let compareHtml =`<div class="card-body">
<jhi-alert></jhi-alert>
<div class="row">
    <div class="col-8">
        <h6 class="card-title" jhiTranslate="encoreclientApp.associates.home.heading">List All Associates</h6>
    </div>
    <div class="col-4 text-right mb-2">
        <button class="btn btn-info btn-sm create-country" (click)="createAssociate()"
            *jhiHasAnyAuthority="['ROLE_CreateCustomerAssociate']">
            <span jhiTranslate="encoreclientApp.associates.home.createLabel">
                New Associates
            </span>
        </button>
    </div>
</div>
<div class="card">
    <div class="card-body search-card-body">
        <form name="searchForm">
            <div class="row">
                <div class="col-2">
                    <input type="text" class="form-control h-100" name="customerId" id="currentSearch.customerId"
                        placeholder="Customer Id" [(ngModel)]="currentSearch.customerId">
                </div>
                <div class="col-2">
                  <select class="form-control h-100" name="associateType" id="field_associateType"
                          [(ngModel)]="currentSearch.associateType">
                          <option selected value="">--Select Associate Type--</option>
                          <option *ngFor="let associateType of associateTypeList" [value]="associateType.code">
                              {{associateType.name}}
                          </option>
                      </select>
                </div>
                <div class="col-2">
                    <input type="text" class="form-control h-100" name="associateName" id="currentSearch.associateName"
                        placeholder="Associate Name" [(ngModel)]="currentSearch.name">
                </div>
                <div class="col-2">
                    <button class="btn btn-info" (click)="search()">
                        <span class="fa fa-search"></span>
                    </button>
                    <button class="btn btn-info ml-2" (click)="clear()">
                        <span jhiTranslate="entity.action.clear">Clear</span>
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>
<br />
<div class="row">
    <div class="col-12">
        <table class="table table-bordereless table-striped table-sm mb-0">
            <thead class="bg-info">
                <tr>		
                    <th>
                        <span jhiTranslate="encoreclientApp.associates.associateName">Associate Name</span>
                        <span></span>
                    </th>
                    <th>
                        <span jhiTranslate="encoreclientApp.associates.customerId">CustomerID</span>
                        <span></span>
                    </th>
                    <th>
                        <span jhiTranslate="encoreclientApp.associates.associateType">Associate Type</span>
                        <span></span>
                    </th>
                    <th>
                        <span jhiTranslate="encoreclientApp.associates.effectiveDate">Effective Date</span>
                        <span></span>
                    </th>
                    <th>
                        <span jhiTranslate="encoreclientApp.associates.expiryDate">Expiry Date</span>
                        <span></span>
                    </th>
                    <th>
                        <span class="ml-5">Actions</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr *ngIf="!associates.length">
                    <td colspan="6" jhiTranslate="encoreclientApp.associates.home.noResultsFound">No Associates
                        found.</td>
                </tr>
                <tr *ngFor="let associate of associates ;trackBy: trackId">
                    <td>{{associate.displayName}}</td>
                    <td>{{associate.customerId}}</td>
                    <td>{{associate.associateType}}</td>
                    <td>{{associate.effectiveDate | date:'mediumDate'}}</td>
                    <td>{{associate.expiryDate | date:'mediumDate'}}</td>
                    <td>
                        <div>
                            <button type="submit" [routerLink]="['view', associate.id ]"
                                class="btn btn-link btn-sm">
                                <span class="hidden-md-down" jhiTranslate="entity.action.view"
                                    *jhiHasAnyAuthority="['ROLE_ShowCustomerAssociate']">View</span>
                            </button>
                            <button type="submit" [routerLink]="['edit', associate.id]" replaceUrl="true"
                                class="btn btn-link btn-sm">
                                <span class="hidden-md-down" jhiTranslate="entity.action.edit"
                                    *jhiHasAnyAuthority="['ROLE_UpdateCustomerAssociate']">Edit</span>
                            </button>
                            <button type="button" (click)="delete(associate.id)" replaceUrl="true"
                                class="btn btn-link btn-sm">
                                <span class="hidden-md-down" *jhiHasAnyAuthority="['ROLE_DeleteCustomerAssociate']" jhiTranslate="entity.action.delete">Delete</span>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div *ngIf="associates && associates.length > 0" class="card" style="background-color: #f8f9fa;">
            <div class="card-body p-0">
                <div class="d-flex flex-row-reverse">
                    <div class="p-2 text-center">
                        <div class="info jhi-item-count">
                            Showing
                            {{ (page - 1) * itemsPerPage == 0 ? 1 : (page - 1) * itemsPerPage + 1 }}
                            - {{ page * itemsPerPage < queryCount ? page * itemsPerPage : queryCount }} of {{
                                queryCount }} items. </div>
                                <ngb-pagination [collectionSize]="totalItems" [(page)]="page"
                                    class="align-items-center mt-2 d-flex justify-content-center"
                                    [pageSize]="itemsPerPage" (pageChange)="loadPage(page)"></ngb-pagination>
                        </div>
                        <div class="p-2">
                            <label style="font-weight: normal;" jhiTranslate="global.form.resultsPerPage"
                                for="field_resultsPerpage">Page
                                size</label>
                            <select class="form-control mt-2 defaultBorder" name="resultsPerpage"
                                id="resultsPerpage" [(ngModel)]="itemsPerPage" (ngModelChange)="transition()">
                                <option value="5" jhiTranslate="global.table.5">5</option>
                                <option value="10" jhiTranslate="global.table.10">10</option>
                                <option value="15" jhiTranslate="global.table.15">15</option>
                                <option value="20" jhiTranslate="global.table.20">20</option>
                                <option value="25" jhiTranslate="global.table.25">25</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`
function wrapWithHeaderHtml(html,dto,page=false,baseJhi=false) {
    if(!baseJhi){
        baseJhi = extractDto(html)
    }
    if(!page){
        page = seperateCharectersUponUppercase(dto,true) 
    }
  return `
  <div class="bg-white shadow-sm rounded h-full relative" >\n
  <!--Head-->\n
  <div class="flex gap-3 items-center p-3">
    <div class="modal-title" jhiTranslate="${baseJhi}.detail.title">${page} Details</div>
    <button class="btn-dark-blue ml-auto" jhiTranslate="entity.action.edit">Edit ${page}</button>
    <button class="btn-icon-blue" (click)="previousState()">
      <span class="material-icons">close</span>
    </button>
  </div>
  
  <jhi-alert></jhi-alert>
    `+html+'\n</div>';
}


function isPresent(string,reg){
  return string.match(new RegExp(reg)) ? true : false; 
}
let isTabPresent = false;
function setIsTabPresent(){
  if(isPresent(inputStr,"ngb-tab")){ 
    isTabPresent = true;
  } 
}
function matchNReplace(inputStr,regexp){
  let match,replacedStr;
  match=inputStr.match(new RegExp(regexp))
  replacedStr = inputStr.replace(match,'');
  return [match[0],replacedStr];
}
function getAllTabs(inputStr){
  let match;
  // let [match,replacedStr]  = matchNReplace(inputStr,'<ngb-tab[\\s>]+?[\\S\\s\\n.]*?</ngb-tab>')
  let tabArray = []
  while(isPresent(inputStr,'<ngb-tab[\\s>]+?')){
    [ match,inputStr ] = matchNReplace(inputStr,'<ngb-tab[\\s>]+?[\\S\\s\\n.]*?</ngb-tab>') 
    tabArray.push(match);    
  }
  return tabArray;
}
function getAllTr(inputStr){
  let trArray = []
  while(isPresent(inputStr,'<tr[\\s>]+?')){
    [ match,inputStr ] = matchNReplace(inputStr,'<tr[\\s>]+?[\\S\\s\\n.]*?</tr>') 
    trArray.push(match);    
  }
  return trArray;
}
function extractJhiTranslate(str){
  return str.match(new RegExp(`(?<=jhiTranslate\\s*?=\\s*?)".*?"`))[0].slice(1,-1)
}
function extractNgSubValue(str){
  return str.match(new RegExp(`(?<={{).*?(?=}})`))[0];
}
function extractNgTabTitle(str){
    let a =str.match(new RegExp('(?<=<ngb-tab[\\s.\\n\\S]*?title\\s*?=\\s*?)".*?"'))
  return str.match(new RegExp('(?<=<ngb-tab[\\s.\\n\\S]*?title\\s*?=\\s*?)".*?"'))[0].slice(1,-1)
}
function extractNgIf(str){
    return str.match(new RegExp('\\*ngIf=".*?"'))[0];
}
function extractDto(str,isInnerStr = false){
    console.log(str)
    if(isInnerStr){
        return str.trim().split('.').slice(0,-1).join('.').trim()
    }
    return extractJhiTranslate(str).trim().split('.').slice(0,-1).join('.').trim();
}
function createTrStructureObj(trArray){
    let trObjArr =  [];
    for(let tr of trArray){
        let trObj = {};
        try{
          trObj["subValue"] = extractNgSubValue(tr);
        }catch(err){
          console.log(err);
        }
        try{
          trObj["jhiTranslate"]  = extractJhiTranslate(tr);
        }catch(err){
          console.log(err);
        }
        try{
          trObj["ngIf"] = extractNgIf(tr);
        }catch(err){
          trObj["ngIf"] = "";
        }
        trObjArr.push(trObj);
    }
    return trObjArr;
}
function createTabStructureObj(str){
  let tabStructure = [];
//   if(ngbTabArray.length === 0){
//     // tabStructure
//   }
  let ngbTabArray = getAllTabs(str);
  let tabArr = [];
  for(let ngbTab of ngbTabArray ){
    let tabTitle = extractNgTabTitle(ngbTab);
    let trArray  = getAllTr(ngbTab);
    let trObjArr = createTrStructureObj(trArray);
    tabArr.push({[tabTitle]:trObjArr});
  }
  return tabArr;
}
// let tabStructureArr = createTabStructureObj(compareHtml);
function generateTabHeader(tabStructureArr){
  
  let html = `<div class="tab-wrapper">\n`
  for(let [i, tabStructure] of tabStructureArr.entries()){
    html+= `\t<a class="tab" [ngClass]="{ active: tabIndex == ${i} }" (click)="tabIndex = ${i}">${Object.keys(tabStructure)[0]}</a>\n`
  }
  return  html+`</div>`
}
function generateTrs(tabStructure){
    let tabHtml=``;
    for(let tab of tabStructure[Object.keys(tabStructure)[0]]){
        let extractedDtoPartText  = extractDto(tab.jhiTranslate,true);
        let removedDtoPartText = tab.jhiTranslate.replace(extractedDtoPartText+'.',"")
        let textInsider = seperateCharectersUponUppercase(removedDtoPartText,true)
        if(tab.subValue){

            tabHtml+=` 
            <div ${tab.ngIf} class="list">
            \t<div jhiTranslate="${tab.jhiTranslate}" class="list-label">${textInsider}</div>
            \t<div class="list-content">{{ ${tab.subValue} }}</div>
            </div>\n`
        }else{
            tabHtml+=`
            <tr>
                <td></td>
                <td class="p-2 text-secondary">
                    <h6 jhiTranslate="${tab.jhiTranslate}">${textInsider}</h6>
                </td>
            </tr>\n`
        }
    }
    return tabHtml;
}
function wrapDataWithDiv(value){
    return `<div class="w-full">${value}</div>`
}
function generateTabBody(tabStructureArr){
  let tabHtml = ``;
  for(let [i, tabStructure] of tabStructureArr.entries()){
    tabHtml+=`\t<!---- TAB ${i+1} ---->\n
  <div *ngIf="tabIndex == ${i}" class="font-medium">\n`
    tabHtml+=generateTrs(tabStructure);
    tabHtml+=`\t</div>\n`
  }
  tabHtml=wrapRowDataWithDiv(tabHtml);
  return tabHtml;
}
// extractDto(compareHtml)
// console.log(generateTabBody(createTabStructureObj(compareHtml)))
function capitalizeFirstLetter(strToCapitalize){
    return strToCapitalize[0].toUpperCase() + strToCapitalize.slice(1);
}
function seperateCharectersUponUppercase(strInput,firstCap){
if(firstCap){ 
  return capitalizeFirstLetter(strInput.split(/(?=[A-Z])/).join(' '))
}
return strInput.split(/(?=[A-Z])/).join(' ')
}
function generateShowPageMainBody(htmlText){
    let showPageMainBodyHtml = ``;
    if(getAllTabs(htmlText).length ===0){
        let trs = getAllTr(htmlText)
        let createdTrStructureObj = createTrStructureObj(trs)
        let genTrs = generateTrs({oneTime:createdTrStructureObj});
        showPageMainBodyHtml = wrapRowDataWithDiv(genTrs);
    }else{
        showPageMainBodyHtml += generateTabHeader(createTabStructureObj(htmlText)) 
        showPageMainBodyHtml += generateTabBody(createTabStructureObj(htmlText))
    }
    return showPageMainBodyHtml;
}
function generateEntireShowPageHtml(htmlText){
    let html =``;
    html = generateShowPageMainBody(htmlText);
    html = wrapWithHeaderHtml(html,"Associates");
    return html;
}
function setupUI(){
  let inputArea= document.getElementsByClassName('textarea')[0];
  let outputArea = document.getElementsByClassName('textarea')[1];
  let copyButton = document.getElementById('copy');
  let convertButton = document.getElementById('convert');
  let pasteButton = document.getElementById('paste');
  let prettifyButton = document.getElementById('pretty');
  let isFlatCheckbox = document.getElementById('isFlatCheckbox');
  let title = document.getElementById('title');
  let checkLabel = document.getElementById('check-label');
  function copyFromElem(element){
    // console.log(element)
    navigator.clipboard.writeText(element.value);
  }
  function paste2Elem(element){
    element.value='';
    navigator.clipboard.readText().then((text)=>{
      element.value = text;
    });
  }
  function prettifyButtonHandler(...args){
    let space = 2
    args.forEach(elem => {
      elem.value = elem.value.replaceAll(/\\n/g,String.fromCharCode(10));
      elem.value = elem.value.replaceAll(/\\t/g,String.fromCharCode(9));
    })
  }
  function convertButtonHandler(inputArea,outputArea){
    outputArea.value='';
    setTimeout(()=>{
        console.log(generateEntireShowPageHtml(inputArea.value))
        outputArea.value = generateEntireShowPageHtml(inputArea.value)
    },100)
  }

  // Add listeners
  copyButton.addEventListener('click', event => copyFromElem(outputArea));
  prettifyButton.addEventListener('click', event => prettifyButtonHandler(inputArea,outputArea));
  pasteButton.addEventListener('click',(event)=> paste2Elem(inputArea));
  convertButton.addEventListener('click', (event)=>convertButtonHandler(inputArea,outputArea));

  // Set Titles
  checkLabel.innerText = "NA"
  title.innerText = `Old to new show page`
}
function main(){
  setupUI();
}
main()