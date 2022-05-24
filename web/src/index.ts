import User, { UserProps } from "./composition/models/User"
import UserForm from "./composition/views/UserForm"

const user = new User({
  name: 'Jack',
  age: 111,
  id: 3,
})

let userForm: UserForm
const formEle = document.getElementById('form')
if (formEle) {
  userForm = new UserForm(
    formEle,
    user
  )
  userForm.render()
} else {
  throw new Error('Cannot find element')
}