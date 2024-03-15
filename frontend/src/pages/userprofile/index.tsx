import React from "react";
import { useQuery } from "@apollo/client";
import { queryGetUsers } from "@/graphql/queryGetUser";

import Layout from "@/components/Layout";

interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  nickname: string;
}

export default function Profile(): React.ReactNode {
  const { loading, error, data } = useQuery(queryGetUsers);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error.message}</p>;

  const users = data?.getUsers;

  console.log(users);

  // la const users (récupérée depuis la query getUsers) retourne un tableau d'utilisateur
  // il faut donc faire un .map

  return (
    <Layout title="Mon profil">
      <main className="main-content">
        <p>Page de profil</p>
        {users.map((user: User) => (
          <div key={user.id}>
            <p>Mon adresse mail est : {user.email}</p>
            <p>Mon prénom : {user.firstname}</p>
            <p>Mon nom de famille : {user.lastname}</p>
            <p>Mon pseudo : {user.nickname}</p>
          </div>
        ))}
      </main>
    </Layout>
  );
}
