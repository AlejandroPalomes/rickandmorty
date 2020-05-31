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
            <span class="display__main__title mt-5 mb-3">Characters</span>
            <div class="display__main__characters d-flex justify-content-around flex-wrap"></div>
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
                        var statusSm;
                        if(e.data.status == "Alive"){
                            status = "status--green"
                            statusSm = "statusSm--green"
                        }else if(e.data.status == "Dead"){
                            status = "status--red"
                            statusSm = "statusSm--red"
                        }else{
                            status = "status--grey"
                            statusSm = "statusSm--grey"
                        }
                        $(".display__main__characters").append(`
                        <button class="display__main__characters--main d-flex mb-3" data-url="${e.data.url}">
                            <div class="display__main__characters--img">
                                <img src="${e.data.image}" height="200"alt="">
                            </div>
                            <div class="d-flex flex-column justify-content-md-between justify-content-center p-3 display__main__characters--description">
                                <div class="d-flex flex-column align-items-start">
                                    <span class="character__name">${e.data.name}</span>
                                    <div class="d-flex align-items-center character__info"><div class="${status} mr-2 d-none d-md-block"></div><span><span class="character__status ${statusSm}">${e.data.status}</span> - <span class="character__specie">${e.data.species}</span></span></div>
                                </div>
                                <div class="character__lastLocation d-none d-md-flex flex-column align-items-start">
                                    <span>Last known location:</span>
                                    <span class="lastLocationBtn" data-url="${e.data.location.url}">${e.data.location.name}</span>
                                </div>
                            </div>
                        </button>
                        `);
                });
                $(".display__main__characters--main").click(e=>{
                    printCharacter($(e.currentTarget).data("url"))
                });
                $(".lastLocationBtn").click(e=>{
                    printLocation($(e.target).data("url"));
                    return false;
                });
            });
      });
}