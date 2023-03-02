let issue_click = document.getElementById("issue-click");
let issue = {}
let issues = []
let issue_text = document.getElementById("issue-text")

issue_click.addEventListener('click', addIssue())

function addIssue(){
    e.preventDefault();

    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;
    const assigned_to = document.getElementById('assigned-to').value;

        issue = {
            issue_id: generate_issueID(),
            issue_description:description,
            issue_priority: priority,
            issue_assign: assigned_to
        };
    
        // Store the object into storage
        // let storeObj = localStorage.setItem("issue", JSON.stringify(issue));
     
        if(issue){
             alert("Issue was addedd successfully");
        }else{
             alert("There was an error in recording the issue");
        }
    
        console.log(issue);
}

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
