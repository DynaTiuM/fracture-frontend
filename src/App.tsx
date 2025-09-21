import Layout from "./components/Layout/Layout";

export default function App() {
  //const { user, loading } = useDiscordUser();

  //if (loading) return <p>Loading Discord user...</p>;
  //if (!user) return <p>Failed to load Discord user</p>;
  return (
  <div className="min-h-screen">
    <h2>Welcome</h2>
    <Layout />
  </div>);
}
