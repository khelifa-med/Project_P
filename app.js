

let hide_show_btn = document.getElementById('hide_display')

let contantF = document.querySelector('.contantF')






let baseUrl = 'https://tarmeezacademy.com/api/v1/'

comeInMyACount()


// Loder

function getShowLoder(show=true)
{
    if(show){
        document.getElementById('loder').style.visibility ='visible'
    }
    else{
        document.getElementById('loder').style.visibility ='hidden'

    }
}

//verify the login data
function getLoginRegister() 
{
   let PassWord = document.getElementById('password').value
   let username = document.getElementById('userName').value
//    getShowLoder(true)
   
   axios.post(`${baseUrl}login`,{
       "username" : username,
       "password" : PassWord
   })
   .then((response)=>{
     
        // getShowLoder(false)

       console.log(response.data)
       let token = response.data.token
       localStorage.setItem('token' ,token)
       localStorage.setItem('User', JSON.stringify(response.data.user))
       
       // hidden the modal
       let modal = document.getElementById('Login_Modal')
       let modalInstance= bootstrap.Modal.getInstance(modal)
       modalInstance.hide()

       showAlert('Logged in Successfully','success')
       comeInMyACount()
 
   })
   .catch(function (error) {
       
       console.log(error.response.data.error)

   }).finally(()=>{
    // getShowLoder(false)
   })

   

   
}

// Register user with formData

function getRegister()
{
    let PassWord = document.getElementById('Register_password_input').value
    let username = document.getElementById('Register_userName_input').value
    let name = document.getElementById('Register_name_input').value
    let Image_input = document.getElementById('Register_image_input').files[0]

    let bodyFormData = new FormData();
    bodyFormData.append('username', username);
    bodyFormData.append('password', PassWord);
    bodyFormData.append('name', name);
    bodyFormData.append('image', Image_input);

    const headers = {
        "Content-Type": "multipart/form-data"
    }
    getShowLoder(true)
    axios.post(`${baseUrl}register`,bodyFormData,{
        headers : headers
    })
    .then((response)=>{

        getShowLoder(false)
        console.log(response.data)
        let token = response.data.token
        localStorage.setItem('token' ,token)
        localStorage.setItem('User', JSON.stringify(response.data.user))
        
        // hidden the modal
        let modal = document.getElementById('Register_Modal')
        let modalInstance= bootstrap.Modal.getInstance(modal)
        modalInstance.hide()

        showAlert('New user register successfully','success')
        comeInMyACount()
  
    })
    .catch(function (error) {
        showAlert(error.response.data.message,'danger') 
    }).finally(()=>{
        getShowLoder(false)
    })

    
}

// crate a new post





// Go inside My Acount
function comeInMyACount()
{
    
    // hide the buttons
    const token = localStorage.getItem('token')

    if (token == null)
    {
        checkOut()
    }else {
        checkIn()
    }
}


// Log_In and Log_Out From The Page (UI) //
function LogOut()
{
    localStorage.clear()
    checkOut()  
    showAlert('Logged out Successfully','success')
}

function checkOut()
{
    contantF.innerHTML=     
    `
    <button type="button" id="Login" data-bs-toggle="modal" data-bs-target="#Login_Modal" class="btn btn-outline-success mx-2 ">Login</button>
    <button type="button" id="Register" data-bs-toggle="modal" data-bs-target="#Register_Modal" class="btn btn-outline-primary ">Register</button>
    `
   

    hide_show_btn.innerHTML=''
}

function checkIn()
{
    let User = getCurrentUser()
   
    contantF.innerHTML = 
    `
    <img src="${User.profile_image}" style="width: 40px;height: 40px;border-radius: 100px; border: 2px solid gray;" alt="">
    <b class='username'>${User.username}</b>
    <button type="button" id="LogOut" onclick="LogOut()"  class="btn btn-outline-danger logout ">LogOut</button>
    `
    hide_show_btn.innerHTML = 
        `
        <div id="add_post" onclick="addButtonClicked()">
          <samp>+</samp>
        </div>
        `

    
    
   
}

// Check if the data !=null and get the user userName from the storage
function getCurrentUser()
{
    let user = null
    const storageUser = localStorage.getItem('User')

    if(storageUser != null)
    {
        user = JSON.parse(storageUser)
    }

    return user
}

// Log_In and Log_Out From The Page (UI) //

// alert

function showAlert(MessageLog,color)
{
    const alertPlaceholder = document.getElementById('Succes_Alart')
    const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type}  alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
    }

    
    appendAlert(MessageLog, color)

    setTimeout(()=>{
        const alert = bootstrap.Alert.getOrCreateInstance('#Succes_Alart')
        
    },2000)
  
}


function createNewPostClicked()
{

    let postId = document.getElementById('post_id').value

    let isCreate = postId == null || postId == ""
    


    let title = document.getElementById('create_post_title').value
    let Body_message = document.getElementById('create_post_body').value
    let Image_input = document.getElementById('create_post_image').files[0]
    
    let bodyFormData = new FormData();
    bodyFormData.append('image', Image_input);
    bodyFormData.append('title', title);
    bodyFormData.append('body', Body_message);

    
    // We need here to send the token the can make us create a new thing in our acount 
    let token = localStorage.getItem('token')

    const headers = {
        "authorization" : `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
    }
    let url = `${baseUrl}posts`

    if (isCreate) 
    {
        url = `${baseUrl}posts`

    }else
    {
        bodyFormData.append("_method","put")
        url = `${baseUrl}posts/${postId}`  
    }

    axios.post(url,bodyFormData,{
        headers : headers
    })
    .then((response)=>{

        // hidden the modal
        let modal = document.getElementById('Create_post_Modal')
        let modalInstance= bootstrap.Modal.getInstance(modal)
        modalInstance.hide()
        showAlert('New Post created successfully','success')
        getPost()

    })
    .catch(function (error) {
        showAlert(error.response.message,'danger')
    });
    
    
}


// Delete the post
function editButtonClicked(postObject)
{
    let post = JSON.parse(decodeURIComponent(postObject))
    
    document.getElementById('post_modal_submit_btn').innerHTML ='Update'
    document.getElementById('post_id').value = post.id
    document.getElementById('post_modal_title').innerHTML ='Edit Post'
    document.getElementById('create_post_title').value = post.title
    document.getElementById('create_post_body').value = post.body


    let PostMOdal = new bootstrap .Modal(document.getElementById('Create_post_Modal'),{})
    PostMOdal.toggle()

}

function deleteButtonClicked(postObject)
{
    let post = JSON.parse(decodeURIComponent(postObject))
    document.getElementById('delete_post_id_input').value = post.id

    document.getElementById('post_modal_submit_btn').innerHTML ='Update'
    document.getElementById('post_id').value = post.id

    let PostMOdal = new bootstrap .Modal(document.getElementById('delete_post_Modal'),{})
    PostMOdal.toggle()

}

// Conferm The Delete

function ConfermButtonClicked()
{
  let postId = document.getElementById('delete_post_id_input').value

 
  

    let url = `${baseUrl}posts/${postId}`

    let token = localStorage.getItem('token')

   let headers = {
        "authorization" : `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
    }
    
 
    axios.delete(url,{
        headers : headers
    })
    .then((response)=>{
 
       
        console.log(response)
        // hidden the modal
        let modal = document.getElementById('delete_post_Modal')
        let modalInstance= bootstrap.Modal.getInstance(modal)
        modalInstance.hide()
        showAlert('The post has been deleted successfully','success')
        getPost()
    })
    .catch(function (error) {
        showAlert(error.response.data.message,'danger')
    });
 
}

function addButtonClicked()
{
    
    document.getElementById('post_modal_submit_btn').innerHTML ='Create'
    document.getElementById('post_id').value = ""
    document.getElementById('post_modal_title').innerHTML ='Create a New Post'
    document.getElementById('create_post_title').value = ""
    document.getElementById('create_post_body').value = ""


    let PostMOdal = new bootstrap .Modal(document.getElementById('Create_post_Modal'),{})
    PostMOdal.toggle()

}
