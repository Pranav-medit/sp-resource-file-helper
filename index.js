const modelFileStr = `
@Secured("ROLE_ListCustomerFiles")
    @RequestMapping(value = "/listCustomerFiles/{customerId}", produces = "text/html")
    public String listLoanFiles(@PathVariable("customerId") String customerId, Model uiModel, Locale locale, RedirectAttributes redirectAttributes) throws ProgramException {
		List<DocumentLinkDto> documentLinks = fileManagerService.findDocumentLinks(DocumentEntityType.CUSTOMER, customerId);
        uiModel.addAttribute("documentLinks", documentLinks);
        uiModel.addAttribute("customerId", customerId);
        WebUtils.addDateTimeFormatPatterns(uiModel);
        return "customers/customer/profile/customerFiles/list";
    }
    @Secured("ROLE_ListCustomerFiles")
	@RequestMapping(value = "/customerFiles/download/{entityType}/{entityId}/{name}", produces = "text/html")
    public String downloadCustomerFiles(@PathVariable("entityType") String entityTypeStr, @PathVariable("entityId") String accountId, @PathVariable("name") String name, HttpServletResponse response) throws Exception{
    	DocumentEntityType entityType = EnumUtils.getEnum(DocumentEntityType.class, entityTypeStr);
		DocumentLinkDto documentLinkDto = fileManagerService.findDocumentLink(entityType, accountId, name);
		String fullFileName= documentLinkDto.getPath();
		String fileName = fullFileName.substring(fullFileName.lastIndexOf(File.separator)+1);
		response.setHeader("Content-Type", "application/octet-stream");
		response.setHeader("Content-Disposition", "attachment;filename=\"" + fileName + "\"");
		try (BufferedInputStream logFileStream = new BufferedInputStream(new FileInputStream(fullFileName)); ServletOutputStream outputStream = response.getOutputStream()){
			byte []readBytes = new byte[1024];
			int numberOfBytesRead;
			while((numberOfBytesRead = logFileStream.read(readBytes)) != -1)
				outputStream.write(readBytes, 0, numberOfBytesRead);
		}
		return null;
	}
	@Secured("ROLE_CreateCustomerFiles")
	@RequestMapping(value = "/createCustomerFile/{accountId}", produces = "text/html")
	public String createCustomerFileForm(@PathVariable("accountId") String accountId, Model uiModel, Locale locale, RedirectAttributes redirectAttributes) {
		DocumentLinkDto documentLink = new DocumentLinkDto();
		documentLink.setEntityType(DocumentEntityType.CUSTOMER);
		documentLink.setEntityId(accountId);
		uiModel.addAttribute("documentLink", documentLink);
		WebUtils.addDateTimeFormatPatterns(uiModel);
		return "customers/customer/profile/customerFiles/create";
	}
	@Secured("ROLE_CreateCustomerFiles")
	@RequestMapping(value = "/createCustomerFile", method = RequestMethod.POST, produces = "text/html")
	public String createCustomerFile(@Valid DocumentLinkDto documentLink, BindingResult bindingResult,
			Model uiModel, DefaultMultipartHttpServletRequest httpServletRequest, Locale locale, RedirectAttributes redirectAttributes) {
		uiModel.asMap().clear();
		try {
			LocalDate currentWorkingDate = bankService.findBank().getCurrentWorkingDate();
    		FileLocator fileLocator = new FileLocator();
    		CommonsMultipartFile fileData = (CommonsMultipartFile) httpServletRequest.getFile("file");
    		if (fileData == null || fileData.isEmpty()) {
        		uiModel.addAttribute("documentLink", documentLink);
            	uiModel.addAttribute(WebUtils.UPLOAD_MESSAGE_CODE, messageSource.getMessage("label_document_file_data_not_provided", new String[] { documentLink.getName() }, locale));
                return "customers/customer/profile/customerFiles/create";
            }
			String fullFileName = fileLocator.copyDocument(UUID.randomUUID().toString(), fileData);
			documentLink.setCreationDate(currentWorkingDate);
			documentLink.setPath(fullFileName);
			fileManagerService.store(documentLink);
			documentLink = fileManagerService.findDocumentLinkById(documentLink.getId());
			redirectAttributes.addFlashAttribute(WebUtils.SUCCESS_MESSAGE, messageSource.getMessage("label_document_link_saved_successfully", new String[] { documentLink.getName() }, locale));
            return "redirect:/customers/customer/profile/listCustomerFiles/" + WebUtils.encodeUrlPathSegment(documentLink.getEntityId(), httpServletRequest);
		} catch (ProgramException e) {
        	uiModel.addAttribute(WebUtils.UPLOAD_MESSAGE_CODE, messageSource.getMessage("label_document_link_error", new String[] { documentLink.getName() }, locale));
    		uiModel.addAttribute("documentLink", documentLink);
    		log.error("Error in saving document", e);
    		WebUtils.addDateTimeFormatPatterns(uiModel);
			return "customers/customer/profile/customerFiles/create";
		}
	}
	@Secured("ROLE_UpdateCustomerFiles")
	@RequestMapping(value = "/customerFiles/{id}", params = "form", produces = "text/html")
	public String updateCustomerFileForm(@PathVariable("id") Long id, Model uiModel) {
		DocumentLinkDto documentLink = fileManagerService.findDocumentLinkById(id);
		uiModel.addAttribute("documentLink", documentLink);
        WebUtils.addDateTimeFormatPatterns(uiModel);
		return "customers/customer/profile/customerFiles/update";
	}
	@Secured("ROLE_UpdateCustomerFiles")
	@RequestMapping(value = "/updateCustomerFile", method = RequestMethod.POST, produces = "text/html")
	public String updateCustomerFile(@Valid DocumentLinkDto documentLink, BindingResult bindingResult,
			Model uiModel, DefaultMultipartHttpServletRequest httpServletRequest, Locale locale, RedirectAttributes redirectAttributes) {
		uiModel.asMap().clear();
		try {
			LocalDate currentWorkingDate = bankService.findBank().getCurrentWorkingDate();
    		FileLocator fileLocator = new FileLocator();
    		CommonsMultipartFile fileData = (CommonsMultipartFile) httpServletRequest.getFile("file");
    		if (fileData == null || fileData.isEmpty()) {
        		uiModel.addAttribute("documentLink", documentLink);
            	uiModel.addAttribute(WebUtils.UPLOAD_MESSAGE_CODE, messageSource.getMessage("label_document_file_data_not_provided", new String[] { documentLink.getName() }, locale));
                return "customers/customer/profile/customerFiles/update";
            }
			String fullFileName = fileLocator.copyDocument(UUID.randomUUID().toString(), fileData);
			documentLink.setCreationDate(currentWorkingDate);
			documentLink.setPath(fullFileName);
			fileManagerService.store(documentLink);
			documentLink = fileManagerService.findDocumentLinkById(documentLink.getId());
			redirectAttributes.addFlashAttribute(WebUtils.SUCCESS_MESSAGE, messageSource.getMessage("label_document_link_saved_successfully", new String[] { documentLink.getName() }, locale));
            return "redirect:/customers/customer/profile/listCustomerFiles/" + WebUtils.encodeUrlPathSegment(documentLink.getEntityId(), httpServletRequest);
		} catch (ProgramException e) {
        	uiModel.addAttribute(WebUtils.UPLOAD_MESSAGE_CODE, messageSource.getMessage("label_document_link_error", new String[] { documentLink.getName() }, locale));
    		uiModel.addAttribute("documentLink", documentLink);
    		log.error("Error in saving document", e);
    		WebUtils.addDateTimeFormatPatterns(uiModel);
			return "customers/customer/profile/customerFiles/update";
		}
	}
    @Secured("ROLE_DeleteCustomerFiles")
    @RequestMapping(value = "/customerFiles/{id}", method = RequestMethod.DELETE, produces = "text/html")
    public String deleteCustomerFile(@PathVariable("id") Long id, @RequestParam(value = "page", required = false) Integer page, @RequestParam(value = "size", required = false) Integer size, 
            Model uiModel, HttpServletRequest httpServletRequest) throws ProgramException {
		DocumentLinkDto documentLink = fileManagerService.findDocumentLinkById(id);
		fileManagerService.remove(documentLink);
//		FileLocator fileLocator = new FileLocator();
//		fileLocator.deleteFile(documentLink.getPath());
        uiModel.asMap().clear();
        uiModel.addAttribute("page", (page == null) ? "1" : page.toString());
        uiModel.addAttribute("size", (size == null) ? "10" : size.toString());
        return "redirect:/customers/customer/profile/listCustomerFiles/" + WebUtils.encodeUrlPathSegment(documentLink.getEntityId(), httpServletRequest);
    }
`;
function StepExtractor(text, step, isStr = true) {
  return isStr ? text.match(step).join(" ") : text.match(step);
}
function getMatch(str, regexp) {
  return str.match(regexp);
}
function replaceStr(str, regexp, repVal) {
  return str.replace(regexp, repVal);
}
let firstRegexpStr = "@ModelAttribute\\(.*\\)|@RequestMapping\\(.*\\)";
const firstStepExtractionRegExp = new RegExp(firstRegexpStr, "g");
const secondStepExtractionRegExp = new RegExp("\\((.*?)\\)", "g");

let firstStepExtractionResultStr = StepExtractor(
  modelFileStr,
  firstStepExtractionRegExp
);
let secondStepExtractionResult = StepExtractor(
  firstStepExtractionResultStr,
  secondStepExtractionRegExp,
  false
);
let res = secondStepExtractionResult;
let copyModelFileStr = modelFileStr;

function replaceMatch(str, regexp, repStr = "") {
  // This function will take string and regexp string and
  let maxIteration = 1000;
  let iteration = 0;
  let matchIndexArray = [];
  let modifiedStr = str; 
  // Replace until all regex match results null.
  for (
    let match = getMatch(modifiedStr, new RegExp(regexp));
    match != null || iteration > maxIteration;
    match = getMatch(modifiedStr, new RegExp(regexp))
  ) {
    matchIndexArray.push(match);
    modifiedStr = replaceStr(modifiedStr, match, repStr);
    iteration++;
  }
  // return matched info and replaced string
  return [matchIndexArray, modifiedStr];
}
function insertTextToString(str, pos, text) {
  return [str.slice(0, pos), text, str.slice(pos)].join("");
}
function findLastImport(str, word = "") {
  // const old = '/(\bimport\b)(?!(\n|.)*\b\1\b).*)/'
  // /(\btotal\b)(?!.*\b\1\b)/
  return str.match(/(\bimport (com|java)\b)(?!(\n|.)*\b\1\b).*/);
}
function getLastIndex(str) {
  const match = findLastImport(str);
  if(match){
    return match[0].length + match.index;
  }else{
    return false;
  }
}


function changeMappings(emptyReplacedString,matchInfo) {
  matchInfo.reverse().forEach((info) => {
    let modelAttr = getMatch(info[0], new RegExp("@ModelAttribute\\(.*\\)"));
    let reqMap = getMatch(info[0], new RegExp("@RequestMapping\\(.*\\)"));
    let firstReqMap = getMatch(info[0], new RegExp('@RequestMapping\\(".*?"\\)'));
    if (modelAttr) {
      let insideModelValue = getMatch(info[0], new RegExp('\\".*\\"'))[0].slice( 1, -1);
      insideModelValue =
        "get" +
        insideModelValue.charAt(0).toUpperCase() +
        insideModelValue.slice(1);
      const textToInsert = `@RequestMapping(value = "${insideModelValue}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)`;
      emptyReplacedString = insertTextToString(emptyReplacedString, info.index, textToInsert);
    } else if (reqMap) {
      let insReqVal = getMatch(info[0], new RegExp("@RequestMapping\\(.*\\)"))[0];
      let value;
      let method = "GET";
      const methodTypes = ["GET", "POST", "PUT", "DELETE"];
      try {
        value = insReqVal
          .match(new RegExp('value.*?\\".*?\\",'))[0]
          .match(`\\".*\\"`)[0]
          .slice(1, -1);
      } catch (e) {
        value = "";
      }
      try {
        methodTypes.forEach((curMethod) => {
          if (insReqVal.match(new RegExp("method.*?,"))[0].match(curMethod)) {
            method = curMethod;
          }
        });
      } catch (e) {}
  
      let textToInsert = `@RequestMapping(value = "${value}", method = RequestMethod.${method}, produces = MediaType.APPLICATION_JSON_VALUE)`;
      if (firstReqMap) {
        textToInsert = `@RequestMapping("/api/")`;
      }
      emptyReplacedString = insertTextToString(emptyReplacedString, info.index, textToInsert);
      // console.log(insReqVal);
      // let replaceText = value.match(new RegExp('value.*\\".*\\",'))[0].match(`\\".*\\"`)[0].slice(1,-1);
    } else {
      if (!info[0].match("Model")) {
      }
    }
  }, null);
  return emptyReplacedString;
}
// remove method populateEditForm
function addImport(insertStr, modifyStr) {
  insertStr
    .trim()
    .split("\n")
    .forEach((str) => {
      console.log(modifyStr.includes(str))
      if (!modifyStr.includes(str.trim()) && getLastIndex(modifyStr)) {
        console.log(str.trim());
        modifyStr = insertTextToString(
          modifyStr,
          getLastIndex(modifyStr),
          "\n" + str.trim()
        );
      }
    });
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
  `;

function removeMethod(str, name, repVal = "") {
  let result = str.match(
    new RegExp(
      name +
        "\\s*\\((.|\\\n)*?\\).*?\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{[^{}]*\\})*\\})*\\})*\\})*\\})*\\})*\\}"
    )
  );
  if (result) {
    return replaceStr(str, result[0], "");
  }
  return str;
}
function removeMethods(array, str) {
  array.forEach((methodName) => {
    str = removeMethod(str, methodName);
  });
  return str;
}
function changeReturnType(str) {
  let modifiedStr = str.replace(
    new RegExp("(?<=public\\s+)((?!class)\\S)*?(?=\\s+)", "g"),
    "ResponseEntity<$&>"
  );
  return modifiedStr;
}
function removeMethodDotCall(str, nameArr, repVal = "") {
  nameArr.forEach((name) => {
    let regexp = new RegExp("^.*" + name + ".*$", "gm");
    str = str.replace(regexp, repVal);
  });
  return str;
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
    console.log(element)
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
      console.log(elem.value);
      elem.value = elem.value.replaceAll(/\\n/g,String.fromCharCode(10));
      elem.value = elem.value.replaceAll(/\\t/g,String.fromCharCode(9));
    })
  }
  function convertButtonHandler(inputArea,outputArea){
    outputArea.value='';
    setTimeout(()=>{
      if(isFlatCheckbox.checked){
        console.log(inputArea.value)
        outputArea.value = getControllerConvertedString(inputArea.value);
      }else{
        outputArea.value = getInterface("AccountAssociate",JSON.parse(inputArea.value));
      }
    },100)
  }

  // Add listeners
  copyButton.addEventListener('click', event => copyFromElem(outputArea));
  prettifyButton.addEventListener('click', event => prettifyButtonHandler(inputArea,outputArea));
  pasteButton.addEventListener('click',(event)=> paste2Elem(inputArea));
  convertButton.addEventListener('click', (event)=>convertButtonHandler(inputArea,outputArea));

  // Set Titles
  checkLabel.innerText = "TS Class or Interface"
  title.innerText = `Controller File To Resource file`
}
function getControllerConvertedString(str){
  str = str.replaceAll(/\\n/g,String.fromCharCode(10));
  str = str.replaceAll(/\\t/g,String.fromCharCode(9));
  let [matchInfo, modifiedStr] = replaceMatch(str, firstRegexpStr);
  modifiedStr = changeMappings(modifiedStr,matchInfo)
  modifiedStr = removeMethods(
    ["populateEditForm", "editForm", "updateForm", "createForm"],
    modifiedStr
  );
  // modifiedStr = changeReturnType(modifiedStr);
  modifiedStr = removeMethodDotCall(modifiedStr, [
    "uiModel\\.",
    "WebUtils\\.add",
  ]);
  modifiedStr = addImport(importString, modifiedStr);
  modifiedStr = changeReturnType(modifiedStr);
  return modifiedStr;
}
function main(){
  setupUI();
  
}
main()
// while( getMatch(modifiedStr,regexp) &&  matchIteration<maxMatchIteration){
//   matchIndexArray.push(getMatch(modifiedStr,new RegExp(regexp)));
//   modifiedStr = replaceStr(modifiedStr,new RegExp(regexp),repStr)
//   /* console.log( replaceStr(copyModelFileStr,new RegExp(regexp),"")) */
//   matchIteration++;
// }
// var position = 6;
/* var output = [a.slice(0, position), b, a.slice(position)].join(''); */
// console.log();

// \((?:[^()]+|\((?:[^()]+|\([^()]*\))*\))*\)
// https://stackoverflow.com/questions/17759004/how-to-match-string-within-parentheses-nested-in-java/17759264#17759264
// https://stackoverflow.com/questions/546433/regular-expression-to-match-balanced-parentheses
// \([^()]*\)
// basically it says find regex such that between opening and closing paranthesis there must not be

// ('\\\n*?\\b\\\w+\\b\\\s+'+name+'\\\s*\\((.|\\\n)*\\).*?\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{([^{}]*|\\{[^{}]*\\})*\\})*\\})*\\})*\\})*\\})*\\}','i')
