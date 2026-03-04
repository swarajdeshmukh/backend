import "./style.scss";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from './features/auth/auth.context';
import { SongContextProvider } from "./features/home/song.context";
const App = () => {
  return (
    <AuthProvider>
      <SongContextProvider>
        <AppRoutes />
      </SongContextProvider>
    </AuthProvider>
  );
}

export default App
