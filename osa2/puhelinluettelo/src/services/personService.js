import axios from 'axios'
const baseUrl = '/api/persons'

const addPerson = (personObject) => (
  axios
    .post(baseUrl, personObject)
    .then(response => response.data)
)

const getAll = () => (
  axios
    .get(baseUrl)
    .then(response => response.data)
)

const deletePerson = (id) => (
  axios
    .delete(`${baseUrl}/${id}`)
    .then(response => response.data)
)
const updatePerson = (id, personObject) => (
  axios
    .put(`${baseUrl}/${id}`, personObject)
    .then(response => response.data)
)
export default { addPerson, getAll, deletePerson, updatePerson }