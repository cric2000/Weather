window.addEventListener('load',()=>{
      let lat;
      let long;
      let heading = document.querySelector('.weather');
      let location = document.querySelector('.location');
      let icon = document.querySelector('.icon');
      let temp= document.querySelector('.temp');
      let tempUnit = document.querySelector('.unit');
      let description = document.querySelector('.description');
      let clickUnit = document.querySelector('.temp-unit');
      let input = document.querySelector('.text');
      let button = document.querySelector('.btn');
      let night ="night.jpg";
      let day ="sky.jpg";
      let textContainer = document.querySelector('.text-container');
      let footerText = document.querySelector('.footer-text');
      let message1 = document.querySelector('.message1');
      let message2 = document.querySelector('.message2');

      try {
          if(navigator.geolocation){
               navigator.geolocation.getCurrentPosition(positonData=>{
                  lat = positonData.coords.latitude;
                  long = positonData.coords.longitude;
                  let unit="imperial";
                  const webApi = ` https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=af79f5179395082b2202446d6a3b9902&units=`+unit ;
                  fetch(webApi)
                  .then(data=>{
                      return data.json();
                  })
                  .then(realData=>{
                      console.log(realData);
                      let dataTemp = realData.main.temp;
                      let descripitonData = realData.weather[0].description;
                      let dataIcon = realData.weather[0].icon;
                      let dataCity = realData.name;
                      let imgData = "http://openweathermap.org/img/wn/"+dataIcon+"@2x.png";
                  
                      location.textContent=dataCity;
                      icon.innerHTML="<img src="+imgData+" alt ='weather icon'>";
                      temp.textContent=dataTemp;
                      description.textContent=descripitonData;


                      if(descripitonData.includes("clear")){
                          message1.textContent="Looks like sky is clear today";
                          message2.textContent="Enjoy the weather and take care";
                      }


                      let Cel = (dataTemp-32)*(5/9);

                      clickUnit.addEventListener('click',()=>{
                            if(tempUnit.textContent==="F"){
                                tempUnit.textContent="C";
                                temp.textContent=Math.round(Cel);
                            }
                            else{
                                tempUnit.textContent="F";
                                temp.textContent=dataTemp;
                            }
                      });



                      if(dataIcon.includes("d")){
                          document.getElementsByClassName('img-container')[0].style.backgroundImage = `url(${day})`; 
                          heading.style.color="rgba(34, 49, 63, 0.9)";
                          textContainer.style.backgroundColor="rgba(255,255,255,0.5)";
                          input.style.color="rgba(0,0,0,0.8)";
                          input.style.backgroundColor="rgba(255,255,255,0.005)";
                          footerText.style.color="rgba(34, 49, 63, 0.9)";
                      }
                      else if(dataIcon.includes("n")){
                        document.getElementsByClassName('img-container')[0].style.backgroundImage = `url(${night})`; 
                        heading.style.color="rgba(255,255,255,0.9)";
                        textContainer.style.backgroundColor="rgba(0,0,0,0.5)";
                        input.style.color="rgba(255,255,255,0.8)";
                        input.style.backgroundColor="rgba(0,0,0,0.005)";
                        footerText.style.color="rgba(255,255,255,0.9)";
        
                      }

                    button.addEventListener('click',()=>{
                         let inputCity;
                         let units = "imperial";
                         inputCity = input.value;
                         const apiCity = "http://api.openweathermap.org/data/2.5/weather?q="+inputCity+"&appid=af79f5179395082b2202446d6a3b9902&units="+units;

                         fetch(apiCity)
                         .then(dataCity=>{
                             return dataCity.json();
                         })
                         .then(actualCity=>{
                             console.log(actualCity);
                             let cityTemp = actualCity.main.temp;
                             let cityDescription = actualCity.weather[0].description;
                             let cityIcon = actualCity.weather[0].icon;
                             let cityImg = "http://openweathermap.org/img/wn/"+cityIcon+"@2x.png";
                             location.textContent=inputCity;
                             temp.textContent=cityTemp;
                             description.textContent=cityDescription;
                             icon.innerHTML="<img src="+cityImg+" alt='weather image'>";

                        

                      if(cityIcon.includes("d")){
                        document.getElementsByClassName('img-container')[0].style.backgroundImage = `url(${day})`; 
                        heading.style.color="rgba(34, 49, 63, 0.9)";
                        textContainer.style.backgroundColor="rgba(255,255,255,0.5)";
                        input.style.color="rgba(0,0,0,0.8)";
                        input.style.backgroundColor="rgba(255,255,255,0.005)";
                        footerText.style.color="rgba(34, 49, 63, 0.9)";
                    }
                    else if(cityIcon.includes("n")){
                      document.getElementsByClassName('img-container')[0].style.backgroundImage = `url(${night})`; 
                      heading.style.color="rgba(255,255,255,0.9)";
                      textContainer.style.backgroundColor="rgba(0,0,0,0.5)";
                      input.style.color="rgba(255,255,255,0.8)";
                      input.style.backgroundColor="rgba(0,0,0,0.005)";
                      footerText.style.color="rgba(255,255,255,0.9)";
                      
                    }
                });
            });


                     
                      
        });
               });
          }
      } catch (error) {
          heading.textContent=error;
      }
});
