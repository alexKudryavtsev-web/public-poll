class UserDto {
  id;
  email;
  firstname;
  lastname;
  isActivated;

  constructor(model) {
    this.email = model.email;
    this.firstname = model.firstname;
    this.lastname = model.lastname;
    this.id = model._id;
    this.isActivated = model.isActivated;
  }
}

export default UserDto;
