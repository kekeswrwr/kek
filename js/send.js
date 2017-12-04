$( "input" ).focus(function() {
  $(this).attr('style','')
});
function sended_text(message, form) {
  $('#'+form+' .sended').css('opacity', '1')
  $('#'+form+' .sended').text(message)
  setTimeout( function() { 
    $('#'+form+' .sended').css('opacity', '0')
  } , 5000)
}
$(".subform").submit( function (e) {

  e.preventDefault();

  var fm = $(this).attr('id'),
  msg = $(this).serializeArray();

  var fid = $(this).find('input[name=form]').val();
  var fdata = $('#'+fid).serializeArray();
  sh = true;

  if($('#'+fm +' #ag').length){
      if ($('#'+fm +' #ag').is(":checked") == false){
          sh = false;
          // alert("error")
          $("label[for='ag']").css({
            "color":"rgba(214,0,0,1)"
          }).find('span').css({
            "border-color":"rgba(214,0,0,1)"
          })
      }
  }

  if ($('#'+fm +' .requaired').length){

      $('#'+fm +' .requaired').each(function(){
          if ($(this).val() == ""){
              sh = false
              $(this).css({
                  "box-shadow": "0px 0px 10px 1px rgba(214,0,0,1)",
                  "border-color": "rgba(214,0,0,1)"
              })
              sended_text('Заполните необходимые поля', fm)
          }

      })
  }

  if (sh == true){
    $.ajax({
      type: 'POST',
      url: 'success.php',
      data: {msg: msg, fdata: fdata},
      success: function(data) {
        sended_text('Заявка отправлена!',fm)
        $('#'+fm).find('input[type=text]').val('')
        //alert(data)
        // window.location = 'thank.html?form=' + page

      },
      error:  function(xhr, str){
      	sended_text('Возникла ошибка: ' + xhr.responseCode,fm)
      }
    });
  }
})