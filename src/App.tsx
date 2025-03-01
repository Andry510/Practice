//Hooks
import { useStore } from "./store";

//UI
import { Route, Routes } from "react-router"
import {
  HomeScreen,
  NotFoundScreen,
  SignInScreen,
  SlashScreen,
  UpdateProductScreen
} from "./screens";

const App = () => {

  //Stores Values
  const isLogged = useStore((state) => state.isLogged);
  const isAppReady = useStore((state) => state.isAppReady)
  const isStoreReady = useStore((state) => state.isStoreReady);

  //Functions Store
  const setIsAppReady = useStore((state) => state.setIsAppReady);


  if (!isAppReady || !isStoreReady) return (
    <SlashScreen
      onFinish={() => setIsAppReady(true)}
    />
  )

  return (
    <Routes>
      {
        !isLogged ? (
          <Route path="/" element={<SignInScreen />} />
        ) : (
          <>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/products/:productId" element={<UpdateProductScreen />} />
          </>
        )
      }
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export default App
