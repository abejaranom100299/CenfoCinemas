//Archivo de JavaScript que maneja todo el comportamiento de la vista de usuarios definida en Users.cshtml (WebApp).
//Define una clase de JS usando prototype.

function UsersViewController() {
    this.ViewName = "Users";
    this.ApiEndPointName = "User";

    //Método constructor.
    //Se encarga de inicializar la vista de la UI correspondiente a la página de Users.
    this.InitView = function () {
        console.log("Users init view -> ok");

        //Se carga automática la tabla de usuarios ya registrados cada vez que se inicializa la vista.
        this.LoadTable();

        //Asociar el evento al botón de creación de usuario.
        $('#btnCreate').click(function () {
            var vc = new UsersViewController();
            vc.Create();
        })

        //Asociar el evento al botón de actualización de usuario.
        $('#btnUpdate').click(function () {
            var vc = new UsersViewController();
            vc.Update();
        })

        //Asociar el evento al botón de eliminación de usuario.
        $('#btnDelete').click(function () {
            var vc = new UsersViewController();
            vc.Delete();
        })
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
        columns[2] = { 'data': 'userName' }
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

        //Asignar eventos de carga de datos o binding segun el clic en la tabla
        $('#tblUsers tbody').on('click', 'tr', function () {
            //Extraemos la fila
            var row = $(this).closest('tr');

            //Extraemos el dto
            //Esto nos devuelve el json de la fila seleccionada por el usuario
            //Segun la data devuelta por el API
            var userDTO = $('#tblUsers').DataTable().row(row).data();

            //Binding con el form
            $('#txtId').val(userDTO.id);
            $('#txtUserCode').val(userDTO.userCode);
            $('#txtUserName').val(userDTO.userName);
            $('#txtEmail').val(userDTO.email);
            $('#txtStatus').val(userDTO.status);

            //Fecha tiene un formato
            var onlyDate = userDTO.birthDate.split("T");
            $('#txtBirthDate').val(onlyDate[0]);
        })
    }

    this.Create = function () {
        //Creación de una variable para almacenar los valores de los campos del formulario.
        var userDTO = {};

        //Atributos con valores default, que son controlados por el API.
        userDTO.id = 0;
        userDTO.created = "2025-01-01";
        userDTO.updated = "2025-01-01";

        //Valores capturados del formulario en la vista.
        userDTO.userCode = $('#txtUserCode').val();
        userDTO.userName = $('#txtUserName').val();
        userDTO.email = $('#txtEmail').val();
        userDTO.status = $('#txtStatus').val();
        userDTO.birthDate = $('#txtBirthDate').val();
        userDTO.password = $('#txtPassword').val();

        //Enviar los datos al API.
        //Para hacerlo, se necesita un objeto ControlActions y una variable con el nombre del endpoint del API correspondiente.
        var ca = new ControlActions();
        var urlService = this.ApiEndPointName + '/Create';

        //Se invoca el método PostToAPI del objeto ControlActions para efectuar la creación del usuario.
        //Como parte del proceso, se recarga la tabla para reflejar el usuario añadido.
        ca.PostToAPI(urlService, userDTO, function () {
            $('#tblUsers').DataTable().ajax.reload();
        })
    }

    this.Update = function () {
        var userDTO = {};

        //Atributos con valores default, que son controlados por el API
        userDTO.id = 0;
        userDTO.created = "2025-01-01";
        userDTO.updated = "2025-01-01";

        //Valores capturados en pantalla
        userDTO.userCode = $('#txtUserCode').val();
        userDTO.userName = $('#txtUserName').val();
        userDTO.email = $('#txtEmail').val();
        userDTO.status = $('#txtStatus').val();
        userDTO.birthDate = $('#txtBirthDate').val();
        userDTO.password = $('#txtPassword').val();

        //Enviar la data al API
        var ca = new ControlActions();
        var urlService = this.ApiEndPointName + '/Update';

        ca.PutToAPI(urlService, userDTO, function () {
            //Recargo de la tabla
            $('#tblUsers').DataTable().ajax.reload();
        })
    }

    this.Delete = function () {
        var userDTO = {};
        //Atributos con valores default, que son controlados por el API
        userDTO.id = 0;
        userDTO.created = "2025-01-01";
        userDTO.updated = "2025-01-01";
        //valores capturados en pantalla
        userDTO.userCode = $('#txtUserCode').val();
        userDTO.name = $('#txtUserName').val();
        userDTO.email = $('#txtEmail').val();
        userDTO.status = $('#txtStatus').val();
        userDTO.birthDate = $('#txtBirthDate').val();
        userDTO.password = $('#txtPassword').val();

        //Enviar la data al API
        var ca = new ControlActions();
        var urlService = this.ApiEndPointName + "/Delete";

        ca.DeleteToAPI(urlService, userDTO, function () {
            //recargo de la tabla
            $('#tblUsers').DataTable().ajax.reload();
        })
    }
}


$(document).ready(function () {
    var vc = new UsersViewController();
    vc.InitView();
})