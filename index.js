const modelFileStr = ` @ModelAttribute("associateTypes")
public List<NameValueDto> populateAssociateType(Locale locale) {
		List<NameValueDto> list= new ArrayList<>();
		list.add(new NameValueDto("", messageSource.getMessage("select_default_option", new String[0], locale)));
		for(LoanAssociateType aom : EnumSet.allOf(LoanAssociateType.class)) {
				list.add(new NameValueDto(aom.name(), aom.displayName()));
		}
		return list;        
}@Secured("ROLE_ListLoanOdAssociates")
@RequestMapping(value = "/listAssociates/{accountId}", produces = "text/html")
public String listAssociates(@PathVariable("accountId") String accountId, Model uiModel, Locale locale, RedirectAttributes redirectAttributes) throws ProgramException {
		List<LoanOdAssociateDto> associateDtos = loanOdService.findLoanOdAssociates(accountId);
		uiModel.addAttribute("associateDtos", associateDtos);
		uiModel.addAttribute("accountId", accountId);
		WebUtils.addDateTimeFormatPatterns(uiModel);
		return "loans/accounts/loanOd/loanOdAssociates/list";
}
@Secured("ROLE_CreateLoanOdAssociate")
@RequestMapping(value = "/createAssociate/{accountId}", produces = "text/html")
public String createLoanOdAssociate(@PathVariable("accountId") String accountId, Model uiModel, Locale locale, RedirectAttributes redirectAttributes) throws ProgramException {
		LoanOdAssociateDto loanOdAssociateDto = new LoanOdAssociateDto();
		loanOdAssociateDto.setAccountId(accountId);
		uiModel.addAttribute("loanOdAssociateDto", loanOdAssociateDto);
		WebUtils.addDateTimeFormatPatterns(uiModel);
		return "loans/accounts/loanOd/loanOdAssociates/create";
}

@Secured("ROLE_CreateLoanOdAssociate")
@RequestMapping(value = "/createAssociate", method = RequestMethod.POST, produces = "text/html")
public String createLoanOdAssociate(@Valid LoanOdAssociateDto loanOdAssociateDto, BindingResult bindingResult, Model uiModel, Locale locale, 
				HttpServletRequest httpServletRequest, RedirectAttributes redirectAttributes) throws ProgramException {
		String associateId = loanOdAssociateDto.getAssociateId();
		try{
				if (loanOdAssociateDto.getAssociateType() == LoanAssociateType.GUARANTOR && associateId != null && !associateId.isEmpty()) {
						CustomerDto customer = customerService.findCustomer(associateId);
						if(customer == null)
								bindingResult.addError(new FieldError("loanOdAssociateDto", "associateId", messageSource.getMessage("label_customerId_not_exit_message", new String []{associateId},locale)));
				}
				if (bindingResult.hasErrors()) {
						uiModel.addAttribute("loanOdAssociateDto", loanOdAssociateDto);
						return "loans/accounts/loanOd/loanOdAssociates/create";
				}
				uiModel.asMap().clear();
				loanOdService.createLoanOdAssociate(loanOdAssociateDto);
				redirectAttributes.addFlashAttribute(WebUtils.SUCCESS_MESSAGE, messageSource.getMessage("label_account_associate_saved_successfully", new String[] {loanOdAssociateDto.getAccountId()}, locale));
				return "redirect:/loans/accounts/loanOd/loanOdAssociates/" + WebUtils.encodeUrlPathSegment("" + loanOdAssociateDto.getId(), httpServletRequest);
		}
		catch (ProgramException e){
				redirectAttributes.addFlashAttribute(WebUtils.APPLICATION_ERROR_CODE, e.getMessage());
				uiModel.addAttribute("loanOdAssociateDto", loanOdAssociateDto);
				return "redirect:/loans/accounts/loanOd/loanOdAssociates";
		}
}
@Secured("ROLE_ShowLoanOdAssociate")
@RequestMapping(value = "/loanOdAssociates/{id}", produces = "text/html")
public String showLoanOdAssociate(@PathVariable("id") Long id, Model uiModel) {
		LoanOdAssociateDto loanOdAssociateDto = loanOdService.findLoanOdAssociateById(id);
		uiModel.addAttribute("loanOdAssociateDto", loanOdAssociateDto);
		uiModel.addAttribute("itemId", id);
		uiModel.addAttribute("accountId", loanOdAssociateDto.getAccountId());
		WebUtils.addDateTimeFormatPatterns(uiModel);
		return "loans/accounts/loanOd/loanOdAssociates/show";            
}
@Secured("ROLE_DeleteLoanOdAssociate")
@RequestMapping(value = "/loanOdAssociates/{id}", method = RequestMethod.DELETE, produces = "text/html")
public String delete(@PathVariable("id") Long id, @RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "size", required = false) Integer size, 
				Model uiModel, HttpServletRequest httpServletRequest) throws ProgramException {
		LoanOdAssociateDto associateDto = loanOdService.findLoanOdAssociateById(id);
		loanOdService.removeLoanOdAssociate(associateDto);
		uiModel.asMap().clear();
		uiModel.addAttribute("page", (page == null) ? "1" : page.toString());
		uiModel.addAttribute("size", (size == null) ? "10" : size.toString());
		return "redirect:/loans/accounts/loanOd/listAssociates/" + WebUtils.encodeUrlPathSegment("" + associateDto.getAccountId(), httpServletRequest);
}
@Secured("ROLE_UpdateLoanOdAssociate")
@RequestMapping(value = "/loanOdAssociates/{id}", params = "form", produces = "text/html")
public String updateLoanOdAssociate(@PathVariable("id") Long id, Model uiModel) {
		LoanOdAssociateDto loanOdAssociateDto = loanOdService.findLoanOdAssociateById(id);
		uiModel.addAttribute("loanOdAssociateDto", loanOdAssociateDto);
		WebUtils.addDateTimeFormatPatterns(uiModel);
		return "loans/accounts/loanOd/loanOdAssociates/update";
}

@Secured("ROLE_UpdateLoanOdAssociate")
@RequestMapping(value = "/loanOdAssociates", method = RequestMethod.PUT, produces = "text/html")
public String updateLoanOdAssociate(@Valid LoanOdAssociateDto loanOdAssociateDto, BindingResult bindingResult, Model uiModel,
				HttpServletRequest httpServletRequest, Locale locale, RedirectAttributes redirectAttributes) throws ProgramException{
		String associateId = loanOdAssociateDto.getAssociateId();
		try{    
				if (loanOdAssociateDto.getAssociateType() == LoanAssociateType.GUARANTOR && associateId != null && !associateId.isEmpty()) {
						CustomerDto customer = customerService.findCustomer(associateId);
						if(customer == null)
								bindingResult.addError(new FieldError("loanOdAssociateDto", "associateId", messageSource.getMessage("label_customerId_not_exit_message", new String []{associateId},locale)));
				}
				if (bindingResult.hasErrors()) {
						populateAssociateType(locale);
						uiModel.addAttribute("loanOdAssociateDto", loanOdAssociateDto);
						return "loans/accounts/loanOd/loanOdAssociates/update";
				}
				uiModel.asMap().clear();
				loanOdService.updateLoanOdAssociate(loanOdAssociateDto);
				redirectAttributes.addFlashAttribute(WebUtils.SUCCESS_MESSAGE, messageSource.getMessage("label_account_associate_updated_successfully", new String[] {loanOdAssociateDto.getAccountId()}, locale));
				return "redirect:/loans/accounts/loanOd/loanOdAssociates/" + WebUtils.encodeUrlPathSegment("" + loanOdAssociateDto.getId(), httpServletRequest);
		}
		catch (ProgramException e){
				redirectAttributes.addFlashAttribute(WebUtils.APPLICATION_ERROR_CODE, e.getMessage());
				uiModel.addAttribute("loanOdAssociateDto", loanOdAssociateDto);
				return "redirect:/loans/accounts/loanOd/loanOdAssociates";
		}
}
@Secured({"ROLE_UploadLoanAssociateXLS"})
@RequestMapping(value = "uploadLoanAssociates", method = RequestMethod.POST, produces = "text/html")
public String uploadLoanAssociateXls(@Valid FileDto fileData, BindingResult bindingResult, Model uiModel, HttpServletRequest request, Locale locale, 
	RedirectAttributes redirectAttributes, HttpServletResponse response) {
	uiModel.asMap().clear();
	try {
		MultipartFile file = fileData.getFileData();
		if (file.getSize() == 0) {
			redirectAttributes.addFlashAttribute(WebUtils.SUCCESS_MESSAGE, messageSource.getMessage("label_file_upload_error", new String[] {""}, locale));
			return "redirect:/loans/accounts/loanOd?bulkActions";
		}
		String fileName = file.getOriginalFilename();
		FileLocator fileLocator = new FileLocator();
		if (!fileLocator.isValidExcelFile(fileName)) {
			redirectAttributes.addFlashAttribute(WebUtils.SUCCESS_MESSAGE, messageSource.getMessage("label_file_name_error", new String[] {fileName}, locale));
			return "redirect:/loans/accounts/loanOd?bulkActions";
		}
		List<LoanOdAssociateDto> loanOdAssociateDtos = loanOdAssociateAssembler.fromLoanAssociateXls(file.getInputStream());
		for (LoanOdAssociateDto loanAssociateDto : loanOdAssociateDtos) {
		try {
			loanOdService.createLoanOdAssociate(loanAssociateDto);
		} catch (Exception e) {
			String errorMessage = ((loanAssociateDto.getAccountId() == null)?"":loanAssociateDto.getAccountId())+":"+e.getMessage();
			loanAssociateDto.setAccountId("ERROR:"+errorMessage);
		}
		}
		int mid = fileName.lastIndexOf(".");
		fileName = fileName.substring(0,mid);
	response.setContentType("application/vnd.ms-excel");
		response.setHeader("Content-Disposition", "attachment;filename="+fileName+".xls");
		loanOdAssociateAssembler.toLoanAssociateXls(response.getOutputStream(), loanOdAssociateDtos);
return null;
} catch (ProgramException e) {
		logger.error("Error in loan associate upload", e);
String errorMessage = e.getErrorCode();
redirectAttributes.addFlashAttribute(WebUtils.SUCCESS_MESSAGE, messageSource.getMessage("label_account_associate_saved_error", new String[] {"'" +errorMessage+"'"}, locale));
return "redirect:/loans/accounts/loanOd?bulkActions";
} catch (Exception e) {
		logger.error("Error in loan associate upload", e);
String errorMessage = e.getMessage();
redirectAttributes.addFlashAttribute(WebUtils.SUCCESS_MESSAGE, messageSource.getMessage("label_account_associate_saved_error", new String[] {"'" +errorMessage+"'"}, locale));
return "redirect:/loans/accounts/loanOd?bulkActions";
}
}
`
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
  import org.springframework.web.bind.annotation.RestController;
  import com.sensei.encore.maininterface.web.util.PaginationUtil;
import org.springframework.http.HttpHeaders;
  `
// modifiedStr=addImport(importString,modifiedStr)
// modifiedStr = insertTextToString(modifiedStr,getLastIndex(modelFileStr),importString)
function removeMethod(str,name,repVal=""){
  // replaceStr(modifiedStr,new RegExp('\\\n.*?void.*?populateEditForm(.|\\\n\\\s)*'),"")
  console.log(str.match(new RegExp('\\\n*?.*.+\\\s+'+name+'\\\s*\\((.|\\\n)*?\\).*?\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{[^{}]*\\})*\\})*\\})*\\})*\\})*\\})*\\}')));
  console.log(" See below ");
  console.log(str.match(new RegExp('\\\n*?.*.+\\\s+create\\\s*\\((.|\\\n)*?\\).*?\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{[^{}]*\\})*\\})*\\})*\\})*\\})*\\})*\\}')));
  console.log("See above\n\n")
  return replaceStr(str,new RegExp('\\\n*?.*.+\\\s+'+name+'\\\s*\\((.|\\\n)*?\\).*?\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{[^{}]*\\})*\\})*\\})*\\})*\\})*\\})*\\}'),repVal)
}
function removeMethods(array,str) {
  array.forEach((methodName)=>{
    str = removeMethod(str,methodName);
  })
  return str;
}
modifiedStr = removeMethods(['populateEditForm','editForm','updateForm','createForm'],modifiedStr);
console.log(modifiedStr)
// var position = 6;
/* var output = [a.slice(0, position), b, a.slice(position)].join(''); */



// \((?:[^()]+|\((?:[^()]+|\([^()]*\))*\))*\)
// https://stackoverflow.com/questions/17759004/how-to-match-string-within-parentheses-nested-in-java/17759264#17759264
// https://stackoverflow.com/questions/546433/regular-expression-to-match-balanced-parentheses
// \([^()]*\)
// basically it says find regex such that between opening and closing paranthesis there must not be 

// ('\\\n*?\\b\\\w+\\b\\\s+'+name+'\\\s*\\((.|\\\n)*\\).*?\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{[^{}]*\\})*\\})*\\})*\\})*\\})*\\})*\\}','i')