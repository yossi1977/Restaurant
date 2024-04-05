const show_home = document.querySelector("#home_page")
const table = document.querySelector(".table")
const form_info  = document.querySelector(".addForm")
const btn_add = document.querySelector("#btn_add")

const clientHeadForm = document.querySelector("#clientHeadForm")
const dishesHeadForm  = document.querySelector("#dishesHeadForm")
const workerHeadForm  = document.querySelector("#workerHeadForm")
const eventHeadForm  = document.querySelector("#eventHeadForm")
const registerHeadForm =document.querySelector("#registerHeadForm")
const loginHeadForm = document.querySelector("#loginHeadForm")
const navBar = document.querySelectorAll(".nav-bar")
// th array
const th_client = ["ID","First Name","Last Name","Phone","Email","Option"]
const th_dishes = ["ID","Dishes Name","description","Price","Option"]
const th_events = ["ID","Date","Time","Guests","Price","Client Name","Client Contact","Option"]
const th_workers = ["ID","Firs Name","Last Name","Phone","Title","Salary","Option"]

url = "http://localhost:3000"


async function getApi(url,name,formName){
    try {
     
      const response = await fetch(url)
      const data = await response.json()
        // console.log(data)
        build_Td(data,name,formName)
    } catch (error) {
       console.log(error) 
    }
}

async function deleteItems(url,id,name){
    try {
        const response = await fetch(`${url}/${name}/${id}`,{
            method: "DELETE"
        })
        getApi(`${url}/${name}`,name)
    } catch (error) {
        console.log(error)
    }
}

async function postItems(url,name,newItemData,formName){
    try {
       
        const response = await fetch(`${url}/${name}`,{
            method: "POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(newItemData)
            
        })
        // to add the token to local storage 
        if (name === "users/login"){
            const data = await response.json()
            if (data.success){
                localStorage.setItem("token",JSON.stringify(data.token))
            }
        }
        // when we call from register or login we don't  want to call the api 
        if (name != "users/register" && name != "users/login"){
             getApi(`${url}/${name}`,name,formName)
            }
        
    } catch (error) {
        console.log(error)  
    }
}

async function updateItems(url,name,id,newItemData,formName){
    try {
        const response = await fetch(`${url}/${name}/${id}`,{
            method: "PUT", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newItemData)
        })

        await response.json(); 
        getApi(`${url}/${name}`,name,formName)

    } catch (error) {
        console.log(error)
    }

}
function build_Th(arr){
    table_head.innerHTML =""
    arr.forEach(val => {
        table_head.innerHTML += `
        <th scope="col">${val}</th>
        `
    });
}

let idForUpDate;
//formName - to run all the input of the specific form 
function build_Td(arr,name,formName){

    table_body.innerHTML = ""
    console.log(name)
    arr[name].forEach((val)=>{
        console.log(val)
        const row = document.createElement("tr")
        const valuesArray = [];
        // Iterate over the properties of 'val' object
        for (const key in val) {
            if (val.hasOwnProperty(key) && key !== "__v") {
                // Push the value of each property into the array
                valuesArray.push(val[key]);
            }
        }
        valuesArray.forEach(val =>{
            const cell = document.createElement("td")
            cell.textContent = val
            row.appendChild(cell)
        })
        // cerate delete button
        const deleteButton = document.createElement("button")
        deleteButton.setAttribute("type", "button")
        deleteButton.setAttribute("class", "btn btn-primary")
        deleteButton.setAttribute("style", "margin-left: 10px;")
        // Create an icon element for the garbage icon
        const iconElementDelete = document.createElement("i")
        iconElementDelete.setAttribute("class", "fas fa-trash-alt")
        // Append the icon to the delete button
        deleteButton.appendChild(iconElementDelete);

        deleteButton.addEventListener("click", function() {
            const id = valuesArray[0]
            deleteItems(url,id,name)
        });
        row.appendChild(deleteButton);
        
        // Create the update button element
        const  updateButton = document.createElement("button")
        updateButton.setAttribute("type", "button")
        updateButton.setAttribute("class", "btn btn-primary")
        updateButton.setAttribute("style", "margin-left: 10px;")
        const iconElementUpdate = document.createElement("i")
        iconElementUpdate.setAttribute("class", "fas fa-sync-alt")
        updateButton.appendChild(iconElementUpdate)

        updateButton.addEventListener("click", ()=>{
            // Get an array of input elements inside the form
            const inputs = formName.querySelectorAll("input , textarea")
            // Iterate over the input elements and set their values from valuesArray
            inputs.forEach((input, index) => {
                input.value = valuesArray[index + 1] // +1 because index 0 its the id
                idForUpDate = valuesArray[0]
                // console.log(idForUpDate)

            })
        })
        row.appendChild(updateButton);
        table_body.appendChild(row)
    })
}

// all nav bar on click

function home_opp() {
    show_home.style.display = "block" 
    table.style.display ="none"
    clientHeadForm.style.display = "none"
    dishesHeadForm.style.display ="none"
    workerHeadForm.style.display = "none"
    eventHeadForm.style.display = "none"
    registerHeadForm.style.display = "none"
    loginHeadForm.style.display="none"
}
function client_opp(){
    clientHeadForm.style.display = "block"
    dishesHeadForm.style.display ="none"
    workerHeadForm.style.display = "none"
    eventHeadForm.style.display = "none"
    registerHeadForm.style.display = "none"
    loginHeadForm.style.display="none"
    url_client = `${url}/clients`
    displayAndBuild(url_client,"clients",th_client,clientHeadForm)
}
function worker_opp(){
    clientHeadForm.style.display = "none"
    dishesHeadForm.style.display ="none"
    workerHeadForm.style.display = "block"
    eventHeadForm.style.display = "none"
    registerHeadForm.style.display = "none"
    loginHeadForm.style.display="none"
    url_workers = `${url}/workers`
    displayAndBuild(url_workers,"workers",th_workers,workerHeadForm)
}
function dishes_opp(){
    clientHeadForm.style.display = "none"
    dishesHeadForm.style.display ="block"
    workerHeadForm.style.display = "none"
    eventHeadForm.style.display = "none"
    registerHeadForm.style.display = "none"
    loginHeadForm.style.display="none"
    url_dishes = `${url}/dishes`
    displayAndBuild(url_dishes,"dishes",th_dishes,dishesHeadForm)
}
function event_opp(){
    clientHeadForm.style.display = "none"
    dishesHeadForm.style.display ="none"
    workerHeadForm.style.display = "none"
    eventHeadForm.style.display = "block"
    registerHeadForm.style.display = "none"
    loginHeadForm.style.display="none"
    url_events = `${url}/events`
    displayAndBuild(url_events,"events",th_events,eventHeadForm)
}

function register_opp(){
    clientHeadForm.style.display = "none"
    dishesHeadForm.style.display ="none"
    workerHeadForm.style.display = "none"
    eventHeadForm.style.display = "none"
    registerHeadForm.style.display = "block"
    loginHeadForm.style.display="none"
    show_home.style.display = "none"
    table.style.display =  "none"
}
//link
function register_link(){
    registerHeadForm.style.display ="none"
    loginHeadForm.style.display ="block"
}
function login_link(){
    registerHeadForm.style.display ="block"
    loginHeadForm.style.display ="none"
}
function displayAndBuild(url,end_point,arr_th,formName){
    show_home.style.display = "none"
    table.style.display =  "block"
    build_Th(arr_th)
    getApi(url,end_point,formName)
}

// all submit forms btn
function submitClient(flag = true,event){
    
    if(event) event.preventDefault()
    //get input value 
    const firstName = document.getElementById("client_firstName").value;
    const lastName = document.getElementById("client_lastName").value;
    const phone = document.getElementById("client_phone").value;
    const email = document.getElementById("client_email").value;

    // Create an object with the form data
        const newItemData = {
        client_firstName: firstName,
        client_lastName: lastName,
        client_phone: phone,
        client_email: email
    };
     // Call postItems function to send data to the server
    if (flag) postItems(url,"clients", newItemData,clientHeadForm)

    //for update i need the form input value
    if (!flag) return newItemData
    
}
function submitDishes(flag =true,event){
    if(event) event.preventDefault()
    const name = document.getElementById("dishes_name").value;
    const description = document.getElementById("dishes_description").value;
    const price = document.getElementById("dishes_price").value;

    const newItemData = {
        dishes_name : name,
        dishes_description: description,
        dishes_price: price
    } 
    // only when i click submit
    if (flag) postItems(url,"dishes", newItemData,dishesHeadForm)

    //for update i need the form input value
    if (!flag) return newItemData
}
function submitWorker(flag =true,event){
    if(event) event.preventDefault()
    const firstName = document.getElementById("worker_firstName").value;
    const lastName = document.getElementById("worker_lastName").value;
    const title = document.getElementById("worker_title").value;
    const phone = document.getElementById("worker_phone").value;
    const salary = document.getElementById("worker_salary").value;

    const newItemData = {
        worker_firstName: firstName,
        worker_lastName: lastName,
        worker_title: title,
        worker_phone: phone,
        worker_salary:salary
    }
    if (flag) postItems(url,"workers", newItemData,workerHeadForm)
    if (!flag) return newItemData
}
function submitEvent(flag =true,event) {

    if(event) event.preventDefault()
    const eventDate = document.getElementById("event_date").value;
    const eventTime = document.getElementById("event_time").value;
    const numberOfPeople = document.getElementById("number_of_ppl").value;
    const orderPrice = document.getElementById("order_price").value;
    const clientName = document.getElementById("clientName").value;
    const clientContact = document.getElementById("clientContact").value;

    const newItemData = {
        event_date: eventDate,
        event_time: eventTime,
        number_of_ppl: numberOfPeople,
        order_price: orderPrice,
        clientName: clientName,
        clientContact: clientContact
    }

    if (flag) postItems(url,"events", newItemData,eventHeadForm)
    if (!flag) return newItemData
}

function submitRegister(flag=true, event){
    if(event) event.preventDefault()
    const registerName = document.getElementById("user_name").value;
    const registerEmail = document.getElementById("email_register").value;
    const registerPassword = document.getElementById("password_register").value;
    const confirm_password = document.getElementById("confirm_password").value;
    if(registerPassword != confirm_password ) return alert("password not mach")

    const newItemData = {
        user_name:registerName,
        user_email:registerEmail,
        user_password:registerPassword
    }

    if (flag){
        postItems(url,"users/register", newItemData,registerHeadForm)
        register_link()
    } 
    if (!flag) return newItemData

}
function submitLogin(flag=true, event){
    if(event) event.preventDefault()
    const loginEmail = document.getElementById("email_login").value;
    const loginPassword = document.getElementById("password_login").value;
    const newItemData = {
        user_email:loginEmail,
        user_password:loginPassword
    }

    if (flag) {
        postItems(url,"users/login", newItemData,loginHeadForm)
        // to open all the icon on nav bar
        navBar.forEach(val => {
        val.style.display = "block"
        //using this function will send him to home 
        home_opp()
        });
       
    if (!flag ) return newItemData

}}

//all update btn
function updateClient(){
    // get back the new date before i update
    const newItemData = submitClient(false) //get the info from the form
    updateItems(url,"clients",idForUpDate,newItemData,clientHeadForm)  
}
function updateWorker(){
    const newItemData = submitWorker(false) //get the info from the form
    updateItems(url,"workers",idForUpDate,newItemData,workerHeadForm) 
}
function updateDishes () { 
    const newItemData = submitDishes(false) //get the info from the form
    updateItems(url,"dishes",idForUpDate,newItemData,dishesHeadForm)
 }

 function updateEvent(){
    
    const newItemData = submitEvent(false) //get the info from the form
    updateItems(url,"events",idForUpDate,newItemData,eventHeadForm)
}

//all clear from function
function clintClearForm(){
    //get the form recreance
    const input = clientHeadForm.querySelectorAll("input , textarea")
    //lop through all the input
    input.forEach(input =>{
    // set there value to ""   
        input.value = ""
    })
  
}
function dishesClearForm(){
    const input = dishesHeadForm.querySelectorAll("input , textarea")
    input.forEach(input =>{
        input.value = ""
    })
}
function workerClearForm(){
    const input = workerHeadForm.querySelectorAll("input , textarea")
    input.forEach(input =>{
        input.value = ""
    })
}

function eventClearForm(){
    const input = eventHeadForm.querySelectorAll("input , textarea")
    input.forEach(input =>{
        input.value = ""
    })
}
