$(document).ready(function () {
  var data; // Store data for filtering and sorting

  $.getJSON("one_planet_community.json", function (jsonData) {
    data = jsonData; // Store data
    console.log(data);
    generateTable(data);
    populateFilters(data);

    // Add click event to the table headers for sorting
    $("#dynamic-table thead th").each(function (index) {
      $(this).on("click", function () {
        var isAscending = $(this).hasClass("asc");
        sortTable(index, !isAscending, data); // Toggle the sorting order
        updateArrows($(this), !isAscending); // Update the arrows
      });
    });

    // Search button click event
    $("#search-button").on("click", function () {
      applyFilters(data);
    });

    // Input field Enter key press event
    $("#search-input").on("keypress", function (e) {
      if (e.which === 13) { // Enter key pressed
        applyFilters(data);
      }
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

function populateFilters(data) {
  var countries = new Set();
  var subjects = new Set();
  var userTypes = new Set();

  $.each(data.users, function (index, item) {
    countries.add(item.country);
    subjects.add(item.subject);
    userTypes.add(item.user_type);
  });

  populateDropdown("#filter-country", Array.from(countries));
  populateDropdown("#filter-subject", Array.from(subjects));
  populateDropdown("#filter-user-type", Array.from(userTypes));
}

function populateDropdown(selector, items) {
  var dropdown = $(selector);
  dropdown.append('<option value="">Select</option>');
  $.each(items, function (index, item) {
    dropdown.append('<option value="' + item + '">' + item + '</option>');
  });
}

function applyFilters(data) {
  var countryFilter = $("#filter-country").val();
  var subjectFilter = $("#filter-subject").val();
  var userTypeFilter = $("#filter-user-type").val();
  var searchText = $("#search-input").val().toLowerCase();

  var filteredData = data.users.filter(function (item) {
    var countryMatch = countryFilter === "" || item.country === countryFilter;
    var subjectMatch = subjectFilter === "" || item.subject === subjectFilter;
    var userTypeMatch = userTypeFilter === "" || item.user_type === userTypeFilter;
    var searchMatch = searchText === "" || Object.values(item).some(function (value) {
      return value.toString().toLowerCase().includes(searchText);
    });

    return countryMatch && subjectMatch && userTypeMatch && searchMatch;
  });

  generateTable({ users: filteredData });
}

function sortTable(columnIndex, asc, data) {
  var sortedData = data.users.sort(function (a, b) {
    var aValue = Object.values(a)[columnIndex];
    var bValue = Object.values(b)[columnIndex];

    // Handle case-insensitive sorting
    if (typeof aValue === "string" && typeof bValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (asc) {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });

  generateTable({ users: sortedData });
}

function updateArrows(th, isAscending) {
  $("#dynamic-table thead th").removeClass("asc desc").find(".arrow").remove(); // Remove previous arrows

  if (isAscending) {
    th.removeClass("desc").addClass("asc").append(' <span class="arrow up-arrow">&#9650;</span>'); // Up arrow
  } else {
    th.removeClass("asc").addClass("desc").append(' <span class="arrow down-arrow">&#9660;</span>'); // Down arrow
  }
}
