let data;
$.ajax({
  url: "./en.json",
  async: false,
  success: function (res) {
    data = res;
  },
  error: function () {
    alert("An error was encountered.");
  },
});
let compareHtml = `<div class="card-body">
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
                <input type="text" class="form-control h-100" name="associateName" id="currentSearch.associateName"
                    placeholder="Associate Name" formControlName="currentSearch.name">
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
</div>`;

let htmlExtractTool = new HtmlTool();
let sH = new StringHelper();
const oHC  = new ObjectHelperClass();


function wrapWithTag(value="",_class="",eAttr="",tag="div"){
  let nl ='\n'
  if(eAttr === "" && _class!=="") return `<${tag} class="${_class}" ${eAttr}>\n\t${value}\n</${tag}>`
  return `<${tag} ${eAttr}>\n\t${value}\n</${tag}>`;
}
function genPageHeader(jhi) {
  let exJhiAttr = htmlExtractTool.extractAttribute(jhi, "jhiTranslate");
  let exJhiVal = htmlExtractTool.extractAttributeValue(exJhiAttr);
  return `<div ${jhi} class="page-head">
      ${oHC.getObjectValue(data, exJhiVal)}
  </div>`;
}
function genPageHeaderButtons(compareHtml){
    let buttonDiv = htmlExtractTool.extractHtmlTag2(compareHtml,'div','class="col-.*? text-right')
    let buttons = htmlExtractTool.extractAllTagWithAttr(buttonDiv,'button');
    let buttonsHtml = ``;
    for(let button of buttons){
        button = htmlExtractTool.removeAttribute(button, 'class');
        button = htmlExtractTool.addAttribute(button,'class="btn-dark-blue"')
        buttonsHtml+=button;
    }
    let wrapButton  = wrapWithTag(buttonsHtml,'flex gap-3')
    return wrapButton
}
// wrapWithTag("w-full",value)
// wrapWithTag("page-body",value)
// wrapWithTag("flex w-1/2 gap-2",value)
// wrapWithTag("flex justify-between items-center p-3",value)

// wrapWithTag("flex gap-3",value)
// wrapWithTag("p-3",value)
// wrapWithTag("paginator-container",value)
function indentAllLines(text,noOfIndentations=1){
    return text.replaceAll(/^/gm,'\t'.repeat(noOfIndentations))
}
function generateSearchForm(compareHtml){
    let formTag = htmlExtractTool.extractHtmlTag(compareHtml, "form", "searchForm");
    let divs = htmlExtractTool.extractAllTagWithAttr(formTag, "div", "col-2");
    let attrArr=[];
    let html = ``
    for (let div of divs) {
      let input = htmlExtractTool.extractHtmlTag(div, "(input)", "", true);
      let select = htmlExtractTool.extractHtmlTag(div,"select")
      if(!input && !select) continue;
      else if(input)  {
         html+= handleInput(input,'i')
      }
      else if(select)   {
         html+= handleInput(select,'s')
      }
      else console.warn("something is different",input)
    }
    return html;
}
function genTheadRow(jhi){
    let attrVal = htmlExtractTool.extractAttributeValue(jhi);
    return indentAllLines(`<th ${jhi}>${oHC.getObjectValue(data,attrVal)}</th>\n`)
}
function genThRows(compareHtml){
    let table = htmlExtractTool.extractHtmlTag(compareHtml, "table");
    let thead = htmlExtractTool.extractHtmlTag(table, "thead");
    let thRows = htmlExtractTool.extractAllTagWithAttr(thead, "th");
    let html =``
    for(let thRow of thRows){
        let jhi = htmlExtractTool.extractAttribute(thRow,'jhiTranslate');
        if(jhi){
            html+= genTheadRow(jhi);
        }
    }
    html+=`\t<th>Actions</th>`
    html = wrapWithTag(html,'','','tr')
    html = wrapWithTag(html,'','','thead')
    return html;
}
function cleanSpanButton(html){
    let span =htmlExtractTool.extractHtmlTag(html,'span')
    if(!span) return html
    let jhi = htmlExtractTool.extractAttribute(span,'jhiTranslate');
    let jhiVal = htmlExtractTool.extractAttributeValue(jhi);
    let repl = htmlExtractTool.replaceWithErrorHandle(html,'',"",span);
    repl = htmlExtractTool.replaceValueOfTag(repl,oHC.getObjectValue(data,jhiVal));
    return htmlExtractTool.addAttribute(repl,jhi)+'\n';
}
function genTbRows(compareHtml){
    let table = htmlExtractTool.extractHtmlTag(compareHtml, "table");
    let tbody = htmlExtractTool.extractHtmlTag(table, "tbody");
    let ngIfNoRes = htmlExtractTool.matchWithErrorHandle(tbody,'<tr[\\n\\s.]*?\\*ngIf="![.\\s\\S\\n]*?</tr>')
    console.log(ngIfNoRes)
    let ngif= htmlExtractTool.extractAttribute(ngIfNoRes,'\\*ngIf')
    let tr = htmlExtractTool.extractHtmlTag(tbody, "tr","\\*ngFor=");
    let ngFor = htmlExtractTool.extractAttribute(tr,'\\*ngFor')
    let tdRows = htmlExtractTool.extractAllTagWithAttr(tr, "td");
    // console.log(thRows)
    let html =``
    let noResHtml = ``
    for(let tdRow of tdRows){
        console.log(tdRow)
        if(htmlExtractTool.isPresent(tdRow,'<div[.\\n\\S\\s]*?<button')){
            let buttons  = htmlExtractTool.extractAllTagWithAttr(tdRow,'button')
            let buttonsHtml  = ``;
            for(let button of buttons){
                button = htmlExtractTool.removeAttribute(button,'type')
                button = htmlExtractTool.removeAttribute(button,'class')
                button =  htmlExtractTool.addAttribute(button,'class="link"')
                button = cleanSpanButton(button);
                buttonsHtml+=button;
            }
            buttonsHtml = wrapWithTag(buttonsHtml,'flex items-center gap-2') 
            
            buttonsHtml =wrapWithTag(buttonsHtml,'','','td')
            html+=buttonsHtml
        }else{
            if(tdRow.includes('noResultsFound')){
                noResHtml+=wrapWithTag(tdRow,'',ngif,'tr');
            }else{
                html+= tdRow;
            }
        }
        // let jhi = htmlExtractTool.extractAttribute(thRow,'jhiTranslate');
        // if(jhi){
        //     html+= genTheadRow(jhi);
        // }
    }
    html = wrapWithTag(html,'',ngFor,'tr')
    if(noResHtml){
        html+=noResHtml;
    }
    html = wrapWithTag(html,'','','tbody')
    return html;
}
// console.log(genTbRows(compareHtml))
function generateTableWithPag(compareHtml){
    let html = ``;
    html+= genThRows(compareHtml)
    html+= genTbRows(compareHtml)
    html = wrapWithTag(html,'table-box','','table')+'\n' 
    html+=generatePaginator(getLastNgIf(compareHtml))
    html = '\n<!---TABLE-->\n'+wrapWithTag(html,'p-3')
    return html

}
function genPage(compareHtml){
    let firstH6 = htmlExtractTool.extractHtmlTag(compareHtml, "h6")
    let jhi = htmlExtractTool.extractAttribute(firstH6,'jhiTranslate');
    let header = genPageHeader(jhi)
    let html =  generateSearchForm(compareHtml)
    html = addSrchNClrButtons(html);
    html+=genPageHeaderButtons(compareHtml);
    html = indentAllLines(html);
    html = wrapWithTag(html,"flex flex-wrap items-center p-3 gap-4 border-t")
    html += `\n<jhi-alert></jhi-alert>\n`
    html+= generateTableWithPag(compareHtml);
    html = `<!---HEAD-->\n`+html;
    html = wrapWithTag(html,"page-body")
    html = header+'\n'+html;
    html = wrapWithTag(html,'w-full')
    return html.trim();
}
// console.log(genPage(compareHtml).trim());

function getLastNgIf(html){
    let regexp  =new RegExp(`\\*ngIf=".*?"(?=[.\\s\\n]*?style="background-color: #f8f9fa;")`)
    let ngif = htmlExtractTool.extractAttribute(html.match(regexp)[0],'\\*ngIf')
    return ngif;
}
// console.log(generateTableWithPag(compareHtml))
// console.log(htmlExtractTool.extractAttribute(compareHtml,'\\*ngIf[.\\s\\S\\n]*(?=background-color: #f8f9fa)'))
// console.log()

function generatePaginator(ngIf) {
    return `<div class="paginator-container" ${ngIf} >
          <mat-paginator
            [length]="totalItems"
            [pageSize]="itemsPerPage"
            [pageIndex]="page"
            [pageSizeOptions]="[5, 10, 15, 25, 50]"
            [showFirstLastButtons]="true"
            (page)="loadPage($event)"
          >
          </mat-paginator>
        </div>`
}
// console.log(htmlExtractTool.extractAttribute(compareHtml,'\\*ngIf','',true))


function handleInput(input,type) {
    input = htmlExtractTool.removeAttribute(input,'class');

    input = htmlExtractTool.removeAttribute(input,'type');
    input = htmlExtractTool.addAttribute(input,'type="search"')
    input = wrapWithTag(input,"",`type="search" class="search-box"` )
    return input+'\n';
}
function addSrchNClrButtons(html){
    return html+`
<button class="btn-dark-blue" (click)="search()">Search</button>\n
<button class="link" (click)="clear()" *ngIf="currentSearch">Clear</button>\n`
}
 
function generateTabBody(tabStructureArr) {
  let tabHtml = ``;
  for (let [i, tabStructure] of tabStructureArr.entries()) {
    tabHtml += `\t<!---- TAB ${i + 1} ---->\n
  <div *ngIf="tabIndex == ${i}" class="font-medium">\n`;
    tabHtml += generateTrs(tabStructure);
    tabHtml += `\t</div>\n`;
  }
  tabHtml = wrapRowDataWithDiv(tabHtml);
  return tabHtml;
}
function generateShowPageMainBody(htmlText) {
  let showPageMainBodyHtml = ``;
  if (getAllTabs(htmlText).length === 0) {
    let trs = getAllTr(htmlText);
    let createdTrStructureObj = createTrStructureObj(trs);
    let genTrs = generateTrs({ oneTime: createdTrStructureObj });
    showPageMainBodyHtml = wrapRowDataWithDiv(genTrs);
  } else {
    showPageMainBodyHtml += generateTabHeader(createTabStructureObj(htmlText));
    showPageMainBodyHtml += generateTabBody(createTabStructureObj(htmlText));
  }
  return showPageMainBodyHtml;
}

function generateEntireListPageHtml(htmlText) {
  let html = ``;
  return html;
}

let setUpUI = new SetupUI(genPage);


//   if(type === 'i'){
//     console.log(input)
//   }else if(type === 's'){
//     console.log()
//   }else{
//     console.log("Else reached")
//   }
// function genPageBody()
//let str  = 'encoreclientApp.associates.home.heading'
// let arr = str.split('.').map((a)=>[a])
// let i = 0; while(arr.length!==0){ res = arr[i];arr.shift() }
// console.log(encoreclientApp)

    // let formControl = htmlExtractTool.extractAttribute(input,'(\\[\\(ngModel\\)\\]|formControlName)')
    // input = htmlExtractTool.removeAttribute(input,'(\\[\\(ngModel\\)\\]|formControlName)');
    // input = htmlExtractTool.addAttribute(input,'formControl')
// function genSrchBxHtml(){
//   wrapWithTag()

//   for()
// }


  // attr = htmlExtractTool.extractAttribute(input, "type");
  // if(attr){
  //   attrArr.push(attr);
  // }

// function wrap(openTag,value,closeTag){
//   let nl ='\n'
//   return `${openTag+nl+value+nl+closeTag}`
// }
// function wrapDataWithDiv(value) {
//   return `<div class="w-full">${value}</div>`;
// }
// function wrapWithPageBody(value) {
//   return `<div class="page-body">${value}</div>`;
  
// }
// function generateSearchForm() {
//   return `<div class="flex w-1/2 gap-2">`+`</div>`;
// }