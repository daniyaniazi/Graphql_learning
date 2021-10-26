import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import DisplaData from "./components/DisplaData";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/",
  });
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <DisplaData />
      </div>
      ;
    </ApolloProvider>
  );
}

export default App;
