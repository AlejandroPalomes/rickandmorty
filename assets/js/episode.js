function printEpisode(url){
    $(".display__main").empty();
    axios({
        method: 'get',
        url: url,
      }).then((response)=>{
        console.log(response.data);
        $(".display__main").append(`
        <div class="display__main--episode d-flex flex-column">
            <h4>${response.data.name}</h4>
            <span><span>${response.data.air_date}</span> | <span>${response.data.episode}</span></span>
            <span class="display__main__title mt-5 mb-3">Caharacters</span>
            <div class="display__main__characters d-flex justify-content-between flex-wrap">
                <div class="display__main__characters--main d-flex">
                    
                </div>
            </div>
        </div>
        `);
        var axiosArr = [];
        $(response.data.characters).each((i, char)=>{
            axiosArr.push(axios.get(char));
        })
        axios.all(axiosArr)
          .then(responseArr => {
              $(responseArr).each((i, e)=>{
                  console.log(e.data)
              })
          })
        // <div class="display__main__characters--img">
        //                 <img src="assets/img/5pr2d6fopii31.jpg" height="200"alt="">
        //             </div>
        //             <div class="d-flex flex-column justify-content-between p-3">
        //                 <div>
        //                     <span class="character__name">Rick Sanchez</span>
        //                     <div class="d-flex align-items-center character__info"><div class="status--green mr-2"></div><span><span class="character__status">Alive</span> - <span class="character__specie">Human</span></span></div>
        //                 </div>
        //                 <div class="character__lastLocation d-flex flex-column">
        //                     <span>Last known location:</span>
        //                     <span>Earth (Replacement Dismension)</span>
        //                 </div>
        //             </div>
      });
}