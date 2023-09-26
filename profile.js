const urlParams =new URLSearchParams(window.location.search)
let id = urlParams.get('postId')
console.log(id)

let newObject = window.localStorage.getItem("postUser");
let postInfo=JSON.parse(newObject)

let authorId = postInfo.author.id
console.log(postInfo)

getPost()
getUser()


function getUser()
{
    // const id ='3433'

    axios.get(`${baseUrl}users/${authorId}`) 
        .then((response)=>{

            let posts = response.data.data
            console.log(posts)
            document.getElementById('ProfileUserInfo').innerHTML=
            `
                
                <div class="col-2 displayy">
                <img src="${posts.profile_image}" style="width: 120px;height: 120px; border-radius: 100px;" alt="">
                </div>
            
                <div class="col-5 displayy" >
                    <div class="user_main_info">User_Name: ${posts.username}</div>
                    <div class="user_main_info">Name: ${posts.name}</div>
                </div>
            
                <div class="col-5 displayy count_Col">
                <div>
                    <samp>${posts.posts_count}</samp> Posts
                </div>
                <div>
                    <samp>${posts.comments_count}</samp> Comments
                </div>
                </div>
            
            `          
        })

}

function getPost  ()  {
    // let id ='3433'
    axios.get(`${baseUrl}users/${authorId}/posts`) 
        .then((response)=>{
            let posts = response.data.data
           
                     
            document.getElementById('user_posts').innerHTML ='' 
                

            for (let post of posts)
                    {
                        

                        console.log(post)
                        let postTitle = ''
                        //  Show or hide edit button
                        
                        let user= getCurrentUser()

                        let isMyPost= user !=  null && post.author.id == user.id

                        let EditbuttonContant= ``

                        if(isMyPost)
                        {
                            EditbuttonContant=`
                            <button class='btn btn-danger' style='float:right;margin-left:5px' onclick="deleteButtonClicked('${encodeURIComponent(JSON.stringify(post))}')">delete</button>    
                                    
                            <button class='btn btn-secondary' style='float:right' onclick="editButtonClicked('${encodeURIComponent(JSON.stringify(post))}')">edit</button>    
                            `
                        }

                        if (post.title != null)
                        {
                            postTitle = post.title
                        }
                        let cantent =`
                        
                            <div class="card shadow my-4" >
                                <h5 class="card-header">
                                    <img class="rounded-circle border border-2" src="${post.author.profile_image}" style="width: 40px;height: 40px;" alt="">
                                    <b>${post.author.username}</b>
                                    
                                    ${EditbuttonContant}
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
                            </div>
                        
                        `
                        document.getElementById('Post_Author').innerHTML =`${post.author.username}'s`

                        document.getElementById('user_posts').innerHTML += cantent
                        
                        
                    }
        // StagePpsts(posts)
            
            
        }).catch(function (error) {
            
            console.log(error);
        })

}

