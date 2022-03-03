$(() => {
    $('select').formSelect()
    $('#form-container').hide()
    $('#edit-btn').hide()
    fetchPets(`${API}/all`, paintPets)
})

const API = '/pets'

const postForm = async (url, data, callback) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (response.ok) {
        const responseData = await response.json()
        M.toast({ html: 'Pet added' })
        callback(responseData)
    } else {
        M.toast({ html: 'Error cant add pet' })
    }
}

const fetchPets = async (url, callback) => {
    const response = await fetch(url)
    if (response.ok) {
        const data = await response.json()
        callback(data)
    } else {
        M.toast({ html: 'Cant retrive pet table' })
    }
}

const deletePet = async (url, id) => {
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id.split('-')[2] }),
    })

    if (response.ok) {
        $(`#${id}`).remove()
        M.toast({ html: 'Pet deleted' })
    } else {
        M.toast({ html: 'Cant delete pet' })
    }
}

const putPet = async (url, pet) => {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pet),
    })

    if (response.ok) {
        const data = await response.json()
        $(`#tr-pet-${data.id}`).empty()
        fillRow($(`#tr-pet-${data.id}`), data)
        toggleForm()
        $('#pet_id').remove()
        M.toast({ html: 'Pet edited' })
    } else {
        M.toast({ html: 'Cant edit pet' })
    }
}

const fillRow = (row, pet) => {
    let editBtn = $(
        `<button class="waves-effect waves-light btn-small"><i class="material-icons">edit</i></button>`
    )
    let deleteBtn = $(
        `<button class="waves-effect waves-light btn-small"><i class="material-icons">delete</i></button>`
    )

    editBtn.click(() => editPet(pet))
    deleteBtn.click(() => deletePet(`${API}/delete`, `tr-pet-${pet.id}`))

    let editTd = $(`<td></td>`)
    let deleteTd = $(`<td></td>`)
    editTd.append(editBtn)
    deleteTd.append(deleteBtn)

    row.append(
        `
        <td class="row-data">${pet.name}</td>
        <td class="row-data">${pet.owner}</td>
        <td class="row-data">${pet.type}</td>
        <td class="row-data">${pet.race}</td>
        <td class="row-data">${pet.age}</td>`,
        editTd,
        deleteTd
    )
}

const paintPet = (pet) => {
    let row = $(`<tr id="tr-pet-${pet.id}"></tr>`)
    fillRow(row, pet)
    $('#tbody').append(row)
}

const paintPets = (pets) => {
    pets.forEach((pet) => paintPet(pet))
}

const editPet = async (pet) => {
    $('#submit-btn').hide()
    $('#edit-btn').show()
    $('#pet_id').remove()
    if (!$('#form-container').is(':visible')) {
        toggleForm()
    }

    $('#form').append(
        `<input id="pet_id" name="id" type="text" value="${pet.id}"/>`
    )

    $('#pet_name').val(pet.name)
    $('#pet_owner').val(pet.owner)
    $('#pet_type').val(pet.type)
    $('#pet_race').val(pet.race)
    $('#pet_age').val(pet.age)
}

$('#submit-btn').click(() => {
    const form = new FormData($('#form').get(0))
    const data = {}
    for (let p of form) {
        if (!p[1]) return
        data[p[0]] = p[1].trim()
    }
    if (Object.keys(data).length < 5) return
    postForm(`${API}/add`, data, (pet) => {
        paintPet(pet)
        toggleForm()
    })
})

$('#edit-btn').click(() => {
    const form = new FormData($('#form').get(0))
    const data = {}
    for (let p of form) {
        if (!p[1]) {
            M.toast({ html: 'Fill all inputs' })
            return
        }
        data[p[0]] = p[1].trim()
    }
    if (Object.keys(data).length < 5) {
        M.toast({ html: 'Fill all inputs' })
        return
    }

    putPet(`${API}/edit`, data)
})

$('#cancel-btn').click(() => {
    $('#submit-btn').show()
    $('#edit-btn').hide()
    if ($('#form-container').is(':visible')) {
        toggleForm()
    }
    clearForm()
})

const toggleForm = () => {
    $('#form-container').toggle()
    $('#add-btn').toggle()
    clearForm()
}

const clearForm = () => {
    $('#pet_name').val('')
    $('#pet_owner').val('')
    $('#pet_type').val('')
    $('#pet_race').val('')
    $('#pet_age').val('')
}

$('#add-btn').click((e) => {
    toggleForm()
})
