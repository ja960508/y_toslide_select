window.onload = function (){
  if(is_mobile() === false){
    var logo = document.querySelector('.logo');
    logo.style.width = "258px";
    logo.style.height = "104px";

    document.querySelector('.header').style.paddingBottom = "36px";
    document.querySelector('.version').style.bottom = "36px";

    var inputel = document.getElementsByClassName('inputel');
    var txt = document.getElementsByClassName('txt');
    var box = document.getElementsByClassName('box');

    for(var i = 0; i < inputel.length; i++){
      inputel[i].style.marginBottom = "8px";
      txt[i].style.width = "69px";
      box[i].style.width = "424px";
      box[i].style.paddingLeft = "22px";
    }

    document.querySelector('.participant').style.paddingBottom = "38px";
    document.querySelector('#cordimail').style.width = "374px";
    document.querySelector('.cordinator').style.paddingBottom = "60px";
    document.querySelector('.okbtn').style.width = "494px";
  }
}

function is_mobile()
{
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    return true;
  }
  
  if (typeof window.orientation !== 'undefined') 
  {
    return true;
  }
  
  var iOSios = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
  if(iOSios)
    return true;

  return false;    

}
