const view = document.querySelector(".view");
const pass  = document.querySelector(".pass");
const searchResult = document.querySelector(".results");


view.addEventListener("click", ()=>{
    pass.setAttribute("type", "text");
})


//searching

function sendData(e){
    //let match = e.value.match(/^[a-zA-z ]*/);
    let match2 = e.value.match(/\s*/);
    if(match2[0] === e.value){
        searchResult.innerHTML = "";
    }
    fetch('getUser',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({payload: e.value})
    }).then(res => res.json()).then(data => {
        let payload = data.payload;
        searchResult.innerHTML = "";
        if(payload < 1){
            searchResult.innerHTML = "<p>Sorry nothing found </p>";
            return;
        }
        payload.forEach((user, index) => {
            //console.log(user);
            //if(index > 0) searchResult.innerHTML += "<hr>";
            searchResult.innerHTML += `<a href ="/user/${user._id}"><p> ${user.username} <span> ${user.empID}</span></p></a>`;
        });
        return;
    });
}


function sendPatientData(e){
    //let match = e.value.match(/^[a-zA-z ]*/);
    let match2 = e.value.match(/\s*/);
    if(match2[0] === e.value){
        searchResult.innerHTML = "";
    }
    fetch('getPatient',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({payload: e.value})
    }).then(res => res.json()).then(data => {
        let payload = data.payload;
        searchResult.innerHTML = "";
        if(payload < 1){
            searchResult.innerHTML = "<p>Sorry nothing found </p>";
            return;
        }
        payload.forEach((user, index) => {
            //console.log(user);
            //if(index > 0) searchResult.innerHTML += "<hr>";
            searchResult.innerHTML += `<a href ="/patient/${user._id}"><p> ${user.username} <span> ${user.pID}</span></p></a>`;
        });
        return;
    });
}