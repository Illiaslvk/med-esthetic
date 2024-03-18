import { useState, useEffect } from "react"
import { fetchAllUsers } from "../../Components/services/userService"
import "./Users.css"

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchAllUsers()
      .then((data) => {
        setUsers(data)
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error)
      })
  }, [])

  return (
    <article className="users-container">
      <h2 className="users-header">Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      ) : (
        <p>No Users to display</p>
      )}
    </article>
  )
}

export default Users
