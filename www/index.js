let endpoint = 'http://128.199.80.110:3000';
$(document).ready(function () {
    renderTable()
});
const renderTable = async () => {
    try {
        const response = await fetch(endpoint + `/get_item`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const items = data.data;
        const tableBody = document.querySelector('#data-table tbody');
        // redering table
        items.forEach((item) => {
            // create row
            const row = tableBody.insertRow();
            const cellName = row.insertCell(0);
            const cellPrice = row.insertCell(1);
            const cellQuantity = row.insertCell(2);
            const cellDescription = row.insertCell(3);
            const cellSpacific = row.insertCell(4);
            // add row content
            cellName.textContent = item.name;
            cellPrice.textContent = item.price;
            cellQuantity.textContent = item.quantity;
            cellDescription.textContent = item.description;
            //create info button
            const infoButton = document.createElement('button');
            infoButton.textContent = 'Detail';
            cellSpacific.appendChild(infoButton);
            infoButton.addEventListener('click', () => {
                infoButtonClick(item._id);
            });
            //create edit button
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            cellSpacific.appendChild(editButton);
            editButton.addEventListener('click', () => {
                editButtonClick(item._id);
            });



        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

//info button init
const infoButtonClick = (item) => {
    console.log('info:', item);

}

// edit button init
const editButtonClick = (item) => {
    console.log('edit:', item);

}


//insert button init
const insertButton = document.getElementById('insertButton');
insertButton.addEventListener('click', () => {
    console.log("insert");
    $("#insertModal").modal("show");
});
