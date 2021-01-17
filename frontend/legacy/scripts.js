console.log("Hello JavaScript!");

const tableBody = document.getElementsByTagName("tbody")[0];
console.log("tableBody", tableBody);

const getDataModern = async () => {
  const data = await fetch("http://webapi19sa-1.course.tamk.cloud/v1/weather");
  const dataJson = await data.json();
  for (item of dataJson) {
    const newRow = tableBody.insertRow();
    console.log("newrow", newRow);

    for (cell of ["date_time", "device_id", "id"]) {
      const newCell = newRow.insertCell(0);
      newCell.textContent = item[cell];
    }
  }
  console.log("dataJson", dataJson);
};

getDataModern();
