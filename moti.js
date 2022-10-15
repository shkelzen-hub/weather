window.addEventListener('load' , ()=>{
    let long;
    let lat;
    let tempDesc    = document.querySelector('.temp-desc');
    let tempDegree  = document.querySelector('.temp-degree');
    let timezone    = document.querySelector('.location-timezone');
    let icon        = document.querySelector('.icon');
    let tempFeeling = document.querySelector('.temp-feeling');
    let wind        = document.querySelector('#wind');


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {

            long = position.coords.longitude;
            lat  = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=6f75c2048b625b32c1c037bdc5bd6424&units=metric&lang=al`;
            
            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                
                let elem     = document.createElement("img");
                let iconCode = data.weather[0].icon;
                
                tempDegree.textContent  = Math.floor(data.main.temp) ;
                tempFeeling.textContent = "Ndihet si: " + Math.floor(data.main.feels_like) +"°C";
                tempDesc.textContent    = data.weather[0].description;
                timezone.textContent    = data.name +' , '+data.sys.country;
                wind.textContent        = "Shpejtesia e eres: " + data.wind.speed + " m/s";
                icon.appendChild(elem) ; 
                elem.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

                
            });

        

        });
    }
});