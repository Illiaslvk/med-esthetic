import { useState, useEffect } from "react"
import axios from "axios"

const Users = () => {
  const [users, setUsers] = useState()

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/admin/users", {
          signal: controller.signal,
        })
        isMounted && setUsers(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    getUsers()
    // cleanup function
    return () => {
      isMounted = false
      // controller.abort
    }
  }, [])

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No Users to display</p>
      )}
    </article>
  )
}

export default Users
