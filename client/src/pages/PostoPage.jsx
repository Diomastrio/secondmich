import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostoCard from "../components/PostoCard";

export default function PostoPage() {
  const { PostoSlug } = useParams();
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(false);
  const [Posto, setPosto] = useState(null);
  const [recentPostos, setRecentPostos] = useState(null);

  useEffect(() => {
    const fetchPosto = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/Posto/getPostos?slug=${PostoSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPosto(data.Postos[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPosto();
  }, [PostoSlug]);

  useEffect(() => {
    try {
      const fetchRecentPostos = async () => {
        const res = await fetch(`/api/Posto/getPostos?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPostos(data.Postos);
        }
      };
      fetchRecentPostos();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {Posto && Posto.title}
      </h1>
      <Link
        to={`/search?category=${Posto && Posto.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {Posto && Posto.category}
        </Button>
      </Link>
      <img
        src={Posto && Posto.image}
        alt={Posto && Posto.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{Posto && new Date(Posto.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {Posto && (Posto.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full Posto-content"
        dangerouslySetInnerHTML={{ __html: Posto && Posto.content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full">
        {/* <CallToAction /> */}
      </div>
      <CommentSection PostoId={Posto._id} />

      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Articulos recientes</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {recentPostos &&
            recentPostos.map((Posto) => <PostoCard key={Posto._id} Posto={Posto} />)}
        </div>
      </div>
    </main>
  );
}
