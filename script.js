$(document).ready(function () {
  $.getJSON("one_planet_community.json", function (data) {
    console.log(data);
    populateCountryDropdown(data);
    generateTable(data);

    // Add click event to the table headers for sorting
    $("#dynamic-table thead th").each(function (index) {
      $(this).on("click", function () {
        var isAscending = $(this).hasClass("asc");
        sortTable(index, !isAscending, data); // Toggle the sorting order
        updateArrows($(this), !isAscending); // Update the arrows
      });
    });

    // Add click event to the search button for filtering
    $("#search-btn").on("click", function () {
      filterTable(data);
    });
  });
});

function populateCountryDropdown(data) {
  var countries = new Set(data.users.map(user => user.country));
  var countryFilter = $("#country-filter");

  countries.forEach(function (country) {
    countryFilter.append($("<option>").val(country).text(country));
  });
}

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

function filterTable(data) {
  var selectedCountry = $("#country-filter").val().toLowerCase();
  var searchQuery = $("#common-search").val().toLowerCase();

  var filteredData = data.users.filter(function (user) {
    var matchesCountry = selectedCountry === "" || user.country.toLowerCase() === selectedCountry;
    var matchesSearch = Object.values(user).some(function (value) {
      return value && value.toString().toLowerCase().includes(searchQuery);
    });

    return matchesCountry && matchesSearch;
  });

  generateTable({ users: filteredData });
}
