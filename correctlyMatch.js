
let html =`
<div *ngIf="dataIsAvailable">
  <fieldset class="reactiveForm" ngModelGroup="demography">
    <div>&nbsp;</div>
    <div class="row mb-3 d-flex align-items-center">
      <div class="text-right form-group col-3">
        <label
          class="form-control-label"
          jhiTranslate="encoreclientApp.profile.caste"
          for="field_caste"
          >Caste</label
        >
        <span> : </span>
      </div>
      <div class="col-2 p-0">
        <input
          type="text"
          class="form-control"
          name="caste"
          #caste="ngModel"
          id="field_caste"
          [(ngModel)]="profile.demography.caste"
        />
        <ig-input [inputField]="caste" [inputErrors]="caste?.errors"></ig-input>
      </div>
      <div class="col-7"></div>

      <div class="text-right form-group col-3">
        <label
          class="form-control-label"
          jhiTranslate="encoreclientApp.profile.religion"
          for="field_religion"
          >religion</label
        >
        <span> : </span>
      </div>
      <div class="col-2 p-0">
        <input
          type="text"
          class="form-control"
          name="religion"
          #religion="ngModel"
          id="field_religion"
          [(ngModel)]="profile.demography.religion"
        />
        <ig-input
          [inputField]="religion"
          [inputErrors]="religion?.errors"
        ></ig-input>
      </div>
      <div class="col-7"></div>

      <div class="text-right form-group col-3">
        <label
          class="form-control-label"
          jhiTranslate="encoreclientApp.profile.nationality"
          for="field_nationality"
          >nationality</label
        >
        <span> : </span>
      </div>
      <div class="col-2 p-0">
        <input
          type="text"
          class="form-control"
          name="nationality"
          #nationality="ngModel"
          id="field_nationality"
          [(ngModel)]="profile.demography.nationality"
        />
        <ig-input
          [inputField]="nationality"
          [inputErrors]="nationality?.errors"
        ></ig-input>
      </div>
      <div class="col-7"></div>

      <div class="text-right form-group col-3">
        <label
          class="form-control-label"
          jhiTranslate="encoreclientApp.profile.occupation"
          for="field_occupation"
          >occupation</label
        >
        <span> : </span>
      </div>
      <div class="col-2 p-0">
        <select
          class="form-control"
          name="occupation"
          #occupation="ngModel"
          id="field_occupation"
          [(ngModel)]="profile.demography.occupation"
        >
          <option selected [ngValue]="defaultValue">
            -- Select an option --
          </option>
          <option
            *ngFor="let occupation of occupationList"
            [value]="occupation.code"
          >
            {{occupation.name}}
          </option>
        </select>
        <ig-input
          [inputField]="occupation"
          [inputErrors]="occupation?.errors"
        ></ig-input>
      </div>
      <div class="col-7"></div>

      <div class="text-right form-group col-3">
        <label
          class="form-control-label"
          jhiTranslate="encoreclientApp.profile.employment"
          for="field_employment"
          >employment</label
        >
        <span> : </span>
      </div>
      <div class="col-2 p-0">
        <select
          class="form-control"
          name="employment"
          #employment="ngModel"
          id="field_employment"
          [(ngModel)]="profile.demography.employment"
        >
          <option selected [ngValue]="defaultValue">
            -- Select an option --
          </option>
          <option
            *ngFor="let employment of employmentList"
            [value]="employment.code"
          >
            {{employment.name}}
          </option>
        </select>
        <ig-input
          [inputField]="employment"
          [inputErrors]="employment?.errors"
        ></ig-input>
      </div>
      <div class="col-7"></div>

      <div class="text-right form-group col-3">
        <label
          class="form-control-label"
          jhiTranslate="encoreclientApp.profile.language1"
          for="field_language1"
          >language1</label
        >
        <span> : </span>
      </div>
      <div class="col-2 p-0">
        <select
          class="form-control"
          name="language1"
          #language1="ngModel"
          id="field_language1"
          [(ngModel)]="profile.demography.language1"
        >
          <option selected [ngValue]="defaultValue">
            -- Select an option --
          </option>
          <option *ngFor="let language of languageList" [value]="language.code">
            {{language.name}}
          </option>
        </select>
        <ig-input
          [inputField]="language1"
          [inputErrors]="language1?.errors"
        ></ig-input>
      </div>

      <div class="form-group col-1">
        <label
          class="form-control-label"
          jhiTranslate="encoreclientApp.profile.languageProficiency1"
          for="field_languageProficiency1"
          >languageProficiency1</label
        >
        <span> : </span>
      </div>
      <div class="col-2 p-0">
        <select
          class="form-control"
          name="languageProficiency1"
          #languageProficiency1="ngModel"
          id="field_languageProficiency1"
          [(ngModel)]="profile.demography.languageProficiency1"
        >
          <option selected [ngValue]="defaultValue">
            -- Select an option --
          </option>
          <option
            *ngFor="let languageProficiency of languageProficiencyList"
            [value]="languageProficiency.code"
          >
            {{languageProficiency.name}}
          </option>
        </select>
        <ig-input
          [inputField]="languageProficiency1"
          [inputErrors]="languageProficiency1?.errors"
        ></ig-input>
      </div>
      <div class="col-2"></div>

      <div class="text-right form-group col-3">
        <label
          class="form-control-label"
          jhiTranslate="encoreclientApp.profile.language2"
          for="field_language2"
          >language2</label
        >
        <span> : </span>
      </div>
      <div class="col-2 p-0">
        <select
          class="form-control"
          name="language2"
          #language2="ngModel"
          id="field_language2"
          [(ngModel)]="profile.demography.language2"
        >
          <option selected [ngValue]="defaultValue">
            -- Select an option --
          </option>
          <option *ngFor="let language of languageList" [value]="language.code">
            {{language.name}}
          </option>
        </select>
        <ig-input
          [inputField]="language2"
          [inputErrors]="language2?.errors"
        ></ig-input>
      </div>
      <div class="form-group col-1">
        <label
          class="form-control-label"
          jhiTranslate="encoreclientApp.profile.languageProficiency2"
          for="field_languageProficiency2"
          >languageProficiency2</label
        >
        <span> : </span>
      </div>
      <div class="col-2 p-0">
        <select
          class="form-control"
          name="languageProficiency2"
          #languageProficiency2="ngModel"
          id="field_languageProficiency2"
          [(ngModel)]="profile.demography.languageProficiency2"
        >
          <option selected [ngValue]="defaultValue">
            -- Select an option --
          </option>
          <option
            *ngFor="let languageProficiency of languageProficiencyList"
            [value]="languageProficiency.code"
          >
            {{languageProficiency.name}}
          </option>
        </select>
        <ig-input
          [inputField]="languageProficiency2"
          [inputErrors]="languageProficiency2?.errors"
        ></ig-input>
      </div>
      <div class="col-2"></div>

      <div class="text-right form-group col-3">
        <label
          class="form-control-label"
          jhiTranslate="encoreclientApp.profile.language3"
          for="field_language3"
          >language3</label
        >
        <span> : </span>
      </div>
      <div class="col-2 p-0">
        <select
          class="form-control"
          name="language3"
          #language3="ngModel"
          id="field_language3"
          [(ngModel)]="profile.demography.language3"
        >
          <option selected [ngValue]="defaultValue">
            -- Select an option --
          </option>
          <option *ngFor="let language of languageList" [value]="language.code">
            {{language.name}}
          </option>
        </select>
        <ig-input
          [inputField]="language3"
          [inputErrors]="language3?.errors"
        ></ig-input>
      </div>

      <div class="text-right form-group col-1">
        <label
          class="form-control-label"
          jhiTranslate="encoreclientApp.profile.languageProficiency3"
          for="field_languageProficiency3"
          >languageProficiency3</label
        >
        <span> : </span>
      </div>
      <div class="col-2 p-0">
        <select
          class="form-control"
          name="languageProficiency3"
          #languageProficiency3="ngModel"
          id="field_languageProficiency3"
          [(ngModel)]="profile.demography.languageProficiency3"
        >
          <option selected [ngValue]="defaultValue">
            -- Select an option --
          </option>
          <option
            *ngFor="let languageProficiency of languageProficiencyList"
            [value]="languageProficiency.code"
          >
            {{languageProficiency.name}}
          </option>
        </select>
        <ig-input
          [inputField]="languageProficiency3"
          [inputErrors]="languageProficiency3?.errors"
        ></ig-input>
      </div>
      <div class="col-2"></div>

      <div class="text-right form-group col-3">
        <label
          class="form-control-label"
          jhiTranslate="encoreclientApp.profile.education"
          for="field_education"
          >education</label
        >
        <span> : </span>
      </div>
      <div class="col-2 p-0">
        <select
          class="form-control"
          name="education"
          #education="ngModel"
          id="field_education"
          [(ngModel)]="profile.demography.education"
        >
          <option selected [ngValue]="defaultValue">
            -- Select an option --
          </option>
          <option
            *ngFor="let education of educationList"
            [value]="education.code"
          >
            {{education.name}}
          </option>
        </select>
        <ig-input
          [inputField]="education"
          [inputErrors]="education?.errors"
        ></ig-input>
      </div>
      <div class="col-7"></div>

      <div class="text-right form-group col-3">
        <label
          class="form-control-label"
          jhiTranslate="encoreclientApp.profile.annualIncome"
          for="field_annualIncome"
          >annualIncome</label
        >
        <span> : </span>
      </div>
      <div class="col-2 p-0">
        <input
          type="text"
          class="form-control"
          name="annualIncome"
          #annualIncome="ngModel"
          id="field_annualIncome"
          [(ngModel)]="profile.demography.annualIncome"
        />
        <ig-input
          [inputField]="annualIncome"
          [inputErrors]="annualIncome?.errors"
        ></ig-input>
      </div>
      <div class="col-7"></div>

      <div class="text-right form-group col-3">
        <label
          class="form-control-label"
          jhiTranslate="encoreclientApp.profile.segment"
          for="field_segment"
          >segment</label
        >
        <span> : </span>
      </div>
      <div class="col-2 p-0">
        <select
          class="form-control"
          name="segment"
          #segment="ngModel"
          id="field_segment"
          [(ngModel)]="profile.demography.segment"
        >
          <option selected [ngValue]="defaultValue">
            -- Select an option --
          </option>
          <option *ngFor="let segment of segmentList" [value]="segment.code">
            {{segment.name}}
          </option>
        </select>
        <ig-input
          [inputField]="segment"
          [inputErrors]="segment?.errors"
        ></ig-input>
      </div>
      <div class="col-7"></div>

      <div class="text-right form-group col-3">
        <label
          class="form-control-label"
          jhiTranslate="encoreclientApp.profile.residenceType"
          for="field_residenceType"
          >residenceType</label
        >
        <span> : </span>
      </div>
      <div class="col-2 p-0">
        <select
          class="form-control"
          name="residenceType"
          #residenceType="ngModel"
          id="field_residenceType"
          [(ngModel)]="profile.demography.residenceType"
        >
          <option selected [ngValue]="defaultValue">
            -- Select an option --
          </option>
          <option
            *ngFor="let residenceType of residenceTypeList"
            [value]="residenceType.code"
          >
            {{residenceType.name}}
          </option>
        </select>
        <ig-input
          [inputField]="residenceType"
          [inputErrors]="residenceType?.errors"
        ></ig-input>
      </div>
      <div class="col-7"></div>

      <div class="text-right form-group col-3">
        <label
          class="form-control-label"
          jhiTranslate="encoreclientApp.profile.sector"
          for="field_sector"
          >sector</label
        >
        <span> : </span>
      </div>
      <div class="col-2 p-0">
        <select
          class="form-control"
          name="sector"
          #sector="ngModel"
          id="field_sector"
          [(ngModel)]="profile.demography.sector"
        >
          <option selected [ngValue]="defaultValue">
            -- Select an option --
          </option>
          <option *ngFor="let sector of sectorList" [value]="sector.code">
            {{sector.name}}
          </option>
        </select>
        <ig-input
          [inputField]="sector"
          [inputErrors]="sector?.errors"
        ></ig-input>
      </div>
      <div class="col-7"></div>

      <div class="text-right form-group col-3">
        <label
          class="form-control-label"
          jhiTranslate="encoreclientApp.profile.domicileStatus"
          for="field_domicileStatus"
          >domicileStatus</label
        >
        <span> : </span>
      </div>
      <div class="col-2 p-0">
        <select
          class="form-control"
          name="domicileStatusCode"
          #domicileStatusCode="ngModel"
          id="field_domicileStatus"
          [(ngModel)]="profile.domicileStatus"
        >
          <option selected [ngValue]="defaultValue">
            -- Select an option --
          </option>
          <option
            *ngFor="let domicileStatus of domicileStatusList"
            [value]="domicileStatus.code"
          >
            {{domicileStatus.name}}
          </option>
        </select>
        <ig-input
          [inputField]="domicileStatus"
          [inputErrors]="domicileStatus?.errors"
        ></ig-input>
      </div>
      <div class="col-7"></div>
    </div>
  </fieldset>
</div>`;

function getSpaceBeforeTagRegex(tag,attr=''){
  return `^[\\s]*?(?=<${tag}[.\\s\\t\\n]*?${attr}[.\\n\\s\\S\\t]*?>$)`;
}
function getStartingSpacesOfTag(html,tag,attr=''){
  let regex = getSpaceBeforeTagRegex(tag,attr)
  console.log(html.match(new RegExp(regex,'m')))
  return html.match(new RegExp(regex,'m'))[0].split(' ').length-1;
}
function getOCRegex(nSpace,tag,attr){
  return '^'+'\\s'.repeat(nSpace)+`<${tag}[.\\n\\s\\t]*?[\\S]{0,3}[.\\n\\s\\t]*?${attr}[.\\n\\s\\S\\t]*?>[.\\n\\s\\S\\t]*?^${'\\s'.repeat(nSpace)}</${tag}>`
}
function getHtmlTag(html,tag,attr=''){
  let n = getStartingSpacesOfTag(html,tag,attr)
  let regex = getOCRegex(n,tag,attr);
  return html.match(new RegExp(regex,'m'))[0];
}
// function getHtmlTag(html,tag,attr=''){ 
  
// }
// let startSpaces = getStartingSpacesOfTag(html,'div',`class="row\\smb-3\\sd-flex`)
let genOc = getHtmlTag(html,"div",`class="row\\smb-3\\sd-flex`)
console.log(genOc)
// console.log(html.match()[0])