function validater(r, v, d = {}) {
    let vali;
    let errors = [];
    for (var ky in v) {
      let message="";
      if (isEmpty(r.body[ky]) && (v[ky]==="required"|| v[ky].required===true)) {
        message =setErrorMessage(d,ky,ky + " is required!",'required');
        vali = {
          status_code: d.statusCode ?? "400",
          status: d.status ?? false,
          message: message,
        };
        errors.push(message);
      }else if(r.body[ky]){
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(v[ky].email===true && !r.body[ky].toString().match(mailformat)){
          message = setErrorMessage(d,ky,`Invalid ${ky}.`);
        }
        let phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if(v[ky].phone===true && !r.body[ky].toString().match(phoneno)){
          message = setErrorMessage(d,ky,`Invalid ${ky}.`,'phone');
        }
        let checkDate = /^(?:19|20)\d\d-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)$/;
        if(v[ky].date===true && !r.body[ky].toString().match(checkDate)){
          message = setErrorMessage(d,ky,`Invalid ${ky}.`,'date');
        }
        if(v[ky].max && r.body[ky].length > v[ky].max){
          message = setErrorMessage(d,ky,`Max Length ${v[ky].max}.`,'max');
        }
        if(v[ky].min && r.body[ky].length < v[ky].min){
          message = setErrorMessage(d,ky,`Min Length ${v[ky].min}.`,'min');
        }
        if(v[ky].type && (typeof r.body[ky])!==v[ky].type){
          message = setErrorMessage(d,ky,`Invalid ${v[ky].type}.`,'type');
        }
        if(v[ky].regex && !r.body[ky].match(v[ky].regex)){
          message = setErrorMessage(d,ky,`Invalid ${ky}.`,'regex');
        }

        
        if(message && message!=="" && message!==undefined){
          vali = {
            status_code: d.statusCode ?? "400",
            status: d.status ?? false,
            message: message,
          };
          errors.push(message);
        }
      }
    }
    return d.errors ?  isNotEmpty(errors,errors): vali ?? false;
  }
  function isEmpty(data,resend=true,resendF=false){
    if (data !== undefined && data !== null && data !== "") return resendF;
    return resend;
  }
  function isNotEmpty(data,resendF=true,resend=false){
    if (data !== undefined && data !== null && data !== "") return resendF;
    return resend;
  }
  function isNotObject(x) {
    if( (typeof x === "object" || typeof x === 'function') && (x !== null) )
    {
      return false;
    }else{
      return true;
    }
  }
  function isObject(x) {
    if( (typeof x === "object" || typeof x === 'function') && (x !== null) )
    {
      return true;
    }else{
      return false;
    }
  }
  function setErrorMessage(d,ky,params="Invalid",msg) {
    return d.message && d.message[ky] 
    ? isNotEmpty(isNotObject(d.message[ky]),isNotEmpty(d.message[ky],d.message[ky]),d.message[ky][msg]):params;
  }
  module.exports = {
    validater,
    isObject,
    isNotObject,
    isNotEmpty,
    isEmpty
}