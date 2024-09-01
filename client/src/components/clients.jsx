import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CLIENTS } from '../queries/clientQueries';
import TableRow from './tableRow';
import Loader from './loader';

function Clients() {
  const { loading, data, error } = useQuery(GET_CLIENTS);
  if (loading) return <Loader />;
  if (!loading && error) return <h3>Something went wrong</h3>;
  if (!loading && !error && data)
    return (
      <table className='table table-hover mt-3'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.clients.map((client) => (
            <TableRow key={client.id} data={client} />
          ))}
        </tbody>
      </table>
    );
}

export default Clients;
