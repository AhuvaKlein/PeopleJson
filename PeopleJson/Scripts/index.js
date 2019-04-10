$(() => {

    const addPersonToTable = person => {
        $("#people-table").append(`<tr><td>${person.Id}</td>
                                    <td>${person.FirstName}</td>
                                    <td>${person.LastName}</td>
                                    <td>${person.Age}</td>
                                    <td><button class="btn btn-primary delete-person" data-id=${person.Id}>Delete</button></td>
                                    <td><button class="btn btn-success edit-person"
                                            data-id=${person.Id} 
                                            data-firstname=${person.FirstName}
                                            data-lastname=${person.LastName}
                                            data-age=${person.Age}>Edit
                                        </button></td></tr>`);
        console.log(person.FirstName);
    }

    function clearTable(people) {
        for (let i = 0; i <= people.length; i++) {
            $("#people-table").find("tr:gt(0)").remove();
        }
    }

    $.get('/home/getpeople', function (people) {
        console.log('in func')
        people.forEach(addPersonToTable);

    });

    console.log('hello');

    $('#add-person-btn').on('click', function () {

        const firstName = $('#first-name-input').val();
        const lastName = $('#last-name-input').val();
        const age = $('#age-input').val();

        const person = {
            firstName,
            lastName,
            age
        };

        $.post('/home/addPerson', { person }, function () {

            $.get('/home/getpeople', function (people) {

                clearTable(people);
                people.forEach(addPersonToTable);
                $('#first-name-input').val('');
                $('#last-name-input').val('');
                $('#age-input').val('');

            });

        });

    });

    $('#people-table').on('click', '.delete-person', function () {

        const id = $(this).data('id');
        console.log(id);

        $.post('/home/DeletePerson', { id }, function () {

            $.get('/home/getpeople', function (people) {

                clearTable(people);
                people.forEach(addPersonToTable);

            });
        });


    });

    $('#people-table').on('click', '.edit-person', function () {

        console.log('in modal');
        const idModal = $(this).data('id');
        const firstNameModal = $(this).data('firstname');
        const lastNameModal = $(this).data('lastname');
        const ageModal = $(this).data('age');

        console.log(firstNameModal);
        $('#id-modal').val(idModal);
        $('#first-name-modal').val(firstNameModal);
        $('#last-name-modal').val(lastNameModal);
        $('#age-modal').val(ageModal);

        $('#edit-modal').modal();

    });

    $('#edit-modal-button').on('click', function () {

        //const person = {
        //    id: $('#id-modal').val(),
        //    firstName: $('#first-name-modal').val(),
        //    lastName: ('#last-name-modal').val(),
        //    age: ('#age-modal').val(),
        //}

        $.post('/home/editperson', {
            id: $('#id-modal').val(),
            firstName: $('#first-name-modal').val(),
            lastName: $('#last-name-modal').val(),
            age: $('#age-modal').val() }, function () {

            $.get('/home/getpeople', function (people) {

                clearTable(people);
                people.forEach(addPersonToTable);

            });

        });

        $('#edit-modal').modal('hide');

    });

});