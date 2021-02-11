(function () {
    var $usernameFld, $passwordFld;
    var $firstNameFld, $lastNameFld, $roleFld;
    var $editBtn, $createBtn;
    var $tbody;
    var userService = new AdminUserServiceClient();
    $(main);

    var users = [
        {
            Username: "Charlie",
            Password: "123abc",
            FirstName: "Charlie",
            LastName: "Smith",
            Role: "Admin"
        },
        {
            Username: "Emily",
            Password: "456efd",
            FirstName: "Emily",
            LastName: "Walton",
            Role: "Student"
        },
        {
            Username: "Jessica",
            Password: "563nns",
            FirstName: "Jessica",
            LastName: "Garmin",
            Role: "Faculty"
        }
    ]

    function main() {
        $tbody = jQuery("#wbdv-tbody")
        $createBtn = $(".wbdv-create")
        $editBtn = $(".wbdv-update")

        $usernameFld = $(".usernameFld")
        $passwordFld = $(".passwordFld")
        $firstNameFld = $(".firstNameFld")
        $lastNameFld = $(".lastNameFld")
        $roleFld = $(".roleFld")

        $editBtn.click(updateUser)
        $createBtn.click(createUser)
        userService.findAllUsers().then(function (actualUser) {
            users = actualUser
            renderUsers(users)
        })
    }

    function createUser() {
        var newUser = {
            Username: $usernameFld.val(),
            Password: $passwordFld.val(),
            FirstName: $firstNameFld.val(),
            LastName: $lastNameFld.val(),
            Role: $roleFld.val(),
        }
        userService.createUser(newUser)
            .then(function (actualUser) {
                users.push(actualUser)
                renderUsers(users)
            })
    }

    function deleteUser(event) {
        var button = $(event.target)
        var index = button.attr("id")
        var id = users[index]._id
        userService.deleteUser(id)
            .then(function (status) {
                users.splice(index, 1)
                renderUsers(users)
            })
    }

    var selectedUser = null
    function selectUser(event) {
        var id = $(event.target).attr("id")
        console.log(id)
        selectedUser = users.find(course => course._id === id)
        $usernameFld.val(selectedUser.Username)
        $passwordFld.val(selectedUser.Password)
        $firstNameFld.val(selectedUser.FirstName)
        $lastNameFld.val(selectedUser.LastName)
        $roleFld.val(selectedUser.Role)
    }

    function updateUser() {
        selectedUser.Username = $usernameFld.val()
        selectedUser.Password = $passwordFld.val()
        selectedUser.FirstName = $firstNameFld.val()
        selectedUser.LastName = $lastNameFld.val()
        selectedUser.Role = $roleFld.val()
        userService.updateUser(selectedUser._id, selectedUser)
            .then(status => {
                var index = users.findIndex(course => course._id === selectedUser._id)
                users[index] = selectedUser
                renderUsers(users)
            })
    }

    function renderUsers(users) {
        $tbody.empty()
        for(var i = 0; i < users.length; i++) {
            var user = users[i]
            $tbody
                .prepend(`
      <tr>
          <td>${user.Username}</td>
          <td><a hidden>${user.Password}</a></td>
          <td>${user.FirstName}</td>
          <td>${user.LastName}</td>
          <td>${user.Role}</td>
          <td>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <i id="${i}" class="fa-2x fa fa-times wbdv-remove"></i>
              <i id="${user._id}" class="fa-2x fa fa-pencil wbdv-edit"></i>
        
          </td>
      </tr>
      `)
        }
        $(".wbdv-remove").click(deleteUser)
        $(".wbdv-edit").click(selectUser)
    }
})();
