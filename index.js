let issue_click = document.getElementById("issue-click");
let issue = {}
let issues = []
let issue_text = document.getElementById("issue-text")

issue_click.addEventListener('click', function(e){
    e.preventDefault();

    issue = {
        desc:document.getElementById('description').value,
        priority: document.getElementById('priority').value,
        assign: document.getElementById('assigned-to').value
    };

    issues.push(issue);
 
    console.log(issues.length);
})

