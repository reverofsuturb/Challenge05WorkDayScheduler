var currenthour = dayjs().hour();
var today = $('#currentDay');
var savebutton = $(".saveBtn");
var divselect = $("div");
// declared global variables
function displaydate() { 
today.text(dayjs().format('MMMM D, YYYY hh:mm:ss A'))
}

setInterval(displaydate, 100)

// wrapped this in a function per the assignment asked, this is simply putting the date above the planner itself using dayjs, and formatted it for clarity, used set interval to add a nice ticking clock, used a little lower of a refresh rate as the load was a little glaring on page

divselect.each(function () {
  if ($(this).attr("id") < currenthour) {
    $(this).removeClass("future", "present");
    $(this).addClass("past");
  } else if ($(this).attr("id") == currenthour) {
    $(this).removeClass("future", "past");
    $(this).addClass("present");
  } else if ($(this).attr("id") > currenthour) {
    $(this).removeClass("present", "past");
    $(this).addClass("future");
  }
});
}

// this function will go through each div/timeblock and look at it's id and match it to the current hour, used the == selector as was having issues with the strict equality operator here so that it is comparing values instead, css class filters will be applied and removed accordingly

savebutton.on("click", function () {
  var scheduled = $(this).siblings("#recorded").val();
  var timeblock = $(this).parent().attr("id");
  localStorage.setItem(timeblock, scheduled);
});

// event listener, saving information input for each individual line by using .siblings, goes to local storage saved by the ID of the timeblock

divselect.each(function () {
  $(this)
    .children("#recorded")
    .val(localStorage.getItem($(this).attr("id")));
});

// this function will get the saved key values by time block for each div, using the id value to get the information