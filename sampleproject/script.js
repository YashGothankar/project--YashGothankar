listofemployees = []
selectedId = -1;

function openFunction(){
    document.getElementById("menu").style.width = "300px"
}

function closeFunction(){
    document.getElementById("menu").style.width = "0px"
}

function openForm(){
    document.getElementById("myForm").style.display = "block"
}

function closeForm(){
    document.getElementById("myForm").style.display = "none"
}


function init(){
    document.getElementById("tablerows").innerHTML=" ";
    if(localStorage.employeesRecord){
        listofemployees = JSON.parse(localStorage.employeesRecord);
        for(i=0;i<listofemployees.length;i++){
            prepareTableCell(i,listofemployees[i].fullname, listofemployees[i].employeeage);
        }
    }
}

function onsubmitPressed(){
    var Id = document.getElementById("employeeId").value;
    var Name = document.getElementById("fullName").value;
    var Age = document.getElementById("employeeAge").value;

    var empObj = {fullname:Name, employeeid:Id, employeeage:Age};
    if(selectedId === -1){
        listofemployees.push(empObj);
    }else{
        listofemployees.splice(selectedId,1,empObj);
    }

    localStorage.employeesRecord = JSON.stringify(listofemployees);

    init();
    clearRow();
}

function prepareTableCell(Id,Name,Age){
    var table = document.getElementById("tablerows");
    var row = table.insertRow();
    var NameCell = row.insertCell(0);
    var AgeCell = row.insertCell(1);
    var ActionCell = row.insertCell(2);

    NameCell.innerHTML = Name;
    AgeCell.innerHTML = Age;
    ActionCell.innerHTML = '<button class="clear" onclick="editRow('+Id+')">Edit</button> <button class="clear" onclick="deleteRow('+Id+')">Delete</button>';
}

function deleteRow(Id){
    if(confirm("Are you Sure?")){
        listofemployees.splice(Id,1);
        localStorage.employeesRecord = JSON.stringify(listofemployees);
        init();
    }
    
}

function editRow(Id){
    selectedId = Id;
    var empObj = listofemployees[Id];
    document.getElementById("employeeId").value = empObj.employeeid;
    document.getElementById("fullName").value = empObj.fullname;
    document.getElementById("employeeAge").value = empObj.employeeage;
    document.getElementById("submit").innerHTML = "Update";
    openForm();
}

function clearRow(){
    selectedId = -1;
    document.getElementById("fullName").value = "";
    document.getElementById("employeeId").value = "";
    document.getElementById("employeeAge").value = "";
    document.getElementById("submit").innerHTML = "Submit";
}

function onSearch(){
    let input, filter, table, tr, td, txtValuee;
    input = document.getElementById("employeeSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("employeeList");
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

