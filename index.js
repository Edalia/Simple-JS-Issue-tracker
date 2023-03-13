let issue_click = document.getElementById("issue-click");
let addIssue_header = document.getElementById("addIssue-header");
let issue = {};
let issues = [];
let issue_text = document.getElementById("issue-text");
const issues_cardBody = document.getElementById("issues-card-body");
const form_cardBody = document.getElementById("form-card-body");

fetch_issues();



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


function insert_issue(event){
    event.preventDefault();
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;
    const assigned_to = document.getElementById('assigned-to').value;

    if(description && priority && assigned_to){
        issue = {
            issue_id: generate_issueID(),
            issue_description:description,
            issue_priority: priority,
            issue_isUpdated:false,
            issue_assign: assigned_to
        };
    
        
        //storage was set prior to new issue being added - prevent previous issues from being overidden
        if(localStorage.hasOwnProperty("issue")){

            //consider previous issues
            issues = JSON.parse(localStorage.getItem("issue"));

            issues.push(issue)
            
            // Store the object into storage
            localStorage.setItem("issue", JSON.stringify(issues));
     

            addIssue_header.innerHTML = "The issue was added successfully";
            addIssue_header.className = "alert alert-success"
            fetch_issues();

            
        }else{

            issues.push(issue)
            
            // Store the object into storage
            localStorage.setItem("issue", JSON.stringify(issues));

            addIssue_header.innerHTML = "The issue was added successfully";
            addIssue_header.className = "alert alert-success"
            fetch_issues();
        }
    
        console.log(issues);
    }else{
        addIssue_header.innerHTML = "A field was left blank";
        addIssue_header.className = "alert alert-danger"
    }

    $(document).ready(function () {
        setTimeout(function () { location.reload(true);}, 2000);
      });

}

function fetch_issues(){

    let issues = JSON.parse(localStorage.getItem("issue"));
    
    if(issues!=null && issues.length > 0){
        issues_cardBody.innerHTML = " ";

        for(let i=0; i<issues.length; i++){
            issues_cardBody.innerHTML +=  `                    
    
            <div class="row">
                <p> Issue id: ${issues[i].issue_id + ((issues[i].issue_isUpdated? `<b> (updated)</b>`:""))}</p>
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
            <button class="btn btn-warning" onclick="update_issue('${issues[i].issue_id}',event)">Update</button>
            <button class="btn btn-danger" onclick="delete_issue('${issues[i].issue_id}')">Delete</button>
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

function update_issue(i, event){

        event.preventDefault();

        let fetched_issues = JSON.parse(localStorage.getItem("issue"));

        let update_obj = fetched_issues.find((obj) => obj.issue_id === i)

        addIssue_header.innerHTML = `Updating issue: ${update_obj.issue_id}`;
        addIssue_header.className = "alert alert-primary"

        if(update_obj){
            form_cardBody.innerHTML =  `
                <form>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <input type="text" id="description" class="form-control" required value='${(update_obj.issue_description)}'>
                    </div>
                    
                    <div class="form-group">
                        <label for="priority">Priority</label>
                        <select id="priority" class="form-control" required>
                            <option value="Low" ${update_obj.issue_priority==='Low'? 'selected':''}>Low</option>
                            <option value="Medium" ${update_obj.issue_priority==='Medium'? 'selected':''}>Medium</option>
                            <option value="High" ${update_obj.issue_priority==='High'? 'selected':''}>High</option>
                        </select> 
                    </div>
                    
                    <div class="form-group">
                        <label for="assigned-to">Assigned to:</label>
                        <input type="text" id="assigned-to" class="form-control" required value='${update_obj.issue_assign}'>
                    </div>

                    <button type="submit" class="btn btn-success" onclick="update_issue_record('${update_obj.issue_id}', event)">Update issue</button>
                </form>
        `;
        }

        console.log(update_obj)
}

function update_issue_record(id, event){
    event.preventDefault();
    issues = JSON.parse(localStorage.getItem("issue"));

    //fetch object details from localstorage array
    let update_issue_obj = issues.find((obj) => obj.issue_id === id);

    //fetch the object's index
    let issue_obj_index = issues.findIndex((obj) => obj.issue_id === id)

    //update new issue object to be stored
    update_issue_obj.issue_id = id;
    update_issue_obj.issue_description = document.getElementById('description').value;
    update_issue_obj.issue_priority = document.getElementById('priority').value;
    update_issue_obj.issue_assign = document.getElementById('assigned-to').value;
    update_issue_obj.issue_isUpdated = true;

    //replace obj at index with new updated object
    issues.splice(issue_obj_index, 1, update_issue_obj)

    //store new array to localstorage 
    localStorage.setItem("issue", JSON.stringify(issues));

    addIssue_header.innerHTML = `Issue: ${update_issue_obj.issue_id} was updated successfully!`;
    addIssue_header.className = "alert alert-success"
    fetch_issues();
    
    //reload page after execution
    $(document).ready(function () {
        setTimeout(function () { location.reload(true);}, 2000);
      });
}

function delete_issue(i){
    if(confirm("Are you sure you want to delete the issue?")){

        let fetched_issues = JSON.parse(localStorage.getItem("issue"));
        
        //Get index of the issue to be deleted -> issue_id == i
        let index_pop = fetched_issues.findIndex((obj) => obj.issue_id === i)

        //At the index of the isssue, remove 1 item
        fetched_issues.splice(index_pop, 1)

        //Save localstorage key+values using new array 
        localStorage.setItem("issue", JSON.stringify(fetched_issues));
    
        if(localStorage.hasOwnProperty("issue")){
                addIssue_header.innerHTML = "The issue was deleted successfully";
                addIssue_header.className = "alert alert-success"
                fetch_issues();
        }else{
                addIssue_header.innerHTML = "There was an error in deleting the issue";
                addIssue_header.className = "alert alert-danger"
        }
    }
}