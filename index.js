const modelFileStr = `package com.sensei.encore.maininterface.controllers.customers.customer;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.EnumSet;
import java.util.List;
import java.util.Locale;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.sensei.encore.application.dto.CustomerAssociateDto;
import com.sensei.encore.application.dto.CustomerDto;
import com.sensei.encore.application.dto.EnumerationDto;
import com.sensei.encore.application.dto.NameValueDto;
import com.sensei.encore.application.facade.BankServiceFacade;
import com.sensei.encore.application.facade.CustomerServiceFacade;
import com.sensei.encore.application.facade.EnumerationServiceFacade;
import com.sensei.encore.application.specifications.FindCustomerAssociateSpecification;
import com.sensei.encore.basedomain.model.calendar.Calendar;
import com.sensei.encore.basedomain.model.calendar.Tenure;
import com.sensei.encore.basedomain.model.calendar.TimeUnit;
import com.sensei.encore.basedomain.model.customer.CustomerAssociate.CustomerAssociateType;
import com.sensei.encore.maininterface.controllers.support.ControllerExceptionHandler;
import com.sensei.encore.maininterface.controllers.support.WebUtils;
import com.sensei.encore.util.entity.PaginatedList;
import com.sensei.encore.util.exception.ProgramException;

@RequestMapping("/customers/customer/customerAssociate")
@Controller
public class CustomerAssociateController {
	private static final Logger log = LoggerFactory.getLogger(CustomerAssociateController.class);
	@Inject
    private MessageSource messageSource;
	@Inject
	private CustomerServiceFacade customerService;
	@Inject
	private BankServiceFacade bankService;
	@Inject
	private EnumerationServiceFacade enumService;
	@Inject
	private ControllerExceptionHandler controllerExceptionHandler;
	
	@ModelAttribute("relation")
	public List<EnumerationDto> populateRelation(Locale locale) {
		EnumerationDto dto = new EnumerationDto();
		dto.setCode("");
		dto.setName(messageSource.getMessage("select_default_option", new String[0], locale));
		List<EnumerationDto> list = new ArrayList<>();
		list.add(dto);
		list.addAll(enumService.findEnumerations("RelationshipWithCustomer"));
		return list;
	}

    @ModelAttribute("associateTypes")
    public List<NameValueDto> populateAssociateType(Locale locale) {
    	List<NameValueDto> list= new ArrayList<>();
    	list.add(new NameValueDto("", messageSource.getMessage("select_default_option", new String[0], locale)));
        for(CustomerAssociateType aom : EnumSet.allOf(CustomerAssociateType.class)) {
        	list.add(new NameValueDto(aom.name(), aom.displayName()));
        }
        return list;		
    }
   
    @Secured("ROLE_CreateCustomerAssociate")
    @RequestMapping(method = RequestMethod.POST, produces = "text/html")
    public String create(@Valid CustomerAssociateDto customerAssociateDto, BindingResult bindingResult, Model uiModel, HttpServletRequest httpServletRequest, 
    		Locale locale, RedirectAttributes redirectAttributes) throws Exception {
    	try {
    		String customerId = customerAssociateDto.getCustomerId();
        	if (customerId != null && !customerId.isEmpty()) {
        		CustomerDto customer = customerService.findCustomer(customerId);
            	if(customer == null)
            		bindingResult.addError(new FieldError("customerAssociateDto", "customerId", messageSource.getMessage("label_customerId_not_exit_message", new String []{customerId},locale)));
        	}
        	if (Calendar.after(customerAssociateDto.getEffectiveDate(), customerAssociateDto.getExpiryDate()) || Calendar.equals(customerAssociateDto.getEffectiveDate(), customerAssociateDto.getExpiryDate()))
        		bindingResult.addError(new FieldError("customerAssociateDto", "customerAssociateDto.expiryDate", messageSource.getMessage("label_expirydate_error_message", new String []{""},locale)));
    		if (bindingResult.hasErrors()) {    		
                populateEditForm(uiModel, locale, customerAssociateDto);   
                return  "redirect:/customers/customer/customerAssociate/create";
            }
	        customerService.saveCustomerAssociate(customerAssociateDto);
	        redirectAttributes.addFlashAttribute(WebUtils.SUCCESS_MESSAGE, messageSource.getMessage("label_customer_associate_saved_successfully", new String[] 
	        		{customerAssociateDto.getAssociateType().displayName(), customerAssociateDto.getCustomerId()}, locale));
	        return "redirect:/customers/customer/customerAssociate/" + WebUtils.encodeUrlPathSegment(customerAssociateDto.getId() + "", httpServletRequest);
        }
        catch (ProgramException e) {
    		controllerExceptionHandler.handleException("customerAssociateDto", e, Arrays.asList(new String []{"status"}), 
    					uiModel, bindingResult, messageSource, locale);
        	populateEditForm(uiModel, locale, customerAssociateDto);
        	return "customers/customer/customerAssociate/create";
    	}
    }
    @Secured("ROLE_UpdateCustomerAssociate")
    @RequestMapping(method = RequestMethod.PUT, produces = "text/html")
    public String update(@Valid CustomerAssociateDto customerAssociateDto, BindingResult bindingResult, Model uiModel, 
    		HttpServletRequest httpServletRequest, Locale locale, RedirectAttributes redirectAttributes) throws Exception{
    	try {
    		if (Calendar.after(customerAssociateDto.getEffectiveDate(), customerAssociateDto.getExpiryDate()) || Calendar.equals(customerAssociateDto.getEffectiveDate(), customerAssociateDto.getExpiryDate()))
        		bindingResult.addError(new FieldError("customerAssociateDto", "expiryDate", messageSource.getMessage("label_expirydate_error_message", new String []{""},locale)));
    		if (bindingResult.hasErrors()) {    		
                populateEditForm(uiModel, locale, customerAssociateDto);
                return "customers/customer/customerAssociate/update";
            }
	        customerService.saveCustomerAssociate(customerAssociateDto);
	        redirectAttributes.addFlashAttribute(WebUtils.SUCCESS_MESSAGE, messageSource.getMessage("label_customer_associate_updated_successfully", new String[] 
	        		{customerAssociateDto.getAssociateType().displayName(), customerAssociateDto.getCustomerId()}, locale));
	        return "redirect:/customers/customer/customerAssociate/" + WebUtils.encodeUrlPathSegment(customerAssociateDto.getId() + "", httpServletRequest);
        }
        catch (ProgramException e) {
        	controllerExceptionHandler.handleException("customerAssociateDto", e, Arrays.asList(new String []{"associateType"}), 
					uiModel, bindingResult, messageSource, locale);
        	populateEditForm(uiModel, locale, customerAssociateDto);
        	return "customers/customer/customerAssociate/update";
    	}
    }
    @Secured("ROLE_CreateCustomerAssociate")
    @RequestMapping(params = "form", produces = "text/html")
    public String createForm(Model uiModel, Locale locale){
    	LocalDate currentdate = bankService.findBank().getCurrentWorkingDate();
    	CustomerAssociateDto customerAssociateDto = new CustomerAssociateDto();
    	customerAssociateDto.setEffectiveDate(currentdate);
    	customerAssociateDto.setExpiryDate(currentdate);
        populateEditForm(uiModel, locale, customerAssociateDto);
        return "customers/customer/customerAssociate/create";
    }
    @Secured("ROLE_CreateCustomerAssociate")
    @RequestMapping(value="/createAssociate/{customerId}", produces = "text/html")
    public String createPrecheckForm(@PathVariable("customerId") String customerId, Model uiModel, Locale locale){
    	Calendar calendar = new Calendar();
    	LocalDate currentdate = bankService.findBank().getCurrentWorkingDate();
    	CustomerAssociateDto customerAssociateDto = new CustomerAssociateDto();
    	customerAssociateDto.setCustomerId(customerId);
    	customerAssociateDto.setEffectiveDate(calendar.moveByTenure(currentdate, new Tenure(-5, TimeUnit.YEAR)));
    	customerAssociateDto.setExpiryDate(calendar.moveByTenure(currentdate, new Tenure(50, TimeUnit.YEAR)));
        populateEditForm(uiModel, locale, customerAssociateDto);
        return "customers/customer/customerAssociate/create";
    }
   
    @Secured("ROLE_ShowCustomerAssociate")
    @RequestMapping(value = "/{id}", produces = "text/html")
    public String show(@PathVariable("id") Long id, Model uiModel) {    
    	WebUtils.addDateTimeFormatPatterns(uiModel);
    	CustomerAssociateDto customerAssociateDto = customerService.findCustomerAssociateById(id);
        uiModel.addAttribute("customerAssociateDto", customerAssociateDto);
        uiModel.addAttribute("itemId", id);
        return "customers/customer/customerAssociate/show";
    }
    @Secured("ROLE_ListCustomerAssociates")
    @RequestMapping(produces = "text/html")
    public String list(@RequestParam(value = "customerId", required = false) String customerId, @RequestParam(value = "associateType", required = false) String associatetype, 
    		@RequestParam(value = "name", required = false) String name, @RequestParam(value = "page", required = false) Integer page,
    		@RequestParam(value = "size", required = false) Integer size, Model uiModel) {
		
        FindCustomerAssociateSpecification specification = new FindCustomerAssociateSpecification(customerId, associatetype, name);
		uiModel.addAttribute("specification", specification);
		Integer sizeNo = size == null ? 10 : size;
		sizeNo = sizeNo > 25 ? 25 : sizeNo;
        final Integer firstResult = page == null ? 0 : (page - 1) * sizeNo;

        PaginatedList<CustomerAssociateDto> list = customerService.findCustomerAssociates(specification, firstResult, sizeNo);
        uiModel.addAttribute("customerAssociates", list.getResults());
		
        float nrOfPages = (float) list.getTotalResults() / sizeNo;
        uiModel.addAttribute("maxPages", (int) ((nrOfPages > (int) nrOfPages || nrOfPages == 0.0) ? nrOfPages + 1 : nrOfPages));
        uiModel.addAttribute("customerId", customerId);
        WebUtils.addDateTimeFormatPatterns(uiModel);
        return "customers/customer/customerAssociate/list";
    }
    @Secured("ROLE_UpdateCustomerAssociate")
    @RequestMapping(value = "/{id}", params = "form", produces = "text/html")
    public String updateForm(@PathVariable("id") Long id, Model uiModel, Locale locale) {
        CustomerAssociateDto customer = customerService.findCustomerAssociateById(id);
        populateEditForm(uiModel, locale, customer);
        return "customers/customer/customerAssociate/update";
    }
    @Secured("ROLE_DeleteCustomerAssociate")
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE, produces = "text/html")
    public String delete(@PathVariable("id") Long id, @RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "size", required = false) Integer size,
    		Model uiModel, Locale locale, RedirectAttributes redirectAttributes) {
		
        CustomerAssociateDto customerAssociateDto = customerService.findCustomerAssociateById(id);
        try {
	        customerService.removeCustomerAssociate(customerAssociateDto);
	        uiModel.asMap().clear();
	        uiModel.addAttribute("page", (page == null) ? "1" : page.toString());
	        uiModel.addAttribute("size", (size == null) ? "10" : size.toString());
	        redirectAttributes.addFlashAttribute(WebUtils.SUCCESS_MESSAGE, messageSource.getMessage("label_customer_deleted_successfully", new String[] 
	        		{customerAssociateDto.getAssociateType().displayName(), customerAssociateDto.getCustomerId()}, locale));
	        return "redirect:/customers/customer/customerAssociate";
        } catch (DataIntegrityViolationException e) {
        	redirectAttributes.addAttribute(WebUtils.APPLICATION_ERROR_CODE, messageSource.getMessage("label_customer_deleted_failure", new String[] 
        			{customerAssociateDto.getAssociateType().displayName(), customerAssociateDto.getCustomerId()}, locale));
        	populateEditForm(uiModel, locale, customerAssociateDto);
        	return "redirect:/customers/customer/customerAssociate";
		} catch (Exception e) {
			redirectAttributes.addAttribute(WebUtils.APPLICATION_ERROR_CODE, e.getMessage());
        	populateEditForm(uiModel, locale, customerAssociateDto);
        	return "redirect:/customers/customer/customerAssociate";
		}
    }
      
    void populateEditForm(Model uiModel, Locale locale, CustomerAssociateDto customerAssociateDto) {
        uiModel.addAttribute("customerAssociateDto", customerAssociateDto);
        populateAssociateType(locale);
        WebUtils.addDateTimeFormatPatterns(uiModel);
    }
    
        
}`
function StepExtractor(text,step,isStr=true){
	return isStr ? text.match(step).join(" ") : text.match(step);
}
function getMatch(str,regexp) {
	return str.match(regexp);
}
function replaceStr(str,regexp,repVal){
	return str.replace(regexp,repVal)
}
let firstRegexpStr = '@ModelAttribute\\(.*\\)|@RequestMapping\\(.*\\)'
const firstStepExtractionRegExp = new RegExp(firstRegexpStr,'g');
const secondStepExtractionRegExp = new RegExp('\\((.*?)\\)','g');

let firstStepExtractionResultStr = StepExtractor(modelFileStr,firstStepExtractionRegExp);
let secondStepExtractionResult = StepExtractor(firstStepExtractionResultStr,secondStepExtractionRegExp,false) 
let res = secondStepExtractionResult
let copyModelFileStr = modelFileStr

function getModifiedInfo(str,regexp,repStr=""){
  let maxMatchIteration = 20;
  let matchIteration = 0;
  let matchIndexArray = [];
  let modifiedStr = str
  while( getMatch(modifiedStr,regexp) &&  matchIteration<maxMatchIteration){
    matchIndexArray.push(getMatch(modifiedStr,new RegExp(regexp)));
    modifiedStr = replaceStr(modifiedStr,new RegExp(regexp),repStr)
    /* console.log( replaceStr(copyModelFileStr,new RegExp(regexp),"")) */
    matchIteration++;
  }
  return [matchIndexArray,modifiedStr];
}
function insertTextToString(str,pos,text){
  return [str.slice(0,pos),text,str.slice(pos)].join('');
}
function findLastImport(str,word=""){
  // const old = '/(\bimport\b)(?!(\n|.)*\b\1\b).*)/'
  // /(\btotal\b)(?!.*\b\1\b)/
  return str.match( /(\bimport com\b)(?!(\n|.)*\b\1\b).*/);
}
function getLastIndex(str){
  const match = findLastImport(str)
  return match[0].length + match.index;
} 

// console.log(getModifiedInfo(modelFileStr,firstRegexpStr))
let [matchInfo,modifiedStr] = getModifiedInfo(modelFileStr,firstRegexpStr);
const revMatchInfo = matchInfo.reverse();
revMatchInfo.forEach((info) => {
  
  let modelAttr = getMatch(info[0],new RegExp('@ModelAttribute\\(.*\\)'));
  let reqMap = getMatch(info[0],new RegExp('@RequestMapping\\(.*\\)'));
  let firstReqMap  = getMatch(info[0],new RegExp('@RequestMapping\\(".*?"\\)'))
  if(modelAttr){
    let insideModelValue = getMatch(info[0],new RegExp('\\".*\\"'))[0].slice(1,-1);
    insideModelValue = 'get'+insideModelValue.charAt(0).toUpperCase()+insideModelValue.slice(1);
    const textToInsert = `@RequestMapping(value = "${insideModelValue}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)`;
    modifiedStr = insertTextToString(modifiedStr,info.index,textToInsert)
  }else if(reqMap){
    let insReqVal  = getMatch(info[0],new RegExp('@RequestMapping\\(.*\\)'))[0]
    let value;
    let method='GET';
    const methodTypes = ['GET', 'POST', 'PUT', 'DELETE'];
    try{
       value = insReqVal.match(new RegExp('value.*?\\".*?\\",'))[0].match(`\\".*\\"`)[0].slice(1,-1);
    }catch(e){
      value =""
    }
    try{
      methodTypes.forEach(curMethod => 
        {
          if(insReqVal.match(new RegExp('method.*?,'))[0].match(curMethod)){
            method = curMethod
          }
        }
      );
      
    }catch(e){
    }

    let textToInsert = `@RequestMapping(value = "${value}", method = RequestMethod.${method}, produces = MediaType.APPLICATION_JSON_VALUE)`;
    if(firstReqMap){
      textToInsert = `@RequestMapping("/api/")`
    }
    modifiedStr = insertTextToString(modifiedStr,info.index,textToInsert)
    // console.log(insReqVal);
    // let replaceText = value.match(new RegExp('value.*\\".*\\",'))[0].match(`\\".*\\"`)[0].slice(1,-1);
  }else{
    // console.log(info[0])
    if(!info[0].match('Model')){
    }
  }
}, null);
// remove method populateEditForm
function addImport(insertStr,modifyStr){ 
  insertStr.trim().split('\n').forEach(str=>{
    if(!modifyStr.includes(str)){
      console.log(str.trim())
      modifyStr = insertTextToString(modifyStr,getLastIndex(modifyStr),'\n'+str.trim())
    }
  })
  return modifyStr;
}
let importString = `	
  \nimport org.springframework.http.HttpHeaders;
  import org.springframework.web.bind.annotation.RequestBody;	
  import com.sensei.encore.maininterface.web.util.PaginationUtil;
  import org.springframework.http.HttpStatus;
  import org.springframework.http.MediaType;
  import org.springframework.http.ResponseEntity;
  import org.springframework.web.bind.annotation.PathVariable;
  import org.springframework.web.bind.annotation.RequestMapping;
  import org.springframework.web.bind.annotation.RequestMethod;
  import org.springframework.web.bind.annotation.RequestParam;
  import org.springframework.web.bind.annotation.RestController;`
  modifiedStr=addImport(importString,modifiedStr)
// modifiedStr = insertTextToString(modifiedStr,getLastIndex(modelFileStr),importString)
function removeMethod(str,name,repVal=""){
  // replaceStr(modifiedStr,new RegExp('\\\n.*?void.*?populateEditForm(.|\\\n\\\s)*'),"")
  
  return replaceStr(str,new RegExp('\\\n*?.*.+\\\s+'+name+'\\\s*\\((.|\\\n)*?\\).*?\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{[^{}]*\\})*\\})*\\})*\\})*\\})*\\})*\\}','i'),repVal)
}
function removeMethods(array,str) {
  array.forEach((methodName)=>{
    str = removeMethod(str,methodName);
  })
  return str;
}
modifiedStr = removeMethods(['populateEditForm','editForm','updateForm','populateRelation','populateAssociateType'],modifiedStr);
console.log(modifiedStr)
// var position = 6;
/* var output = [a.slice(0, position), b, a.slice(position)].join(''); */



// \((?:[^()]+|\((?:[^()]+|\([^()]*\))*\))*\)
// https://stackoverflow.com/questions/17759004/how-to-match-string-within-parentheses-nested-in-java/17759264#17759264
// https://stackoverflow.com/questions/546433/regular-expression-to-match-balanced-parentheses
// \([^()]*\)
// basically it says find regex such that between opening and closing paranthesis there must not be 

// ('\\\n*?\\b\\\w+\\b\\\s+'+name+'\\\s*\\((.|\\\n)*\\).*?\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{[^{}]*\\})*\\})*\\})*\\})*\\})*\\})*\\}','i')