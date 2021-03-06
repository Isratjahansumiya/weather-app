console.log(`Loading latest 50.js`); 

// get element
const tableBody = document.getElementsByTagName("tbody")[0];

// fetching data
const getDataModern = async () => {
    const data = await fetch("http://webapi19sa-1.course.tamk.cloud/v1/weather");
    const dataJSON = await data.json(); 
    console.log("dataJSON", dataJSON); 
    const latest50 = dataJSON.slice(0, 50);
    console.log("dataJSOn50", latest50);

    for(rowData of latest50) {
        const newRow = tableBody.insertRow(-1);
        const cellKeys = Object.keys(rowData)
            .filter(key => (key !== "id" && key !== "device_id")); 
        
        console.log(cellKeys)
        for(cellKey of cellKeys) {
            
            let newCell = newRow.insertCell(-1);
            switch(cellKey) {
                case "date_time":
                    const date = new Date(rowData[cellKey]).toLocaleDateString();
                    newCell.textContent = date;
                    console.log(date);
                    const time = new Date(rowData[cellKey]).toLocaleTimeString();
                    newCell = newRow.insertCell(-1);
                    newCell.textContent = time;
                    console.log(time);
                    break;
                case "data":
                    const key = Object.keys(rowData[cellKey])[0]; 
                    const value = rowData[cellKey][key]; 
                    newCell.textContent = key;
                    newCell = newRow.insertCell(-1);
                    newCell.textContent = value.toFixed(2); 
                    break; 
                default:
                    break;
            }
        }

    }
}; 

getDataModern(); 