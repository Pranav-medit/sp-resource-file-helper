let compareHtml =`<div *ngIf="profile" class="card-body">
<jhi-alert></jhi-alert>
<div class="row">
    <div class="col-8">
        <h6 class="card-title" jhiTranslate="encoreclientApp.profile.detail.title">Show profile</h6>
    </div>
</div>
<ngb-tabset>
    <ngb-tab title="Basic">
        <ng-template ngbTabContent>
            <img src="{{BASE_URL}}api/profiles/showImage/{{customerId}}" alt="" height="120px" width="120px"
                class="m-2 rounded float-right" />
            <table class="mb-3">
                <tbody>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.customerName"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.displayName}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.customerId"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.customerId}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.branchCode"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.branchCode}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.salutation"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.salutation}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.gender"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.gender}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.maritialStatus"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.maritalStatus}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.dateOfBirth"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.dateOfBirth | date:'mediumDate'}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.motherName"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.displayMotherName}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.fatherOrSpouseName"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.displayFatherName}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.customerType"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.customerType}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.guardianCustomerId"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.guardianCustomerId}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.relationshipWithCustomer"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.relationshipWithCustomer}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.relationship"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.relationshipManager}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.relationshipManagerEmailId"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.relationshipManagerEmailId}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.nomineeCustomerId"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.nomineeCustomerId}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.nomineeRelationshipType"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.nomineeRelationshipType}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.organizationName"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.organizationName}}</td>
                    </tr>
                    <!-- <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.guarantorLimit"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.guarantorLimit?.displayValue}}</td>
                    </tr> -->
                    <!-- <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.loanLimit"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.loanLimit?.displayValue}}</td>
                    </tr> -->
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.referenceCustomerId1"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.referenceCustomerId1}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.referenceCustomerId2"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.referenceCustomerId2}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.referenceName"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.referenceName}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.referencePhone"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.referencePhone}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.referenceRelationshipType"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.referenceRelationshipType}}</td>
                    </tr>



                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.status"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.status}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.dateOfExpiry"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.dateOfExpiry | date:'mediumDate' }}</td>
                    </tr>
                </tbody>
            </table>
        </ng-template>
    </ngb-tab>
    <ngb-tab title="Identification">
        <ng-template ngbTabContent>
            <table class="mb-3">
                <tbody>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.pan"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.pan}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.uidNum"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.uidNum}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.gstin"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.gstin}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.registrationNo"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.registrationNo}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.cin"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.cin}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.tag"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.tag}}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="p-2 text-secondary">
                            <h6 jhiTranslate="encoreclientApp.profile.identification1">Identification 1</h6>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.documentType"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.identification1?.documentType}}</td>
                    </tr>
                    <tr *ngIf="profile.identification1 && profile.identification1.documentType">
                        <td></td>
                        <td><a href="{{BASE_URL}}api/profiles/downloadIdentification1DocumentType/{{customerId}}"
                                jhiTranslate="entity.action.download">Download</a></td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.proofType"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.identification1?.proofType}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.documentNumber"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.identification1?.documentNumber}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.dateOfIssue"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.identification1?.dateOfIssue | date:'mediumDate'}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.dateOfExpiry"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.identification1?.dateOfExpiry | date:'mediumDate'}}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="p-2 text-secondary">
                            <h6 jhiTranslate="encoreclientApp.profile.identification2">Identification 2</h6>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.documentType"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.identification2?.documentType}}</td>
                    </tr>
                    <tr *ngIf="profile.identification2 && profile.identification2.documentType">
                        <td></td>
                        <td><a href="{{BASE_URL}}api/profiles/downloadIdentification2DocumentType/{{customerId}}"
                                jhiTranslate="entity.action.download">Download</a></td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.proofType"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.identification2?.proofType}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.documentNumber"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.identification2?.documentNumber}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.dateOfIssue"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.identification2?.dateOfIssue | date:'mediumDate'}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.dateOfExpiry"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.identification2?.dateOfExpiry | date:'mediumDate'}}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="p-2 text-secondary">
                            <h6 jhiTranslate="encoreclientApp.profile.identification3">Identification 3</h6>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.documentType"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.identification3?.documentType}}</td>
                    </tr>
                    <tr *ngIf="profile.identification3 && profile.identification3.documentType">
                        <td></td>
                        <td><a href="{{BASE_URL}}api/profiles/downloadIdentification2DocumentType/{{customerId}}"
                                jhiTranslate="entity.action.download">Download</a></td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.proofType"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.identification3?.proofType}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.documentNumber"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.identification3?.documentNumber}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.dateOfIssue"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.identification3?.dateOfIssue | date:'mediumDate'}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.dateOfExpiry"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.identification3?.dateOfExpiry | date:'mediumDate'}}</td>
                    </tr>
                </tbody>
            </table>
        </ng-template>
    </ngb-tab>
    <ngb-tab title="Demography">
        <ng-template ngbTabContent>
            <table class="mb-3">
                <tbody>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.caste"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.demography?.caste}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.religion"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.demography?.religion}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.nationality"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.demography?.nationality}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.occupation"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.demography?.occupation}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.employment"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.demography?.employment}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.language1"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.demography?.language1}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.languageProficiency1"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.demography?.languageProficiency1}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.language2"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.demography?.language2}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.languageProficiency2"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.demography?.languageProficiency2}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.language3"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.demography?.language3}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.languageProficiency3"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.demography?.languageProficiency3}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.education"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.demography?.education}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.annualIncome"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.demography?.annualIncome}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.segment"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.demography?.segment}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.residenceType"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.demography?.residenceType}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.sector"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.demography?.sector}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.domicileStatus"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.domicileStatus}}</td>
                    </tr>
                </tbody>
            </table>
        </ng-template>
    </ngb-tab>
    <ngb-tab title="Contact">
        <ng-template ngbTabContent>
            <table class="mb-3">
                <tbody>
                    <tr>
                        <td></td>
                        <td class="p-2 text-secondary">
                            <h6 jhiTranslate="encoreclientApp.profile.contact1">Contact 1</h6>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.address1"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.contact?.address1}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.address2"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.contact?.address2}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.address3"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.contact?.address3}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.countryCode"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.contact?.countryCode}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.stateCode"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.contact?.stateCode}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.cityCode"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.contact?.cityCode}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.districtCode"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.contact?.districtCode}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.pinCode"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.contact?.pinCode}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.addressType"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.addressType}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.phone1"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.contact?.phone1}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.phone2"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.contact?.phone2}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.email"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.contact?.email}}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="p-2 text-secondary">
                            <h6 jhiTranslate="encoreclientApp.profile.contact2">Contact 2</h6>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.address1"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.altContact1?.address1}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.address2"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.altContact1?.address2}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.address3"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.altContact1?.address3}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.countryCode"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.altContact1?.countryCode}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.stateCode"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.altContact1?.stateCode}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.cityCode"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.altContact1?.cityCode}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.districtCode"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.altContact1?.districtCode}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.pinCode"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.altContact1?.pinCode}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.addressType"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.altAddressType1}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.phone1"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.altContact1?.phone1}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.phone2"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.altContact1?.phone2}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.email"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.altContact1?.email}}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="p-2 text-secondary">
                            <h6 jhiTranslate="encoreclientApp.profile.contact3">Contact 3</h6>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.address1"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.altContact2?.address1}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.address2"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.altContact2?.address2}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.address3"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.altContact2?.address3}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.countryCode"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.altContact2?.countryCode}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.stateCode"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.altContact2?.stateCode}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.cityCode"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.altContact2?.cityCode}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.districtCode"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.altContact2?.districtCode}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.pinCode"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.altContact2?.pinCode}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.addressType"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.altAddressType2}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.phone1"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.altContact2?.phone1}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.phone2"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.altContact2?.phone2}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.email"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.altContact2?.email}}</td>
                    </tr>
                </tbody>
            </table>
        </ng-template>
    </ngb-tab>
    <ngb-tab title="Bank Account">
        <ng-template ngbTabContent>
            <table class="mb-3">
                <tbody>
                    <tr>
                        <td></td>
                        <td class="p-2 text-secondary">
                            <h6 jhiTranslate="encoreclientApp.profile.bankAccount1">Bank Account 1</h6>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.bankName"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.bankAccount1?.bankName}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.branchName"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.bankAccount1?.branchName}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.branchAddress"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.bankAccount1?.branchAddress}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.ifscCode"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.bankAccount1?.ifscCode}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.micrCode"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.bankAccount1?.micrCode}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.accountType"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.bankAccount1?.accountType}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.accountNumber"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.bankAccount1?.accountNumber}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.accountHolderName"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.bankAccount1?.accountHolderName}}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="p-2 text-secondary">
                            <h6 jhiTranslate="encoreclientApp.profile.bankAccount2">Bank Account 2</h6>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.bankName"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.bankAccount2?.bankName}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.branchName"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.bankAccount2?.branchName}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.branchAddress"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.bankAccount2?.branchAddress}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.ifscCode"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.bankAccount2?.ifscCode}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.micrCode"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.bankAccount2?.micrCode}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.accountType"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.bankAccount2?.accountType}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.accountNumber"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.bankAccount2?.accountNumber}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.accountHolderName"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.bankAccount2?.accountHolderName}}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="p-2 text-secondary">
                            <h6 jhiTranslate="encoreclientApp.profile.bankAccount3">Bank Account 3</h6>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.bankName"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.bankAccount3?.bankName}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.branchName"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.bankAccount3?.branchName}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.branchAddress"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.bankAccount3?.branchAddress}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.ifscCode"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.bankAccount3?.ifscCode}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.micrCode"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.bankAccount3?.micrCode}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.accountType"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.bankAccount3?.accountType}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.accountNumber"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.bankAccount3?.accountNumber}}</td>
                    </tr>
                    <tr>
                        <td class="text-right font-weight-bold p-2">
                            <span jhiTranslate="encoreclientApp.profile.accountHolderName"></span>
                            <span> : </span>
                        </td>
                        <td>{{profile.bankAccount3?.accountHolderName}}</td>
                    </tr>
                </tbody>
            </table>
        </ng-template>
    </ngb-tab>
</ngb-tabset>
<button type="submit" (click)="previousState()" class="btn btn-info">
    <span jhiTranslate="entity.action.back"> Back</span>
</button>
<button type="submit" class="btn btn-default ml-2" data-dismiss="modal" [routerLink]="['../../edit', profile.id]">
    <span jhiTranslate="entity.action.edit">Edit</span>
</button>
</div>`

const setUpUI = new SetupUI(generateEntireShowPageHtml);
setUpUI.changeTitles('Old 2 new Show page','N/A');
const hET = new HtmlTool();
const sH = new StringHelper();
const oHC  = new ObjectHelperClass();
const hF = new HtmlFormatter();
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

function wrapWithHeaderHtml2(html,jhi,page) {
  return `
  <div class="bg-white shadow-sm rounded h-full relative" >\n
  <!--Head-->\n
  <div class="flex gap-3 items-center p-3">
    <div class="modal-title" ${jhi}>${page} Details</div>
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
function wrapRowDataWithDiv(str){
    return `
    <!--- Tab Data -->\n
    <div class="p-3 w-full h-full overflow-auto" [ngStyle]="{ height: 'calc(100% - 130px)' }">\n`+str+`\t</div>\n`
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
function dtoExtractorFromDetailDto(str){
    return str.split('.').slice(-3,-2).join('');
}
function generateEntireShowPageHtml(htmlText){
    let html =``;
    html = generateShowPageMainBody(htmlText);
    let  h6 = hET.extractHtmlTag2(htmlText,'h6').trim();
    let jhiVal = hET.extractAttributeValue( hET.extractAttribute(h6,'jhiTranslate'));
    html = wrapWithHeaderHtml2(html,hET.extractAttribute(h6,'jhiTranslate'),
        seperateCharectersUponUppercase(dtoExtractorFromDetailDto(jhiVal),true));
    return html;
}