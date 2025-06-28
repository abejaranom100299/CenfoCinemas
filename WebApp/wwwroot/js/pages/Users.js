//js que maneja todo el comportamiento de la vista de usuarios

//definir una clase JS, usando prototpye

function UsersViewController() {
    this.ViewName = "Users";
    this.ApiEndPointName = "User";

    //Metodo constructor
    this.InitView = function () {
        console.log("User init view --> ok");
        this.LoadTable();
    }

    //Metodo para la carga de una tabla
    this.LoadTable = function () {


        //URL del API a invocar
        //https://localhost:7158/api/User/RetrieveAll

        var ca = new ControlActions();
        var service = this.ApiEndPointName + "/RetrieveAll";

        var urlService = ca.GetUrlApiService(service);


    /*{
    "userCode": "abejarano",
    "userName": "Ana",
    "email": "abejarano@ucenfotec.ac.cr",
    "password": "Ana123!",
    "birthDate": "2025-06-19T02:26:43.487",
    "status": "AC",
    "id": 1,
    "created": "2025-06-19T08:26:45.29",
    "updated": "0001-01-01T00:00:00"
    } */

    /*<tr>
    <th>Id</th>
    <th>UserCode</th>
    <th>UserName</th>
    <th>Email</th>
    <th>Password</th>
    <th>BirthDate</th>
    <th>Status</th>
    </tr> */


        var columns = [];
        columns[0] = { 'data': 'id' }
        columns[1] = { 'data': 'userCode' }
        columns[2] = { 'data': 'name' }
        columns[3] = { 'data': 'email' }
        columns[4] = { 'data': 'birthDate' }
        columns[5] = { 'data': 'status' }
        // Invocamos a datatables para convertir la tabla simple html en una tabla mas robusta
        $('#tblUsers').dataTable({
            "ajax": {
                "url": urlService,
                "dataSrc": ""
            },
            columns: columns
        });
        
    }

}
$(document).ready(function () {
    var vc = new UsersViewController();
    vc.InitView();
})