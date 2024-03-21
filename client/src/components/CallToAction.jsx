import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Quieres saber mas sobre AirGuard?</h2>
        <p className="text-gray-500 my-2">
          Descubre como puedes aumentar la seguridad y eficiencia de tus
          habitaciones
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a
            href="https://www.100jsprojects.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Innovando en IoT
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img src="https://res.cloudinary.com/dpm3yql9u/image/upload/v1706580872/asset_ozulei.jpg" />
      </div>
    </div>
  );
}
