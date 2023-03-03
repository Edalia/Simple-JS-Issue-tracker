let issue_click = document.getElementById("issue-click");
let addIssue_header = document.getElementById("addIssue-header");
let issue = {};
let issues = [];
let issue_text = document.getElementById("issue-text");
const issues_cardBody = document.getElementById("issues-card-body");

fetch_issues();

issue_click.addEventListener('click', function(e){

    e.preventDefault();

    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;
    const assigned_to = document.getElementById('assigned-to').value;

    if(description && priority && assigned_to){
        issue = {
            issue_id: generate_issueID(),
            issue_description:description,
            issue_priority: priority,
            issue_assign: assigned_to
        };
    
        issues.push(issue)

        // Store the object into storage
        localStorage.setItem("issue", JSON.stringify(issues));
     
        if(localStorage.hasOwnProperty("issue")){
            addIssue_header.innerHTML = "The issue was added successfully";
            issues_cardBody.innerHTML = " ";
            addIssue_header.className = "alert alert-success"
            fetch_issues();

            
        }else{
            addIssue_header.innerHTML = "There was an error in recording the issue";
            addIssue_header.className = "alert alert-danger"
        }
    
        console.log(issues);
    }else{
        addIssue_header.innerHTML = "A field was left blank";
        addIssue_header.className = "alert alert-danger"
    }

})

//issue ID generator
function generate_issueID(){
let char = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
let random_index;

let issue_id = " "

for(let i=0; i<10; i++){
    random_index = Math.round((Math.random()*[char.length-1]));

    issue_id += char[random_index];

}

return String(issue_id);

}


function fetch_issues(){

    let issues = JSON.parse(localStorage.getItem("issue"));

    if(issues){
        

        for(let i=0; i<issues.length; i++){
            issues_cardBody.innerHTML +=  `                    
    
            <div class="row">
                <p> Issue id: ${issues[i].issue_id}</p>
            </div>
            <div>
                <b><p id="issue-text">${issues[i].issue_description}</p></b>
            </div>
        
            <div class="row">
                <p id="priority-text">
                    <i class="bi bi-clock"></i>${issues[i].issue_priority} 
                </p>
                &nbsp&nbsp
                <p id="assign-text">
                    <i class="bi bi-person-fill"></i>${issues[i].issue_assign}
                </p>    
            </div>
            <button class="btn btn-warning"  >close</button>
            <button class="btn btn-danger" onclick="">delete</button>
            <hr>
            `
            ;
        }
    }else{
        issues_cardBody.innerHTML = `
        <div class="row">
            <p class="alert alert-primary"> There are no reported issues</p>
        </div>`
    }
}


// function deleteIssue(i){
//     issues.pop(issues[i]);


// }
