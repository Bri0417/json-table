$(document).ready(function () {
  $.getJSON("one_planet_community.json", function (data) {
    console.log(data);
    generateTable(data);

    // Add click event to the table headers for sorting
    $("#dynamic-table thead th").each(function (index) {
      $(this).on("click", function () {
        var isAscending = $(this).hasClass("asc");
        sortTable(index, isAscending, data);
        updateArrows($(this), isAscending);
      });
    });
  });
});

function generateTable(data) {
  var tableBody = $("#dynamic-table tbody");
  tableBody.empty();

  // Loop through the JSON data
  $.each(data.users, function (index, item) {
    var row = $("<tr>");

    // Create table cell for each piece of data
    row.append($("<td>").text(item.id));
    row.append($("<td>").text(item.title));
    row.append($("<td>").text(item.path));
    row.append($("<td>").text(item.user_type));
    row.append($("<td>").text(item.subject));
    row.append($("<td>").text(item.country));
    row.append($("<td>").text(item.short_content));
    row.append($("<td>").text(item.field_of_research));
    row.append($("<td>").text(item.learningpartner));
    row.append($("<td>").text(item.image));

    // Append the row to the table body
    tableBody.append(row);
  });
}

function sortTable(columnIndex, asc, data) {
  var sortedData = data.users.sort(function (a, b) {
    var aValue = Object.values(a)[columnIndex];
    var bValue = Object.values(b)[columnIndex];

    if (asc) {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });

  generateTable({ users: sortedData });
}

function updateArrows(th, isAscending) {
  // Remove previous arrows
  $("#dynamic-table thead th").removeClass("asc desc").find(".arrow").remove();

  // Add both arrows to the clicked header
  var upArrow = ' <span class="arrow up-arrow"><i class="fa-solid fa-sort-up"></i></span>'; // Up arrow
  var downArrow = ' <span class="arrow down-arrow"><i class="fa-solid fa-sort-down"></i></span>'; // Down arrow

  th.append(upArrow + downArrow);

  // Highlight the active sorting direction
  if (isAscending) {
    th.addClass("desc").find(".down-arrow").css("color", "blue"); // Highlight down arrow
  } else {
    th.addClass("asc").find(".up-arrow").css("color", "blue"); // Highlight up arrow
  }
}
