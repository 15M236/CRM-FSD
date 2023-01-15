import React , {useState , useEffect , useCallback } from 'react'
import axios from 'axios';
import env from './environment';
import Table from 'react-bootstrap/Table';
import DisplayItems from './DisplayItems';
import { useNavigate } from 'react-router-dom';

export default function Queries() {
  const[session,setSession] = useState("Queries")
  let token = sessionStorage.getItem('token');
  const[queries,setQueries] = useState("");
  const navigate = useNavigate();
  
  const listQueries = useCallback( async() => {
    if (sessionStorage.getItem('token')) {
    let res = await axios.get(`${env.apiUrl}/list-queries`,{
      headers:{"Authorization":`Bearer ${token}`}
    })
    if(res.data.statusCode === 200) {
      setQueries(res.data.result)
    }
  }
  else {
    setSession("Not logged in")
    setTimeout(() => {
      navigate('/login')
    }, 2000)
  }
},[token,navigate])

  useEffect( () => {    
      listQueries()
  },[listQueries])

  return (
    <div>
      <h2 >{session}</h2>
     { sessionStorage.getItem('token') && 
      <Table striped bordered hover>
          <thead>
            <tr>
              <th>request ID</th>
              <th>CRITICALITY</th>
              <th>STATUS</th>
              <th>SUBJECT</th>
            </tr>
          </thead>
          <tbody>
            {queries.length > 0 && (queries.map((query,i) => {
              
              return ( 
                  query.status !== "resolved"  && 
                <>
                <tr className='table-row details'>
                  <DisplayItems  value={query}></DisplayItems>
                  <th>{query.critical}</th>
                  <th>{query.status}</th>
                  <th>{query.subject}</th>
                </tr>
                </> 
              )
            }))}
          </tbody>
        </Table> 
}
    </div>
  )
}
