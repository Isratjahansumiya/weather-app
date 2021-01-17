console.log(`Loading temperature.js`); 

const API = "http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature";
let interval = 0;

// get element
const tableBody = document.getElementsByTagName("tbody")[0];
const echart = echarts.init(document.getElementById("echart"));
const timeInterval = document.getElementById("time-interval");

// fetching data
const gettemperatureData= async (API) => {
    const data = await fetch(API);
    const dataJSON = await data.json(); 
    console.log(dataJSON); 
    drawChart(dataJSON);
    
    
    for(rowData of dataJSON) {
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
                    newCell.textContent=rowData[cellKey];
                    break;
            }
        }

    }
}; 
const drawChart = (dataJSON) => {
    const xyValues = dataJSON.map(temperature => {
        return(
            {
                "date_time":temperature.date_time, 
                "signal_Value": temperature.temperature
            }
        )
    } )
    console.log(xyValues);
    console.log(xyValues.date_time);
    console.log(xyValues.signal_Value);
    
    
	const y = xyValues.map(y => y.signal_Value);
	console.log(y);
	const x = xyValues.map(x => 
        `${new Date(x.date_time).toLocaleDateString()} 
        ${new Date(x.date_time).toLocaleTimeString()}`);
		console.log(x);
    setOptions(xyValues)
    
}
const setOptions = (xyValues) => {
    const y = xyValues.map(y => y.signal_Value);
	console.log(y);
	const x = xyValues.map(x => 
        `${new Date(x.date_time).toLocaleDateString()} 
        ${new Date(x.date_time).toLocaleTimeString()}`);
		console.log(x);
    var option = {
        title: {
            text: ''
        },
        tooltip: {},
        legend: {
            data:['Temperature']
        },
        xAxis: {
            data: x
        },
        yAxis: {},
        series: [{
            name: 'Temperature',
            type: 'bar',
            data: y,                 
        }], 
    };
    echart.setOption(option);
}
gettemperatureData(API)
// time intervals

const updateInterval = () => {
    interval = timeInterval.value;
}
const clearView = () => {
    tableBody.innerHTML = "";
    echart.innerHTML = "";
}

const updateView = () => {
    updateInterval();
    let api;
    if(interval > 0) {
        api = `${API}${interval}`
    } else  {
        api = `${API}`
    }
    clearView();
    gettemperatureData(api);
}
timeInterval.addEventListener("click", updateView);
    
