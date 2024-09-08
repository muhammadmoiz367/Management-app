import { useMutation } from '@apollo/client';
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { DELETE_CLIENT } from '../mutations/clientQueries';
import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_PROJECTS } from '../queries/projectQueries';

function TableRow({ data }) {
  const [handleDelete] = useMutation(DELETE_CLIENT, {
    variables: { id: data.id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
    // update(cache, { data }) {
    //   const { deleteClient } = data;
    //   const existingClients = cache.readQuery({ query: GET_CLIENTS });
    //   const newClients = existingClients.clients.filter(
    //     (client) => client.id !== deleteClient.id
    //   );
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: { clients: newClients },
    //   });
    // },
  });

  return (
    <tr>
      <td>{data.name}</td>
      <td>{data.email}</td>
      <td>{data.phone}</td>
      <td>
        <button className='btn btn-danger btn-sm' onClick={handleDelete}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}

export default TableRow;
