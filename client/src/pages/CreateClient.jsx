// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, TextInput } from "flowbite-react";
export default function CreateClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    curp: "",
    birthdate: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Clear previous errors

    try {
      const response = await fetch("/api/client/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message);
        return;
      }

      // Handle successful creation (e.g., clear form, show success message)
      console.log("Client created successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        curp: "",
        birthdate: "",
      });
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Ingresa los datos del cliente
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="nombre del cliente"
            required
            id="name"
            className="flex-1"
            value={formData.name}
            onChange={handleChange}
          />
          <TextInput
            type="text"
            placeholder="correo"
            required
            id="email"
            className="flex-1"
            value={formData.email}
            onChange={handleChange}
          />
          <TextInput
            type="text"
            placeholder="telefono"
            required
            id="phone"
            className="flex-1"
            value={formData.phone}
            onChange={handleChange}
          />
          <TextInput
            type="text"
            placeholder="direccion"
            required
            id="address"
            className="flex-1"
            value={formData.address}
            onChange={handleChange}
          />
          <TextInput
            type="text"
            placeholder="curp"
            required
            id="curp"
            className="flex-1"
            value={formData.curp}
            onChange={handleChange}
          />
          <TextInput
            type="date"
            placeholder="fecha de nacimiento"
            required
            id="birthdate"
            className="flex-1"
            value={formData.birthdate}
            onChange={handleChange}
          />
        </div>
        <Button type="submit">Crear</Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}

// export default function CreateClient() {
//   const [publishError, setPublishError] = useState(null);
//   const [formData, setFormData] = useState({});
//   // const [birthdate, setBirthdate] = useState(null);
//   // const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("/api/client/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();

//       if (!res.ok) {
//         setPublishError(data.message);
//         return;
//       }
//       if (res.ok) {
//         setPublishError(null);
//         console.log(data);
//         // navigate("/");
//       }
//     } catch (error) {
//       setPublishError("Something went wrong");
//     }
//   };
//   return (
//     <div className="p-3 max-w-3xl mx-auto min-h-screen">
//       <h1 className="text-center text-3xl my-7 font-vemibold">
//         Ingresa los datos del cliente
//       </h1>
//       <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//         <div className="flex flex-col gap-4 sm:flex-row justify-between">
//           <TextInput
//             type="text"
//             placeholder="nombre del cliente"
//             required
//             id="name"
//             className="flex-1"
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           />
//           <TextInput
//             type="text"
//             placeholder="correo"
//             required
//             id="email"
//             className="flex-1"
//             onChange={(e) =>
//               setFormData({ ...formData, email: e.target.value })
//             }
//           />
//           <TextInput
//             type="text"
//             placeholder="telefono"
//             required
//             id="phone"
//             className="flex-1"
//             onChange={(e) =>
//               setFormData({ ...formData, phone: e.target.value })
//             }
//           />
//           <TextInput
//             type="text"
//             placeholder="direccion"
//             required
//             id="address"
//             className="flex-1"
//             onChange={(e) =>
//               setFormData({ ...formData, address: e.target.value })
//             }
//           />
//           <TextInput
//             type="text"
//             placeholder="curp"
//             required
//             id="curp"
//             className="flex-1"
//             onChange={(e) => setFormData({ ...formData, curp: e.target.value })}
//           />
//           {/* <Datepicker
//             selected={birthdate}
//             onChange={(date) => setBirthdate(date)}
//             placeholder="Fecha de nacimiento"
//             id="birthdate"
//             className="flex-1"
//           /> */}
//         </div>
//         <Button type="submit">Crear</Button>
//         {publishError && <p className="text-red-500">{publishError}</p>}
//       </form>
//     </div>
//   );
// }
