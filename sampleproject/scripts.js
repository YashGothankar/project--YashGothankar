listofdep = []
selectedId = null;

function openFunction(){
    document.getElementById("menu").style.width = "300px"
}

function closeFunction(){
    document.getElementById("menu").style.width = "0px"
}

function openForm(){
    document.getElementById("depForm").style.display = "block"
}

function closeForm(){
    document.getElementById("depForm").style.display = "none"
}


function init(){
    document.getElementById("depRows").innerHTML=" ";
    if(localStorage.depRecord){
        listofdep = JSON.parse(localStorage.depRecord);
        for(i=0;i<listofdep.length;i++){
            prepareTableCell(i,listofdep[i].depname,listofdep[i].depnumber);
        }
    }
}

function onsubmitPressed(){
    var Id = document.getElementById("depId").value;
    var Name = document.getElementById("depName").value;
    var Number = document.getElementById("depNumber").value;

    var depObj = {depname:Name, depid:Id, depnumber:Number};
    if(selectedId === null){
        listofdep.push(depObj);
    }else{
        listofdep.splice(selectedId,1,depObj);
    }

    localStorage.depRecord = JSON.stringify(listofdep);

    init();
    clearRow();
}

function prepareTableCell(Id,Name,Number){
    var table = document.getElementById("depRows");
    var row = table.insertRow();
    var NameCell = row.insertCell(0);
    var NumberCell = row.insertCell(1);
    var ActionCell = row.insertCell(2);

    NameCell.innerHTML = Name;
    NumberCell.innerHTML = Number;
    ActionCell.innerHTML = '<button class="clear" onclick="editRow('+Id+')">Edit</button> <button class="clear" onclick="deleteRow('+Id+')">Delete</button>';
}

function deleteRow(Id){
    if(confirm("Are you Sure?")){
        listofdep.splice(Id,1);
        localStorage.depRecord = JSON.stringify(listofdep);
        init();
    }
    
}

function editRow(Id){
    selectedId = Id;
    var depObj = listofdep[Id];
    document.getElementById("depId").value = depObj.depid;
    document.getElementById("depName").value = depObj.depname;
    document.getElementById("depNumber").value = depObj.depnumber;
    document.getElementById("submits").innerHTML = "Update";
    openForm();
}

function clearRow(){
    selectedId = null;
    document.getElementById("depName").value = "";
    document.getElementById("depId").value = "";
    document.getElementById("depNumber").value = "";
    document.getElementById("submits").innerHTML = "Submit";
}

function onSearch(){
    let input, filter, table, tr, td, txtValuee;
    input = document.getElementById("depSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("depList");
    tr = table.getElementsByTagName("tr");

    for(i = 0; i<tr.length;i++){
        td = tr[i].getElementsByTagName("td")[0];
        if(td){
            txtValuee = td.textContent || td.innerText;
            if(txtValuee.toUpperCase().indexOf(filter) > - 1){
                tr[i].style.display = "";
            }
            else{
                tr[i].style.display = "none";
            }
        }
    }
}

