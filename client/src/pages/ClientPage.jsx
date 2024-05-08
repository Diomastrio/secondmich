// import { Modal, Table, Button } from 'flowbite-react';
// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { HiOutlineExclamationCircle } from 'react-icons/hi';

// export default function ClientPage() {
// const [loading, setLoading] = useState(true);
// const [client, setClient] = useState(null);
// const [error, setError] = useState(false);
// const [recentClients, setRecentClients] = useState(null);
//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch("/api/post/getClients");
//         const data = await res.json();
//         if (!res.ok) {
//           setError(true);
//           setLoading(false);
//           return;
//         }
//         if (res.ok) {
//           setPost(data.clients[0]);
//           setLoading(false);
//           setError(false);
//         }
//       } catch (error) {
//         setError(true);
//         setLoading(false);
//       }
//     };
//     fetchPost();
//   }, []);
//     useEffect(() => {
//         try {
//         const fetchRecentPosts = async () => {
//             const res = await fetch("/api/post/getClients?limit=3");
//             const data = await res.json();
//             if (res.ok) {
//             setRecentClients(data.clients);
//             }
//         };
//         fetchRecentPosts();
//         } catch (error) {
//         console.log(error.message);
//         }
//     }, []);
// if (loading)
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Spinner size="xl" />
//       </div>
//     );
//     return (
//         <div className="p-3 max-w-3xl mx-auto min-h-screen">
//           <h1 className="text-center text-3xl my-7 font-semibold">
//             Clientes
//           </h1>
//           <Table>
//             <Table.Head>
//               <Table.Row>
//                 <Table.Cell>Nombre</Table.Cell>
//                 <Table.Cell>Correo</Table.Cell>
//                 <Table.Cell>Fecha de nacimiento</Table.Cell>
//                 <Table.Cell>Acciones</Table.Cell>
//               </Table.Row>
//             </Table.Head>
//             <Table.Body>
//               {client.map((client) => (
//                 <Table.Row key={client._id}>
//                   <Table.Cell>{client.name}</Table.Cell>
//                   <Table.Cell>{client.email}</Table.Cell>
//                   <Table.Cell>{client.birthdate}</Table.Cell>
//                   <Table.Cell>
//                     <Button
//                       color="primary"
//                       size="sm"
//                       className="mr-2"
//                       onClick={() => handleEdit(client._id)}
//                     >
//                       Editar
//                     </Button>
//                     <Button
//                       color="danger"
//                       size="sm"
//                       onClick={() => handleDelete(client._id)}
//                     >
//                       Eliminar
//                     </Button>
//                   </Table.Cell>
//                 </Table.Row>
//               ))}
//             </Table.Body>
//           </Table>
//         </div>
//     )
// }
