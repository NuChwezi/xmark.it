function v(id) {
  return $('#' + id).val();
}

function sanitize(str){
   return str.replace(/\W/g, '_').replace(/_{1,}/g, '_')
}

function renderXMARK(vname, vphone, vemail, vcompany, vtitle) {
  var xmark = {
    name: vname,
    phone: vphone,
    email: vemail,
    company: vcompany,
    title: vtitle
  }

  var jXMARK = JSON.stringify(xmark);
  var uriXMARK = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURI(jXMARK);
  $('#i-xmark').attr({
    src: uriXMARK
  });
  hideEdit();
  $('#btn-export').click(function(){
    renderIMAGE('#xmark',"XMARK-"+sanitize(vname));
  })
}

function generateXMARK() {
  var name = v('name');
  var phone = v('phone');
  var email = v('email');
  var company = v('company');
  var title = v('title');

  renderXMARK(name, phone, email, company, title);
}

function hideEdit() {
  $('#fade-box').hide();
  $('#xmark-container').show();
}

function showEdit() {
  $('#xmark-container').hide();
  $('#fade-box').show();
}

function renderIMAGE(selector, title) {
  html2canvas($(selector), {
    onrendered: function(canvas) {
      canvas.toBlob(function(blob) {
        saveAs(blob, title + ".png");
      });
    }
  });
}

$(document).ready(function() {
  showEdit();

  $('form').submit(function() {
    generateXMARK();
    return false;
  });

  $('#btn-edit').click(showEdit);

});