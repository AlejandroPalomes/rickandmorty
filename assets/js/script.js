var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene
    , 
//     {
//   relativeInput: true
// }
);
parallaxInstance.friction(0.2, 0.2);

$("#sideMenu").mouseover(e=>{
    $("#sideMenu").stop().animate({
        width: "25%",
    }, 500, "swing")
    // $("#sideMenu").css("width", "400px")
})

$("#sideMenu").mouseout(e=>{
    $("#sideMenu").stop().animate({
        width: "20px"
    }, 500)
    // $("#sideMenu").css("width", "20px")
})


axios({
    method: 'get',
    url: 'https://rickandmortyapi.com/api/episode',

  }).then((response)=>{
    $(response.data.results).each((i,e)=>{
        $("#episodes").append(`<li><button id="${e.id}" data-url="${e.url}" class="main__container__menu--episode mb-1 p-2">${e.name}</button><li>`);
    })
    $(".main__container__menu--episode").click(e=>{
        printEpisode($(e.target).data("url"));
    })
  });