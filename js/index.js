var defaultQRCODE_SIZE = 200;
var defaultQRCODE_EXPORT_SIZE = 500;
var defaultEXPORT_SIZE_H = 400;
var defaultEXPORT_SIZE_W = 1000;
function v(id) {
    return $('#' + id).val();
}

function sanitize(str){
    return str.replace(/\W/g, '_').replace(/_{1,}/g, '_')
}

function make_qrcode(selector,data,size){
    $(selector).empty();
    $(selector).qrcode({
        render: 'canvas',
        width: size,
        height: size,
        text: data
    });
}


function renderXMARK(vname, vphone, vemail, vcompany, vtitle, vmeta) {
    var xmark = {
        name: vname,
        phone: vphone,
        email: vemail,
        company: vcompany,
        title: vtitle,
        meta: vmeta,
    }

    var jXMARK = JSON.stringify(xmark);
    make_qrcode('#i-xmark',jXMARK, defaultQRCODE_SIZE);
    $('#divider').css({'width': 'auto'});
    make_qrcode('#i-download','https://xmark.it/xmark.it-android-client.apk',defaultQRCODE_SIZE);
    hideEdit();
    $('#btn-export').click(function(){

        $('#container').hide(); // so it doesn't show in the image export

        make_qrcode('#i-xmark',jXMARK, defaultQRCODE_EXPORT_SIZE);
        $('#divider').css({'width': defaultQRCODE_EXPORT_SIZE * 0.25 + 'px' });
        make_qrcode('#i-download','https://raw.githubusercontent.com/NuChwezi/xmark-android-client/master/release/XMark.apk',defaultQRCODE_EXPORT_SIZE);

        $('#xmark').modal({opacity:100, onShow: function(){
            setTimeout(function(){ 
                renderIMAGE('body',"XMARK-"+sanitize(vname));
                setTimeout(function(){ 
                    $.modal.close(); 
                    generateXMARK(); 

                    $('#container').show();
                }, 2000);
            },3000);
        }});
    })
}

function generateXMARK() {
    var name = v('name');
    var phone = v('phone');
    var email = v('email');
    var company = v('company');
    var title = v('title');
    var meta = v('meta');

    renderXMARK(name, phone, email, company, title, meta);
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
        },
    });
}

$(document).ready(function() {

    showEdit();

    $('form').submit(function() {
        generateXMARK();
        return false;
    });

    $('#btn-edit').click(function(){ showEdit(); });

});
