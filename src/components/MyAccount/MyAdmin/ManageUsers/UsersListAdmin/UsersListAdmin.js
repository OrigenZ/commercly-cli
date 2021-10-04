import axiosInstance from '../../../../../common/http/index'
import UserCard from '../../../../UserCard/UserCard'

const UsersListAdmin = (props) => {
  const { users, setUsers } = props

  const storedToken = localStorage.getItem('authToken')

  const handleDelete = async (id) => {
    await axiosInstance
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
