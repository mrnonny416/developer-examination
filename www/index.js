let endpoint = 'http://localhost:3000';
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
        // Clear existing table content
        tableBody.innerHTML = '';
        // redering table
        items.forEach((item) => {
            // create row
            const row = tableBody.insertRow();
            const cellName = row.insertCell(0);
            const cellPrice = row.insertCell(1);
            const cellQuantity = row.insertCell(2);
            const cellSpacific = row.insertCell(3);
            // add row content
            cellName.textContent = item.name;
            cellPrice.textContent = item.price;
            cellQuantity.textContent = item.quantity;
            //create info button
            row.addEventListener('click', (event) => {
                if (event.target.cellIndex !== 3 && !!event.target.cellIndex) {
                    getItemById(item._id);
                }
            })
            //create edit button
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'btn btn-warning';
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
const getItemById = async (_id) => {
    try {
        const response = await fetch(endpoint + `/get_item_by_id/${_id}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const item = data.data;
        document.querySelector('#specificItemId').textContent = item._id;
        document.querySelector('#specificItemName').textContent = item.name;
        document.querySelector('#specificItemPrice').textContent = item.price;
        document.querySelector('#specificItemQuantity').textContent = item.quantity;
        document.querySelector('#specificItemDescription').textContent = item.description;
        $('#specificModal').modal('show');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


// edit button init
const editButtonClick = async (_id) => {

    try {
        const response = await fetch(endpoint + `/get_item_by_id/${_id}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const item = data.data;
        document.querySelector('#editItemId').value = item._id;
        document.querySelector('#editItemName').value = item.name;
        document.querySelector('#editItemPrice').value = item.price;
        document.querySelector('#editItemQuantity').value = item.quantity;
        document.querySelector('#editItemDescription').value = item.description;
        $("#editModal").modal("show");
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

//Update Submit
const editSubmit = document.getElementById('editSubmit');
editSubmit.addEventListener('click', () => {
    updateItem();
});

const updateItem = async () => {
    const itemId = document.querySelector('#editItemId').value;
    const updatedItem = {
        name: document.querySelector('#editItemName').value,
        price: parseFloat(document.querySelector('#editItemPrice').value),
        quantity: parseInt(document.querySelector('#editItemQuantity').value),
        description: document.querySelector('#editItemDescription').value
    };

    if (!updatedItem.name || !updatedItem.price || !updatedItem.quantity || !updatedItem.description) {
        alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
        return;
    }

    try {
        const response = await fetch(endpoint + `/update_item`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: itemId, ...updatedItem })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        $("#editModal").modal("hide");
        //re redering
        renderTable();
    } catch (error) {
        console.error('Error updating data:', error);
    }
}

//insert button init
const insertButton = document.getElementById('insertButton');
insertButton.addEventListener('click', () => {

    $("#insertModal").modal("show");
});

const insertSubmit = document.getElementById('insertSubmit');
insertSubmit.addEventListener('click', () => {
    const itemName = document.getElementById('insertItemName').value;
    const itemPrice = document.getElementById('insertItemPrice').value;
    const itemQuantity = document.getElementById('insertItemQuantity').value;
    const itemDescription = document.getElementById('insertItemDescription').value;


    if (!itemName || !itemPrice || !itemQuantity || !itemDescription) {
        alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
        return;
    }


    const data = {
        name: itemName,
        price: parseFloat(itemPrice),
        quantity: parseInt(itemQuantity),
        description: itemDescription
    };

    fetch(endpoint + '/insert_item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            if (result.message === 'OK') {

                $("#insertModal").modal("hide");

                clearInsert()
                renderTable();
                $('html, body').animate({ scrollTop: $("#footer").offset().top }, 200);
            } else {
                alert(result.status);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});


const clearInsert = () => {
    document.getElementById('insertItemName').value = '';
    document.getElementById('insertItemPrice').value = '';
    document.getElementById('insertItemQuantity').value = '';
    document.getElementById('insertItemDescription').value = '';
}