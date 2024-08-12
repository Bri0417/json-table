$(document).ready(function() {
    $.getJSON('one_planet_community.json', function(data) {
        console.log(data);
        generateTable(data);

});
});

function generateTable(data) {
    var tableBody = $('#dynamic-table tbody');
    tableBody.empty(); // Clear any existing rows

    // Loop through the JSON data
    $.each(data.users, function(index, item) {
        var row = $('<tr>');
        
        // Create a table cell for each piece of data
        row.append($('<td>').text(item.id));
        row.append($('<td>').text(item.title));
        row.append($('<td>').text(item.path));
        row.append($('<td>').text(item.user_type));
        row.append($('<td>').text(item.subject));
        row.append($('<td>').text(item.country));
        row.append($('<td>').text(item.short_content));
        row.append($('<td>').text(item.field_of_research));
        row.append($('<td>').text(item.learningpartner));
        row.append($('<td>').text(item.image));

        // Add more cells as needed

        // Append the row to the table body
        tableBody.append(row);
    });
}
var pageSize = 10;
var currentPage = 1;
var data;

function paginateTable() {
    var start = (currentPage - 1) * pageSize;
    var end = start + pageSize;
    var pageData = data.slice(start, end);
    generateTable(pageData);
}

$(document).ready(function() {
    $.getJSON('one_planet_community.json', function(jsonData) {
        data = jsonData;
        paginateTable();

        // Handle pagination controls
        $('#next').click(function() {
            currentPage++;
            paginateTable();
        });

        $('#prev').click(function() {
            currentPage--;
            paginateTable();
        });
    });
});
