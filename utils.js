class StringHelper{
  capitalizeFirstLetter(strToCapitalize) {
    return strToCapitalize[0].toUpperCase() + strToCapitalize.slice(1);
  }
  seperateCharectersUponUppercase(strInput, firstCap) {
    if (firstCap) {
      return this.capitalizeFirstLetter(strInput.split(/(?=[A-Z])/).join(" "));
    }
    return strInput.split(/(?=[A-Z])/).join(" ");
  }
}
class ObjectHelperClass{
  getObjectValue(obj, key) {
    let arr = key.split(".");
    let maxIterations = 100;
    let iterations = 0;
    let res = obj;
    while (arr.length !== 0 && iterations < maxIterations) {
      iterations++;
      res = res[arr[0]];
      arr.shift();
    }
    return res;
  }
}

class HtmlTool{
  any = `[.\\n\\S\\s]*?`
  nSpace = `[\\s\\n]*`
  cacheStr = ""
  isPresent(string,reg){
    return string.match(new RegExp(reg)) ? true : false; 
  }
  matchWithErrorHandle(str,regStr){
    try{
      let res = str.match(new RegExp(regStr))[0]
      this.cacheStr = res;
      return res
    }catch(e){
      console.warn(e);
    }
  }
  replaceWithErrorHandle(str,regStr,repVal){
    try{
      return str.replace(new RegExp(regStr),repVal).trim()
    }catch(e){
      console.warn(e);
    }
  }
  matchNReplace(inputStr,regexp){
    let match,replacedStr;
    match=inputStr.match(new RegExp(regexp))
    replacedStr = inputStr.replace(match,'');
    return [match[0],replacedStr];
  }
  extractHtmlTag(str,tag,attr="",noCloseTag=false){
    const tagRegexp = this.getTagRegexp(tag,attr,noCloseTag);
    return this.matchWithErrorHandle(str,tagRegexp);
  }
  extractAttributeValue(attr){
    if(attr==null) {console.warn("Undefined attribute value");return;}
    attr = attr.replace(/\s/g,'')
    return this.matchWithErrorHandle(attr,`(?<=")${this.any}(?=")`);
  }
  extractAttribute(html,name,value=''){
    const attrRegex = this.getAttrRegex(name,value);
      return this.matchWithErrorHandle(html,attrRegex);
  }
  extractAllTagWithAttr(html,tag,attr){
    let match;
    let tagArray = []
    while(this.isPresent(html,this.getTagRegexp(tag,attr))){
      [ match,html ] = this.matchNReplace(html,this.getTagRegexp(tag,attr)) 
      tagArray.push(match);    
    }
    return tagArray;
  }
  getTagRegexp(tag,attr="",noCloseTag=false) { 
    if(noCloseTag) return `<${tag}${this.any}${attr}${this.any}>`
    return `<${tag}${this.any}${attr}${this.any}>${this.any}</${tag}>`
  }
  getAttrRegex(name,value=''){
    return `${name+this.nSpace}=${this.nSpace}"${this.any+value+this.any}"`
  }
  getReplaceAttrRegex(attrName){
    return `${attrName+this.nSpace+'='+this.nSpace+'"'+this.any+'"'}`
  }
  removeAttribute(html,attrName){
    let regex = this.getReplaceAttrRegex(attrName);
    return this.replaceWithErrorHandle(html,regex,'')
  }
  addAttribute(html,attr){
    let regex = "(?<=<.+?\\s+?)"
    return this.replaceWithErrorHandle(html,regex,""+attr+" ")
  }
}