console.log("Loading common.js..");

/*
  Load navbar to #navbar-element
*/
const navbarHtml = `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="/">Navbar</a>
    <ul class="navbar-nav">
        <li class="nav-item active">
        <a class="nav-link" href="/">Home</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="/datadump.html">Datadump</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="/latest 50.html">Latest values</a>
        <li class="nav-item">
        <a class="nav-link" href="/temperature.html">Temperature</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="/humidity_out.html">Humidity out</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="/wind_speed.html">wind speed</a>
        </li>
        
    </ul>
</nav>
`;
const navbarElement = document.getElementById("navbar-element");
navbarElement.innerHTML = navbarHtml;
/*ends navbar element*/
const selectOption = `
<label for="time-interval">choose time interval:</label>
<select id="time-interval" class="form-control">
    <option selected="selected" value="0">Live</option>
    <option value="24">24 hour</option>
    <option value="48">48 hour</option>
    <option value="72">72 hour</option>
    <option value="168">last week</option>
    <option value="744">last month</option>
</select>
`;
const selectElement = document.getElementById("select-option");
selectElement.innerHTML =selectOption;
