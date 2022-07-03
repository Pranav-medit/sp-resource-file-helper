let html =`

  <div class="w-full">
    <div class="page-head" jhiTranslate="${baseJhi}.home.heading">List All Associates</div>
    <div class="page-body">
      <!---HEAD-->
      <div class="flex justify-between items-center p-3">
        <div class="flex w-1/2 gap-2">
            <div type="search" class="search-box">
                <input type="search"  name="customerId" id="currentSearch.customerId"
                    placeholder="Customer Id" [(ngModel)]="currentSearch.customerId">
            </div>
            <div class="search-box">
              <select type="search"  name="associateType" id="field_associateType"
                      [(ngModel)]="currentSearch.associateType">
                      <option selected value="">--Select Associate Type--</option>
                      <option *ngFor="let associateType of associateTypeList" [value]="associateType.code">
                          {{associateType.name}}
                      </option>
                  </select>
            </div>
            <div class="search-box">
                <input type="search"  name="associateName" id="currentSearch.associateName"
                    placeholder="Associate Name" [(ngModel)]="currentSearch.name">
            </div>
          <button class="btn-dark-blue" (click)="search()">Search</button>
          <button class="link" (click)="clear()" *ngIf="currentSearch">Clear</button>
        </div>
        <div class="flex gap-3">
          <button class="btn-dark-blue" jhiTranslate="${baseJhi}.home.createLabel" (click)="createAssociate()" *jhiHasAnyAuthority="['ROLE_CreateCustomerAssociate']">New Associates</button>
        </div>
      </div>
      <jhi-alert></jhi-alert>
      <!---TABLE-->
      <div class="p-3">
        <table class="table-box">
          <thead>
            <tr>		
                <th jhiTranslate="encoreclientApp.associates.associateName">Associate Name</th>
                <th jhiTranslate="encoreclientApp.associates.customerId">CustomerID</th>
                <th jhiTranslate="encoreclientApp.associates.associateType">Associate Type</th>
                <th jhiTranslate="encoreclientApp.associates.effectiveDate">Effective Date</th>
                <th jhiTranslate="encoreclientApp.associates.expiryDate">Expiry Date</th>
                <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let associate of associates ;trackBy: trackId">
                <td>{{associate.displayName}}</td>
                <td>{{associate.customerId}}</td>
                <td>{{associate.associateType}}</td>
                <td>{{associate.effectiveDate | date:'mediumDate'}}</td>
                <td>{{associate.expiryDate | date:'mediumDate'}}</td>
              <td>
                <div class="flex items-center gap-2">
                    <button class="link" [routerLink]="['view', associate.id ]"  *jhiHasAnyAuthority="['ROLE_ShowLoanProduct']" jhiTranslate="entity.action.view">View</button>
                    <button class="link" [routerLink]="['edit', associate.id]"   *jhiHasAnyAuthority="['ROLE_UpdateLoanProduct'] " jhiTranslate="entity.action.edit">Edit</button>
                    <button class="link" (click)="delete(associate.id)"  *jhiHasAnyAuthority="['ROLE_DeleteCustomerAssociate']" jhiTranslate="entity.action.delete">Delete</button>
                </div>
              </td>
              <!-- <td>
                <button class="flex items-center gap-1 text-sky-600" [matMenuTriggerFor]="l">
                  <span> Actions</span>
                  <span class="material-icons"> expand_more </span>
                </button>
                <mat-menu #l="matMenu">
                  <div class="flex flex-col">
                    <div class="w-full text-slate-700">
                      <button class="w-full px-3 py-2 text-left hover:bg-gray-200">View</button>
                      <button class="w-full px-3 py-2 text-left hover:bg-gray-200">Edit</button>
                    </div>
                  </div>
                </mat-menu>
              </td> -->
            </tr>
          </tbody>
        </table>
  
        <div class="paginator-container" *ngIf="associates && associates.length">
          <mat-paginator
            [length]="totalItems"
            [pageSize]="itemsPerPage"
            [pageIndex]="page"
            [pageSizeOptions]="[5, 10, 15, 25, 50]"
            [showFirstLastButtons]="true"
            (page)="loadPage($event)"
          >
          </mat-paginator>
        </div>
      </div>
    </div>
  </div>`

  let html2 = `
  <div class="card-body">
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
  </div>
  `