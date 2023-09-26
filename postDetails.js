// const { default: axios } = require("axios")

const urlParams =new URLSearchParams(window.location.search)
let id = urlParams.get('postId')
console.log(id)

const getPost= () => {
    
    axios.get(`${baseUrl}posts/${id}`) 
        .then((response)=>{
           
            UiPostDetails(response)
            
        }).catch(function (error) {
            
            console.log(error);
        })

        

}

function UiPostDetails(response)
{
    let post = response.data.data
    let Comments_post= post.comments
    let author= post.author.username
    console.log (response.data)
    console.log(Comments_post)                  
    // PostComments(Comments_post)

    console.log(post)
    let postTitle = ''

    if (post.title != null)
    {
        postTitle = post.title
    }
    
    document.getElementById('Post_Author').innerHTML =`${author}'s`

    let CommentsContant=``

    for(comment of Comments_post)
    {

        CommentsContant +=
        `
            <!-- comment -->

            <div class="p-3 mb-1" style="background-color:rgb(207, 201, 201)">
            <!-- Profile_Picture + Useranme -->
            <div>

                <img class="rounded-circle border border-2 image" src="${comment.author.profile_image}" alt="">
                <b>${comment.author.username}</b>
            </div>
            <!--// Profile_Picture + Useranme// -->

            <!-- Comment's Body -->
            <div>
            ${comment.body}
            </div>
            <!-- //Comment's Body// -->
            </div>
        <!-- comment -->
        `
    }
      
    let cantent =`
    
        <div class="card shadow my-4" >
            <h5 class="card-header"  >
                <img class="rounded-circle border border-2" src="${post.author.profile_image}" style="width: 40px;height: 40px;" alt="">
                <b>${post.author.username}</b>
                    
            </h5>
            <div class="card-body" >
                    <img src="${post.image}" class="w-100 rounded" alt="">
                    <p class="card-text">${post.created_at}</p>
                    <h5 class="card-title">${postTitle}</h5>
                    
                    <p class="card-title">
                    ${post.body}
                    </p>
                    <hr>
                    <div>
                        <img src="/Bootstrap/Project_1/images/uptate.png" alt="">
                        <samp>${post.comments_count}</samp>
                        <samp>
                            <button class="btn btn-sm rounded-5" style="background-color:gray;color:white">
                            Policy
                            </button>
                        </samp>
                        
                    </div>
            </div>

            <!-- COMMENTS -->
            <div class="comments">
             ${CommentsContant}
            
            </div>
            <!-- //COMMENTS// -->
                    
            

            <div class='input-group mb-3' id='add_comment_div'>
                    <input id='comment_input' placeholder='Add your comment here' class='form-control' >
                    <button class='btn btn-outline-primary' type='button' onclick ="PostComments()" >Send!</button>     
            </div>
        </div>
    
    `
    document.getElementById('contant').innerHTML = cantent
}

getPost()


function PostComments()
{

    let comment_input=document.getElementById('comment_input').value
    
   let params ={
    "body" : comment_input
   }

   let token = localStorage.getItem('token')
   let url = `${baseUrl}posts/${id}/comments`

   axios.post(url,params,{
    headers: {
        "authorization":`Bearer ${token}`
    }
   }).then((response) => {
    console.log(response.data)
    getPost()
    comment_input =''
    showAlert('your comment has been created suucessfully','success')
   })
   .catch((error)=>
   {
    let errorMessage= error.response.data.message
    showAlert(errorMessage,'danger')
   })
   

}


