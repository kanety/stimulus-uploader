import{Controller as e}from"@hotwired/stimulus";class t extends e{get input(){return this.element.querySelector("input[type=file]")}run(e){this.upload(e.target.files),e.target.value=""}upload(e){this.input.disabled=!0,e=Array.from(e),this.before(e),Promise.all(Array.from(e).map((e,t)=>this.uploadFile(e,t))).then(()=>{this.after(e),this.input.disabled=!1})}uploadFile(e,t){return new Promise(s=>{this.start(e,t),fetch(this.urlValue,Object.assign({method:this.methodValue,body:this.buildFormData(e)},this.constructor.fetchOptions,this.fetchOptionsValue)).then(s=>{s.ok?this.done(e,t,s):this.fail(e,t,s)}).catch(s=>{this.fail(e,t,s)}).then(()=>{this.end(e,t),s()})})}before(e){this.hasProgressTarget&&e.forEach((e,t)=>{this.progressTarget.append(this.createProgress(e,t))}),this.dispatch("before",{detail:{files:e}})}after(e){this.dispatch("after",{detail:{files:e}})}start(e,t){this.dispatch("start",{detail:{file:e,index:t}})}done(e,t,s){this.dispatch("done",{detail:{file:e,index:t,response:s}})}fail(e,t,s){this.dispatch("fail",{detail:{file:e,index:t,error:s}})}end(e,t){if(this.hasProgressTarget){let e=this.findProgress(t);e&&e.remove()}this.dispatch("end",{detail:{file:e,index:t}})}createProgress(e,t,s="..."){var r=document.createElement("div");r.innerHTML=this.constructor.template;let a=r.firstChild;return a.setAttribute("data-uploader-index",t),a.querySelector(".st-uploader__progress-name").innerHTML=e.name,a.querySelector(".st-uploader__progress-value").innerHTML=s,a}findProgress(e){return this.progressTarget.querySelector(`[data-uploader-index="${e}"]`)}buildFormData(e){let t=new FormData;t.append(this.input.name,e);let s=Object.assign({},this.constructor.resolveParams(this.constructor.params),this.constructor.resolveParams(this.paramsValue));for(let e in s)t.append(e,s[e]);return t}static resolveParams(e){let t={};switch(Object.prototype.toString.call(e)){case"[object Function]":t=e();break;case"[object Array]":e.forEach(e=>{t[e.name]=e.value});break;case"[object Object]":Object.assign(t,e)}return t}}t.targets=["progress"],t.values={url:String,method:{type:String,default:"post"},params:{type:Object,default:{}},fetchOptions:{type:Object,default:{}}},t.params={},t.fetchOptions={},t.template='<div class="st-uploader__progress"><span class="st-uploader__progress-name"></span><span class="st-uploader__progress-value"></span></div>';export{t as default};
//# sourceMappingURL=index.modern.js.map