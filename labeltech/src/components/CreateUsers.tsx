import React, { useState } from 'react';

const CreateUser: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ajoutez ici le code pour ajouter l'utilisateur à la base de données
    console.log(`Ajout de l'utilisateur ${username} avec le mot de passe ${password}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nom d'utilisateur :
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Mot de passe :
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <input type="submit" value="Créer un utilisateur" />
    </form>
  );
};

export default CreateUser;