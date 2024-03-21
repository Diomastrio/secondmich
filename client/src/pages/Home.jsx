/* eslint-disable react/jsx-no-comment-textnodes */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  const [postos, setPostos] = useState([]);

  useEffect(() => {
    const fetchPostos = async () => {
      const res = await fetch("/api/posto/getPostos");
      const data = await res.json();
      setPostos(data.postos);
    };
    fetchPostos();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto ">
        <h1 className="text-3xl font-bold lg:text-6xl">
          Bienvenidos a Proyecto MERN
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Descubre como crear aplicaciones web con MERN stack
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          Ver todos los productos
        </Link>
      </div>
      <div className="p-3 bg-orange-100 dark:bg-slate-700">
        {/* <CallToAction /> */}
      </div>

        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
          {posts && posts.length > 0 && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-semibold text-center">
                Publicaciones recientes
              </h2>
              <div className="flex flex-wrap gap-4">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
              <Link
                to={"/search"}
                className="text-lg text-teal-500 hover:underline text-center"
              >
                Ver todas las publicaciones
              </Link>
            </div>
          )}
          {postos && postos.length > 0 && (
            <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-semibold text-center">
                  Postos creados
                </h2>
                <div className="flex flex-wrap gap-4">
                  {postos.map((posto) => (
                    <PostCard key={posto._id} post={posto} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
  );
}
