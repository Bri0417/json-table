$(document).ready(function () {
  $.getJSON("one_planet_community.json", function (data) {
    console.log(data);
    generateTable(data);

    // Add click event to the table headers for sorting
    $("#dynamic-table thead th").each(function (index) {
      $(this).on("click", function () {
        var isAscending = $(this).hasClass("asc");
        sortTable(index, !isAscending, data); // Toggle sorting order
        updateArrows($(this), !isAscending); // Update arrows based on new sort order
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

function sortTable(columnIndex, isAscending, data) {
  var sortedData = data.users.sort(function (a, b) {
    var aValue = cleanValue(Object.values(a)[columnIndex]);
    var bValue = cleanValue(Object.values(b)[columnIndex]);

    return isAscending ? compareValues(aValue, bValue) : compareValues(bValue, aValue);
  });

  generateTable({ users: sortedData });
}

function cleanValue(value) {
  if (typeof value === 'string') {
    // Remove special characters and convert to lowercase
    return value.replace(/[^\w\s]/gi, '').toLowerCase();
  }
  return value;
}

function compareValues(a, b) {
  if (isNaN(a) || isNaN(b)) {
    return a.localeCompare(b); // Compare as strings if not numbers
  }
  return a - b; // Compare as numbers
}

function updateArrows(th, isAscending) {
  // Remove previous arrows and classes
  $("#dynamic-table thead th").removeClass("asc desc").find(".arrow").remove();

  // Add the relevant arrow to the clicked header
  if (isAscending) {
    th.addClass("asc").append(' <span class="arrow up-arrow">&#9650;</span>'); // Up arrow for ascending
  } else {
    th.addClass("desc").append(' <span class="arrow down-arrow">&#9660;</span>'); // Down arrow for descending
  }
}
