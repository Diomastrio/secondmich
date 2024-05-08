import { Modal, Table, Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashClient() {
  const { currentUser } = useSelector((state) => state.user);
  const [clientIdToDelete, setClientIdToDelete] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [clients, setClients] = useState([]);
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/post/getClients");
        const data = await res.json();
        if (res.ok) {
          setClients(data.clients[0]);
          setLoading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchClients();
    }
  }, [currentUser.isAdmin]);

  const handleDeleteClient = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deleteClient/${clientIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        setClients(null);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && clients.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Client Name</Table.HeadCell>
              <Table.HeadCell>Client Email</Table.HeadCell>
              <Table.HeadCell>Client Phone</Table.HeadCell>
              <Table.HeadCell>Client Address</Table.HeadCell>
              <Table.HeadCell>Client CURP</Table.HeadCell>
              <Table.HeadCell>Client Birthdate</Table.HeadCell>
              <Table.HeadCell>
                <span>editar</span>
              </Table.HeadCell>
            </Table.Head>
            {clients.map((client) => (
              <Table.Body key={client._id} className="divide-y">
                <Table.Row>
                  <Table.Cell>
                    {new Date(client.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{client.name}</Table.Cell>
                  <Table.Cell>{client.email}</Table.Cell>
                  <Table.Cell>{client.phone}</Table.Cell>
                  <Table.Cell>{client.address}</Table.Cell>
                  <Table.Cell>{client.curp}</Table.Cell>
                  <Table.Cell>{client.birthdate}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setClientIdToDelete(client._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Eliminar
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/update-post/${client._id}`}
                    >
                      <span>Editar</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p>No clients found</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Body>
          <div className="flex items-center justify-center">
            <HiOutlineExclamationCircle className="text-red-500 text-4xl" />
            <p className="text-gray-900 dark:text-white ml-3">
              Are you sure you want to delete this client?
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="danger" onClick={handleDeleteClient}>
            Delete
          </Button>
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
