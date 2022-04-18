async function loadList(id) {
    document.getElementById("sectionLists").setAttribute("hidden", true);
    document.getElementById("sectionItems").removeAttribute("hidden");
    var sectionItems = document.getElementById("todoItems");
    document.getElementById("listId").value=id;
    const request1 = await fetch('/listById/'+id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const list = await request1.json();
    var htmlItems = `<nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#" onclick="loadFolders();">Folders</a></li>
            <li class="breadcrumb-item active" aria-current="page" id="descriptionItemNav">`+list.title+`</li>
        </ol>
    </nav>
    <table class="table table-bordered">`;
    const request = await fetch('/itemByList/'+id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const items = await request.json();
    items.forEach(x => {
        var description;
        var check;
        if(x.done==true){
            description =`class="text-muted"><del>`+x.description+`</del>`;
            check = `checked`;
        } else {
            description=`>`+x.description+``;
            check = ``;
        };
        htmlItems += `<tr class="text-center">
                <td style="width: 5%;"><input class="form-check-input" type="checkbox" onclick="doneItem(`+x.id+`);" `+check+`></td>
                <td style="width: 75%;"` + description + `</td>
                <td style="width: 20%;">
                    <button class="btn btn-success btn-sm my-1" data-bs-toggle="modal" data-bs-target="#editModal" onclick="loadEditModal('`+x.description+`','`+x.id+`');"><i class="bi bi-pencil-square mx-1"></i>Edit</button>
                    <button class="btn btn-danger btn-sm my-1" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="loadDeleteModal('`+x.description+`','`+x.id+`');"><i class="bi bi-trash3-fill mx-1"></i>Delete</button>
                </td>
            </tr>`;
    });
    htmlItems += '</table>'
    sectionItems.innerHTML = htmlItems;
};

async function doneItem(id){
    eval("debugger;");
    const request = await fetch('/itemById/'+id.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    var item = await request.json();
    item.done == true? item.done = false : item.done = true;
    await fetch('/updateItem', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    });
    loadList(document.getElementById("listId").value);
}

async function createItem(){
    var description = document.getElementById("newItem").value;
    var listId = document.getElementById("listId").value;
    if(description!=""){
        const request = await fetch('/listById/'+listId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const list = await request.json();
        var newItem = {
            description: description,
            done: false,
            list: list,
        }
        await fetch('/addItem', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
        });
        document.getElementById("newItem").value = "";
        loadList(document.getElementById("listId").value);
    }
}

function loadEditModal(description, id){
    document.getElementById("editDescription").value = description;
    document.getElementById("titleModal").innerHTML = 'Editing Item "'+description+'"';
    document.getElementById("editId").value = id;
}

function loadDeleteModal(description, id){
    document.getElementById("deleteDescription").innerHTML = '"'+description+'"';
    document.getElementById("deleteId").value = id;
}

async function editDescriptionItem(){
    eval("debugger;");
    var id = document.getElementById("editId").value;
    var description = document.getElementById("editDescription").value;
    const request = await fetch('/itemById/'+id.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    var item = await request.json();
    item.description = description;
    await fetch('/updateItem', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    });
    document.getElementById("editDescription").value = "";
    document.getElementById("titleModal").innerHTML = "";
    document.getElementById("editId").value = "";
    loadList(document.getElementById("listId").value);
}

async function deleteItem(){
    eval("debugger;");
    var id = document.getElementById("deleteId").value;
    const request = await fetch('/itemById/'+id.toString(), {
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
    document.getElementById("deleteDescription").value = "";
    document.getElementById("deleteId").value = "";
    loadList(document.getElementById("listId").value);
}