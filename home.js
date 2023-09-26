
// ==== Infinit scroll  ===//
let currentPage = 1
let lastPage = 1
window.addEventListener("scroll", ()=>{
    const endOfPage = window.innerHeight + window.pageYOffset >= document.body.scrollHeight;
    
    console.log( window.innerHeight,window.pageYOffset,document.body.scrollHeight)

    if(endOfPage && currentPage < lastPage ) // 
    {
        
        getPost(false,currentPage)
        currentPage +=currentPage 
    }
});

// ==== Infinit scroll  ===//


// get post


const getPost= (reload=true,page) => {
    getShowLoder(true)
    axios.get(`${baseUrl}posts?limit=5&page=${page}`) 
        .then((response)=>{
            getShowLoder(false)
            let posts = response.data.data
            
            if(reload)
            {
              document.getElementById('contant').innerHTML ='' 
            }
        
            
            lastPage = response.data.meta.last_page
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
                                    <div class="hover" style="cursor: pointer;" onclick="profileUser('${encodeURIComponent(JSON.stringify(post))}')">
                                        <img class="rounded-circle border border-2" src="${post.author.profile_image}" style="width: 40px;height: 40px;" alt="">
                                        <b >${post.author.username}</b>
                                    </div>    
                                    ${EditbuttonContant}
                                </h5>
                                <div class="card-body" onclick="postClicked(${post.id})">
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
                        document.getElementById('contant').innerHTML += cantent
                        
                        
                    }
        // StagePpsts(posts)
            
            
        }).catch(function (error) {
            
            console.log(error);
        })

}

getPost()


  





function postClicked(id)
{
    window.location =`postDetails.html?postId=${id}`
}

// PorofileUser

function profileUser(postObject)
{
    let postUser = JSON.parse(decodeURIComponent(postObject))
    window.location =`profile.html?postId=${postUser.id}`
    localStorage.setItem('postUser',JSON.stringify(postUser))

}


