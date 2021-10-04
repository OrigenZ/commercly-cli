import axiosInstance from '../../../../../common/http/index'
import UserCard from '../../../../UserCard/UserCard'

import Swal from "sweetalert2/src/sweetalert2";

const UsersListAdmin = (props) => {
  const { users, setUsers } = props

  const storedToken = localStorage.getItem('authToken')

  const handleDelete = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", `User ${name} has been deleted.`, "success");

        axiosInstance
    .delete(`/api/users/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
          const newUsers = users.filter((user) => user._id !== id)
          setUsers(newUsers)
          props.history.push('/my-account/admin/users') 
      })
      .catch((err) => {})
      //TODO: set proper error handling
      }
    });
  };
  
return (
    <div className="row">
      { users && users.map((user) => {
          return (
          <UserCard
              key={user._id}
              userData={user}
              handleDelete={handleDelete}
            /> 
          )
        })}
     
    </div>
  )
}

export default UsersListAdmin
