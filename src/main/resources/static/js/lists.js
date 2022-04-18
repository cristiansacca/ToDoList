loadFolders();
async function loadFolders() {
    eval("debugger;");
    document.getElementById("sectionItems").setAttribute("hidden", true);
    document.getElementById("sectionLists").removeAttribute("hidden");
    var sectionLists = document.getElementById("todoLists");
    var htmlItems = `<h2>Folders</h2>
    <table class="table table-bordered">`;
    const request = await fetch('/lists', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const lists = await request.json();
    lists.forEach(x => {
        htmlItems += `<tr class="text-center">
                <td style="width: 80%;">` + x.title + `</td>
                <td style="width: 20%;">
                    <button class="btn btn-success btn-sm my-1" onclick="loadList(`+x.id+`);"><i class="bi bi-view-list mx-1"></i>View items</button>
                    <button class="btn btn-danger btn-sm my-1" data-bs-toggle="modal" data-bs-target="#deleteListModal" onclick="loadDeleteListModal('`+x.title+`','`+x.id+`');"><i class="bi bi-trash3-fill mx-1"></i>Delete</button>
                </td>
            </tr>`;
    });
    htmlItems += '</table>'
    sectionLists.innerHTML = htmlItems;
};

async function createList(){
    var title = document.getElementById("newList").value;
    if(title!=""){
        var newList = {
            title: title,
            date: new Date()
        }
        await fetch('/addList', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newList)
        });
        document.getElementById("newList").value = "";
        loadFolders();
    }
}

function loadDeleteListModal(description, id){
    document.getElementById("deleteListDescription").innerHTML = '"'+description+'"';
    document.getElementById("deleteListId").value = id;
}

async function deleteList(){
    var id = document.getElementById("deleteListId").value;
    const request = await fetch('/listById/'+id.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    var list = await request.json();
    //Delete all items
    const requestItems = await fetch('/itemByList/'+id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const items = await requestItems.json();
    items.forEach(async x => {
        const request = await fetch('/itemById/'+x.id.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        var item = await request.json();
        await fetch('/deleteItem', {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
    });

    await fetch('/deleteList', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(list)
    });
    document.getElementById("deleteListDescription").value = "";
    document.getElementById("deleteListId").value = "";
    loadFolders();
}