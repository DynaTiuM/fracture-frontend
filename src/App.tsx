import Layout from "./components/Layout/Layout";
import { useDiscordUser } from "./hooks/useDiscordUser";

export default function App() {
  const { user, loading } = useDiscordUser();

  if (loading) return <p>Loading Discord user...</p>;
  if (!user) return <p>Failed to load Discord user</p>;
  return (
  <div className="min-h-screen">
    <Layout />
  </div>);
}
