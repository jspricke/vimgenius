
var keystroke = $('.success').attr("data-attribute-keystroke")
Mousetrap.bind(keystroke, function() { success_command(); return false; });

$('a.next').click( function() { next_command(); return false; });

function success_command() {
  $('.success').show();
  $('.error').hide();
  stop_timer();
  Mousetrap.bind("enter", function() { next_command(); return false; });
}

function next_command() {
  reset_timer();
  start_timer();
  unbind_enter();
  unbind_keystroke();
  replace_question();
}

function unbind_keystroke() {
  Mousetrap.unbind(keystroke);
}

function unbind_enter() {
  Mousetrap.unbind('enter');
}

function current_cycle() {
  return $('.success').attr("data-attribute-current-cycle");
}

function replace_question() {
  $.ajax({
    url: $('.success').attr("data-attribute-next-command-url"),
    data: { current_cycle: current_cycle() },
    type: 'GET',
    success: function(response) {
      $('#command').replaceWith(response)
    },
    error: function() {
      console.log('Ajax error')
    }
  });
  return false;
}
