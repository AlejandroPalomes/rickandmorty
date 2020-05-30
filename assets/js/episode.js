function printEpisode(url){
    $(".display__main").empty();
    axios({
        method: 'get',
        url: url,
      }).then((response)=>{
        $(".display__main").append(`
        <div class="display__main--episode d-flex flex-column">
            <h4>${response.data.name}</h4>
            <span><span>${response.data.air_date}</span> | <span>${response.data.episode}</span></span>
            <span class="display__main__title mt-5 mb-3">Caharacters</span>
            <div class="display__main__characters d-flex justify-content-between flex-wrap"></div>
        </div>
        `);
        var axiosArr = [];
        $(response.data.characters).each((i, char)=>{
            axiosArr.push(axios.get(char));
        })
        axios.all(axiosArr)
            .then(responseArr => {
                $(responseArr).each((i, e)=>{
                        var status;
                        if(e.data.status == "Alive"){
                            status = "status--green"
                        }else if(e.data.status == "Dead"){
                            status = "status--red"
                        }else{
                            status = "status--grey"
                        }
                        $(".display__main__characters").append(`
                        <button class="display__main__characters--main d-flex mb-3">
                            <div class="display__main__characters--img">
                                <img src="${e.data.image}" height="200"alt="">
                            </div>
                            <div class="d-flex flex-column justify-content-between p-3 display__main__characters--description">
                                <div class="d-flex flex-column align-items-start">
                                    <span class="character__name">${e.data.name}</span>
                                    <div class="d-flex align-items-center character__info"><div class="${status} mr-2"></div><span><span class="character__status">${e.data.status}</span> - <span class="character__specie">${e.data.species}</span></span></div>
                                </div>
                                <div class="character__lastLocation d-flex flex-column align-items-start">
                                    <span>Last known location:</span>
                                    <span>${e.data.location.name}</span>
                                </div>
                            </div>
                        </button>
                        `);
                });
                $(".display__main__characters--main").click(e=>{
                    console.log(e)
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