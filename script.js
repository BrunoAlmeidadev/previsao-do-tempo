document.querySelector("busca").addEventListener("subimit", async (event) => {
event.preventDefault(); // Retira os efeitos padrões

    let input = document.querySelector("searchInput").value;

    if (input !== "") {
        clearInfo();
        showWarning("Carregando...");

        let url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
            input
        )}&appid= 081873de0f4b9c25b268dd95191b9709&units=metric&lang=pt_br`;
        
        //Fazendo a requisição à API
        let results = await fetch(url);
        let json = await results.json();

        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
        });
        } else {
          clearInfo();
          showWarning(" Localização não encontrada");
        }
    }    else { 
         clearInfo();
    }
});

function showInfo(json) {
    showWarning("")
    document.querySelector(".titulo").innerHTML = `${json.name}, ${json.country}`;
    document.querySelector(".tempInfo").innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector(
        ".ventoInfo"
    ).innerHTML = `${json.windSpeed} <span>Km/h</span>`;

    document
        .querySelector(".temp img")
        .setAttribute(
            "src",
            `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
        );

    document.querySelector(".ventoPonto").style.transform = `rotate(${
        json.windAngle - 90
    }deg)`;
    document.querySelector(".resultado").style.display = "bolck";
}

function clearInfo() {
    showWarning("");
    document.querySelector(".resultado").style.display = "none";
}

const showWarning = (msg) => { 
    document.querySelector(".aviso").innerHTML = msg;
};
        


    
