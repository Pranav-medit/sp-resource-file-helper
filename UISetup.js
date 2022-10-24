class SetupUI{
  init(){
    this.inputArea= document.getElementsByClassName('textarea')[0];
    this.outputArea = document.getElementsByClassName('textarea')[1];
    this.copyButton = document.getElementById('copy');
    this.convertButton = document.getElementById('convert');
    this.pasteButton = document.getElementById('paste');
    this.prettifyButton = document.getElementById('pretty');
    this.isFlatCheckbox = document.getElementById('isFlatCheckbox');
    this.title = document.getElementById('title');
    this.checkLabel = document.getElementById('check-label');
    if(this.getInputCache() && this.getInputCache!==undefined) this.inputArea.innerText = this.getInputCache();
  }
  addEventListeners(fn2Call){
    this.copyButton.addEventListener('click', event => this.copyFromElem(this.outputArea));
    this.prettifyButton.addEventListener('click', event => this.prettifyButtonHandler(this.inputArea,this.outputArea));
    this.pasteButton.addEventListener('click',(event)=> this.paste2Elem(this.inputArea));
    this.convertButton.addEventListener('click', (event)=>this.convertButtonHandler(fn2Call));
  }
  changeTitles(titleText='',checkLabel=''){
     // Set Titles
     if(document.readyState === "complete") {
      // Fully loaded!
      this.checkLabel.innerText = checkLabel
      this.title.innerText = titleText
    }else{
      window.addEventListener("load", () => {
        // DOM ready! Images, frames, and other subresources are still downloading.
        this.checkLabel.innerText = checkLabel
        this.title.innerText = titleText
    });
    }
  }
  constructor(fn2Call){
    // Add listeners
    window.onload = ()=> {
      this.init();
      this.addEventListeners(fn2Call);
      this.changeTitles();
    };
   
  }
  copyFromElem(element){
    navigator.clipboard.writeText(element.value);
  }
  paste2Elem(element){
    element.value='';
    navigator.clipboard.readText().then((text)=>{
      element.value = text;
    });
  }
  prettifyButtonHandler(...args){
    let space = 2
    args.forEach(elem => {
      elem.value = elem.value.replaceAll(/\\n/g,String.fromCharCode(10));
      elem.value = elem.value.replaceAll(/\\t/g,String.fromCharCode(9));
    })
  }
  convertButtonHandler(fn2Call){
    this.setInputCache(this.inputArea.value); 
    this.outputArea.value='';
    setTimeout(()=>{
        this.outputArea.value = fn2Call(this.inputArea.value)
    },100)
  }
  setInputCache(val){
    try{
      localStorage.setItem('prev_input',val);
      return true;
    }catch(e){
      return false;
    }
  }
  getInputCache(){
    return localStorage.getItem('prev_input');
  }
}
