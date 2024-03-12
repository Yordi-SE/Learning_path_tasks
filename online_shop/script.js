const Store = [{
    name : "coffe",
    price: 20,
    quantity:20
},
{
    name : "tv",
    price: 20,
    quantity:20
},
{
    name : "tea",
    price: 20,
    quantity:20
},
{
    name : "cloth",
    price: 20,
    quantity:20
},
{
    name : "shoes",
    price: 20,
    quantity:20
},
{
    name : "laptop",
    price: 20,
    quantity:20
},
{
    name : "books",
    price: 20,
    quantity:20
}]
async function sendData(method,url) {
    let data
    if (method === "DELETE"){
        const name = document.getElementById('name2').value;
        data = {
            name: name,
        }
    }
    else{
        const name = document.getElementById('name').value;
        const quantity = document.getElementById('quantity').value;
        data = {
            name: name,
            quantity: quantity,
        };
    }


    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log('Data sent successfully');
            document.getElementById('name').value = '';
            document.getElementById('name2').value = '';
            document.getElementById('quantity').value = '';
            fetchData()
            const dataContainer = document.getElementById('error');
            const text = await response.text();
            dataContainer.innerHTML = text + " => " + response.status; 
            setTimeout(() => {
                dataContainer.innerHTML = "";
                
            }, 3000);
        } else {
            const dataContainer = document.getElementById('error');
            const text = await response.text();
            dataContainer.innerHTML = 'Failed to send data: ' + text + " => " + response.status; 
            setTimeout(() => {
                dataContainer.innerHTML = "";
                
            }, 3000);
            console.error('Failed to send data:', response.statusText);
        }
    } catch (error) {
        console.error('Error sending data:', error);
    }
}
async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/show_cart');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayData(data) {
    const dataContainer = document.getElementById('dataContainer');
    dataContainer.innerHTML = ''; 
    console.log(data)
    if (data.length === 0){
        dataContainer.innerHTML = "The Cart is Currently Empty"
        return
    }
    data.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.textContent = `Name: ${item.name}, Price: ${item.price},Quantity: ${item.quantity}`; 

        dataContainer.appendChild(itemElement);
    });
}
function store(){
    const dataContainer = document.getElementById('store');
    Store.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.textContent = `Name: ${item.name}, Price: ${item.price},Quantity: ${item.quantity}`; 

        dataContainer.appendChild(itemElement);
    });
}
fetchData();
store();
