console.log(`Loading wind_speed.js`);
const API = "http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_direction";
const API2 = "http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_direction/20";
let interval = 0;

// get element
const tableBody = document.getElementsByTagName("tbody")[0];
const echart = echarts.init(document.getElementById("echart"));


// fetching data
const getwindData= async (API) => {
    const data = await fetch(API);
    const dataJSON = await data.json(); 
    console.log(dataJSON); 

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



// fetching data for gagu chart
const getwindDataGagu= async (API2) => {
    const data2 = await fetch(API2);
    const dataJSON2 = await data2.json(); 
    console.log(dataJSON2); 
    drawChart(dataJSON2);
};

const drawChart = (dataJSON2) => {
    const xyValues = dataJSON2.map(wind_direction => {
        return(
            {
                "date_time": wind_direction.date_time, 
                "signal_Value":wind_direction.wind_direction
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

        var chartdata = [{
            value: parseInt(y[0], 10),
            name: 'Wind Direction'
        }]
        console.log(chartdata);
        
      
   var option = {
        tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
            feature: {
                restore: {},
                saveAsImage: {}
            }
        },
        series: [
            {
                name: ' Wind Direction(last)',
                type: 'gauge',
                detail: {formatter: '{value}%'},
                data: chartdata
            }
        ]
    };

    echart.setOption(option);
}
 getwindData(API)

 getwindDataGagu(API2)

