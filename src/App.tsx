import { ConnectionSection } from "./components/ConnectionSection/ConnectionSection";
import Layout from "./components/Layout/Layout";
import { useDiscordUser } from "./hooks/useDiscordUser";

export default function App() {
  const { user, loading } = useDiscordUser();

  if (loading || !user) return <ConnectionSection message="Loading..." state="Loading" />;

  return (
    <div className="min-h-screen">
      <Layout user={user} />
    </div>
  );
}
