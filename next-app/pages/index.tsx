import Head from "next/head";
import Chat from "../components/Chat";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mental Health Chatbot</title>
      </Head>
      <main className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-center text-2xl font-bold mb-6">
          Mental Health Assistant
        </h1>
        <Chat />
      </main>
    </>
  );
}