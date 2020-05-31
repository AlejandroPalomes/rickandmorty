function printCharacter(url) {
  $(".display__main").empty();
  axios({
    method: 'get',
    url: url,
  }).then((response) => {
    $(".display__main").append(`
        <div class="display__main--character d-flex flex-column">
            <div class="d-block d-sm-flex flex-column flex-md-row align-items-center align-items-sm-start">
              <img src="${response.data.image}" height="200" width="200" class="mb-2 mb-md-0 mr-0 mr-sm-5">
              <div class="d-flex flex-column align-items-center align-items-sm-start">
                <h4>${response.data.name}</h4>
                <span><span>${response.data.species}</span> | <span>${response.data.status}</span> | <span>${response.data.gender}</span> | <button id="locationBtn" data-url="${response.data.origin.url}">${response.data.origin.name}</button></span>
              </div>
            </div>
            <span class="display__main__title mt-5 mb-3">Episodes</span>
            <div class="display__main__episodes d-flex  justify-content-around flex-wrap"></div>
        </div>
        `);
    var axiosArr = [];
    $(response.data.episode).each((i, char) => {
      axiosArr.push(axios.get(char));
    })
    axios.all(axiosArr)
      .then(responseArr => {
        $(responseArr).each((i, e) => {
          $(".display__main__episodes").append(`
                        <button class="display__main__episodes--main d-flex flex-column mb-3 p-2 mr-2 justify-content-center align-items-center align-items-sm-start" data-url="${e.data.url}">
                            <span class="display__main__episodes--title">${e.data.name}</span>
                            <span class="display__main__episodes--code">${e.data.episode}</span>
                        </button>
                        `);
        });
        $(".display__main__episodes--main").click(e => {
          printEpisode($(e.currentTarget).data("url"))
        });
        $("#locationBtn").click(e => {
          printLocation($(e.target).data("url"));
        });
      });
  });
}