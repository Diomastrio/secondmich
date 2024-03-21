/* eslint-disable no-unused-vars */
import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { set } from 'mongoose';

export default function DashPostos() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPostos, setUserPostos] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [PostoIdToDelete, setPostoIdToDelete] = useState('');
  useEffect(() => {
    const fetchPostos = async () => {
      try {
        const res = await fetch(`/api/Posto/getPostos?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPostos(data.Postos);
          if (data.Postos.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPostos();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPostos.length;
    try {
      const res = await fetch(
        `/api/Posto/getPostos?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPostos((prev) => [...prev, ...data.Postos]);
        if (data.Postos.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePosto = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/Posto/deletePosto/${PostoIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPostos((prev) =>
          prev.filter((Posto) => Posto._id !== PostoIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userPostos.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Fecha de creacion</Table.HeadCell>
              <Table.HeadCell>Imagen de proveedor</Table.HeadCell>
              <Table.HeadCell>Nombre</Table.HeadCell>
              <Table.HeadCell>Compañia</Table.HeadCell>
              <Table.HeadCell>Eliminar</Table.HeadCell>
              <Table.HeadCell>
                <span>Editar</span>
              </Table.HeadCell>
            </Table.Head>
            {userPostos.map((Posto) => (
              <Table.Body key={Posto._id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(Posto.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/Posto/${Posto.slug}`}>
                      <img
                        src={Posto.image}
                        alt={Posto.title}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='font-medium text-gray-900 dark:text-white'
                      to={`/Posto/${Posto.slug}`}
                    >
                      {Posto.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{Posto.category}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setPostoIdToDelete(Posto._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Eliminar
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='text-teal-500 hover:underline'
                      to={`/update-Posto/${Posto._id}`}
                    >
                      <span>Editar</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Mostrar mas
            </button>
          )}
        </>
      ) : (
        <p>Aun no hay proveedores!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Esta seguro de que quiere eliminar este proveedor?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeletePosto}>
                Si estoy seguro
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
