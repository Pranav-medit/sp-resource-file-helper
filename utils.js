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
  any2 = `[.\\n\\s]*?`
  nSpace = `[\\s\\n]*?`
  closeTag=`[>\\n\\s\\t]+?`
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
  replaceWithErrorHandle(str,regStr,repVal,text=false){
    try{
      if(text){ return str.replace(text,repVal).trim() }
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
  extractHtmlTag2(str,tag,attr="",noCloseTag=false){
    const tagRegexp = this.getTagRegexp2(tag,attr,noCloseTag);
    return this.matchWithErrorHandle(str,tagRegexp);
  }
  extractAttributeValue(attr){
    if(attr==null) {console.warn("Undefined attribute value");return;}
    attr = attr.replace(/\s/g,'')
    return this.matchWithErrorHandle(attr,`(?<=")${this.any}(?=")`);
  }
  extractAttribute(html,name,value='',last=false){
    const attrRegex = this.getAttrRegex(name,value,last);
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
    if(noCloseTag) return `<${tag+this.closeTag+this.any}${attr}${this.any}>`
    if(attr!==""){ return `<${tag+this.any+attr+this.any+'>'+this.any}</${tag}>`;}
    return `<${tag+this.closeTag+this.any}</${tag}>`
  }
  getTagRegexp2(tag,attr="",noCloseTag=false) { 
    if(noCloseTag) return `<${tag+this.closeTag+this.any}${attr}${this.any}>`
    if(attr!==""){ return `<${tag+this.any2+attr+this.any+'>'+this.any}</${tag}>`;}
    return `<${tag+this.closeTag+this.any}</${tag}>`
  }
  getAttrRegex(name,value='',last=false){
    let regex = `${name+this.nSpace}=${this.nSpace}"${this.any+value+this.any}"`
    if(last){
      return `${regex}(?![.\S\n]*${name})`
    }
    return regex
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
  replaceValueOfTag(html,value){
    let regex = `(?<=<${this.any}>)${this.any}(?=</${this.any}>)`
    return this.replaceWithErrorHandle(html,regex,value)
  }
}