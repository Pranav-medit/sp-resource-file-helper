let resourceFile = `package com.sensei.encore.maininterface.resources;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.security.access.annotation.Secured;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.sensei.encore.application.dto.EnumerationDto;
import com.sensei.encore.application.dto.NameValueDto;
import com.sensei.encore.application.dto.ProvisioningSlabDto;
import com.sensei.encore.application.dto.ProvisioningTableDto;
import com.sensei.encore.application.facade.EnumerationServiceFacade;
import com.sensei.encore.application.facade.LoanOdServiceFacade;
import com.sensei.encore.application.specifications.FindProvisioningTableSpecification;
import com.sensei.encore.loandomain.model.DemandOffsetSequence;
import com.sensei.encore.loandomain.model.LoanOdProduct.DpdType;
import com.sensei.encore.loandomain.model.ProvisioningTable.AssetCategoryChangeBasis;
import com.sensei.encore.loandomain.model.ProvisioningTable.ProvisioningBasis;
import com.sensei.encore.util.entity.PaginatedList;
import com.sensei.encore.util.exception.ProgramException;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.http.HttpStatus;
import com.sensei.encore.maininterface.web.util.PaginationUtil;
import org.springframework.http.HttpHeaders;

@RequestMapping("/api/provisioning-table")
@RestController
public class ProvisioningTablesResource {
	@Inject
	private LoanOdServiceFacade loanOdService;	
	@Inject
	private EnumerationServiceFacade enumerationService; 
	private static final Logger log = LoggerFactory.getLogger(CustomerAssociateResource.class);
	@RequestMapping(value = "getDpdTypes", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<NameValueDto> getDpdTypes() {
		List<NameValueDto> list = new ArrayList<>();
		for (DpdType aom : EnumSet.allOf(DpdType.class))
			list.add(new NameValueDto(aom.name(), aom.displayName()));
		return list;
	}
	@RequestMapping(value = "getProvisioningBasis", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<NameValueDto>> getProvisioningBasis(){
		List<NameValueDto> list = new ArrayList<>();
		for(ProvisioningBasis aom : EnumSet.allOf(ProvisioningBasis.class))
			list.add(new NameValueDto(aom.name(), aom.displayName()));
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
	@RequestMapping(value = "getAssetCategoryChangeBasis", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<NameValueDto>> getAssetCategoryChangeBasis() {
		List<NameValueDto> list = new ArrayList<>();
		for (AssetCategoryChangeBasis aom : EnumSet.allOf(AssetCategoryChangeBasis.class))
			list.add(new NameValueDto(aom.name(), aom.displayName()));
		return new ResponseEntity<>(list,HttpStatus.OK);
	}
	@RequestMapping(value = "getDemandOffsetSequences", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<NameValueDto>> getDemandOffsetSequences() {
		List<NameValueDto> list = new ArrayList<>();
		for (DemandOffsetSequence aom : EnumSet.allOf(DemandOffsetSequence.class))
			list.add(new NameValueDto(aom.name(), aom.displayName()));
		return new ResponseEntity<>(list,HttpStatus.OK);
	}
	@RequestMapping(value = "getAssetCategories", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<NameValueDto>> getAssetCategories() {
		List<NameValueDto> list= new ArrayList<>();
		List<EnumerationDto> enumerationDtos = enumerationService.findEnumerations("AssetCategory");			
		for (EnumerationDto ed:enumerationDtos)
        	list.add(new NameValueDto(ed.getCode(), ed.getName()));
        return new ResponseEntity<>(list,HttpStatus.OK);	
	}
	@Secured({"ROLE_CreateProvisioningTable"})
    @RequestMapping(value = "/create", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> create(@RequestBody @Valid ProvisioningTableDto provisioningTable,  
    		HttpServletRequest request) {
    	provisioningTable.trimSlabs();
        try {
	    	List<ProvisioningSlabDto> slabs = provisioningTable.getSlabs();
	        for (ProvisioningSlabDto slab : slabs) {
	            slab.setProvisioningTableCode(provisioningTable.getProvisioningTableCode());
	        }
	        loanOdService.createProvisioningTable(provisioningTable);
	        return new ResponseEntity<>(provisioningTable,HttpStatus.OK);
        } catch (Exception e) {
        	log.error("Error in Create provision", e);
			return new ResponseEntity<>(e.getLocalizedMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
    }
	
    @Secured("ROLE_ShowProvisioningTable")
    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ProvisioningTableDto> show(@PathVariable("id") Long id) {
    	ProvisioningTableDto provisionTableDto = loanOdService.findProvisioningTableById(id);
        return new ResponseEntity<>(provisionTableDto,HttpStatus.OK);
    }
    @Secured("ROLE_ListProvisioningTables")
    @RequestMapping(value = "/list", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PaginatedList<ProvisioningTableDto> > list(
		@RequestParam(value = "provisioningTableCode", 
		required = false) String provisioningTableCode, 
		@RequestParam(value = "description",
		required = false) String description,  
		@RequestParam(value = "page",
		required = false) Integer page,
		@RequestParam(value = "size", required = false) Integer size
	) {
		FindProvisioningTableSpecification specifications = new FindProvisioningTableSpecification(provisioningTableCode,description);
        int sizeNo = size == null ? 10 : size;
        sizeNo = java.lang.Math.min(sizeNo, 25);
        final int firstResult = page == null ? 0 : (page - 1) * sizeNo;
        PaginatedList<ProvisioningTableDto> list=loanOdService.findProvisioningTables(specifications,firstResult, sizeNo);
        HttpHeaders httpHeaders = PaginationUtil.generatePaginationHttpHeaders(page, sizeNo, list.getTotalResults(), "/list");
        return  ResponseEntity.ok().headers(httpHeaders).body(list);
    }
    @Secured({"ROLE_UpdateProvisioningTable", "ROLE_UpdateProvisioningTable_MCQ"})
    @RequestMapping(value = "", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> update(
    		@RequestBody @Valid ProvisioningTableDto provisioningTable
    		) throws ProgramException {
    	provisioningTable.trimSlabs();
    	List<ProvisioningSlabDto> slabs = provisioningTable.getSlabs();
        for (ProvisioningSlabDto slab : slabs) {
            slab.setProvisioningTableCode(provisioningTable.getProvisioningTableCode());
        }
        try {
        	loanOdService.updateProvisioningTable(provisioningTable);
        } catch (Exception e) {
        	log.error("Error in Update provision", e);
			return new ResponseEntity<>(e.getLocalizedMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
        return new ResponseEntity<>(provisioningTable,HttpStatus.OK);
    }
    @Secured("ROLE_DeleteProvisioningTable")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?>  delete(
    		@PathVariable("id") Long id
    	) throws ProgramException {
    	try {
    		ProvisioningTableDto provisioningTable = loanOdService.findProvisioningTableById(id);
        	loanOdService.remove(provisioningTable);
        	return new ResponseEntity<>(HttpStatus.OK);
    	}catch(Exception e) {
    		log.error("Error in Delete customer associate", e);
			return new ResponseEntity<>(e.getLocalizedMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    	
    }
}
`
let methodMap = {
  'GET':'get',
  'PUT':'put',
  'POST':'post',
  'DELETE':'delete'
}
// let regex = /@RequestMapping\s*\(\s*value\s*=\s*".*"/g
let regex = /@RequestMapping\((\s|.)*?\)/g
let matchArray = resourceFile.match(regex);
let str=``
matchArray.forEach(reqMap=>{
  try{
    
    let method = reqMap.match(/RequestMethod\..*?,/)[0].replaceAll(/(RequestMethod|\.|,)/g,'');
    let resourceUrl = reqMap.match(/value\s*?=\s*?".*?",/)[0].replace(/(value|\"|=|,)/g,"").trim()
    if(resourceUrl.charAt(0)==='/')resourceUrl = resourceUrl.slice(1)

    console.log(`"${resourceUrl}" : "${baseUrlBuilder(resourceUrl)}",`)

    if(method === "GET"){
      if(resourceUrl.includes('{id}'))
      str+=`
      ${resourceUrl}(): Observable<any> {
        return this.http.${methodMap[method]}<any>(this.resourceUrl+"/${resourceUrl}");
      }`
    }else if(method === "POST"){
      
    }else if(method === "PUT"){
  
    }else{
  
    }
  }catch(e){
    console.log(e);
  }
})
function baseUrlBuilder(urlFragment){
  return `http://localhost:8080/encore/api/provision-table/`+urlFragment
}
// console.log(str)

// return this.http.post(this.resourceUrl + '/makerChecker/execute', copy, options);
// const copy: Associates = Object.assign({}, associateDto);
// let formData: FormData = new FormData();
// formData.append('customerAssociates', JSON.stringify(copy));
// console.log(resourceFile.match(regex).join(" ").match(/".*?"/g));