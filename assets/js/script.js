var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene
    , 
//     {
//   relativeInput: true
// }
);
parallaxInstance.friction(0.2, 0.2);

$("#sideMenu").mouseover(e=>{
    console.log(e.target)
    $("#sideMenu").stop().animate({
        width: "25%",
    }, 500, "swing")
    // $("#sideMenu").css("width", "400px")
})

$("#sideMenu").mouseout(e=>{
    console.log("hover works")
    $("#sideMenu").stop().animate({
        width: "20px"
    }, 500)
    // $("#sideMenu").css("width", "20px")
})


axios({
    method: 'get',
    url: 'https://rickandmortyapi.com/api/episode',

  }).then((response)=>{
    console.log(response.data.results)
    $(response.data.results).each((i,e)=>{
        console.log(e.name)
        $("#episodes").append(`<li><button id="${e.id}" data-url="${e.url}" class="main__container__menu--episode mb-1 p-2">${e.name}</button><li>`);
    })
    $(".main__container__menu--episode").click(e=>{
        console.log(e.target)
    })
  });