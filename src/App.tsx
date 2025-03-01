//Hooks
import { useStore } from "./store";
import { useApi } from "./contexts";

//UI
import { Route, Routes } from "react-router"
import {
  CreateProductScreen,
  HomeScreen,
  NotFoundScreen,
  SignInScreen,
  SlashScreen,
  UpdateProductScreen
} from "./screens";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

const App = () => {

  //Stores Values
  const isLogged = useStore((state) => state.isLogged);
  const isAppReady = useStore((state) => state.isAppReady)
  const isStoreReady = useStore((state) => state.isStoreReady);

  //Functions Store
  const setIsAppReady = useStore((state) => state.setIsAppReady);

  //Functions Api
  const handleGetProducts = useApi((state) => state.handleGetProducts);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => await handleGetProducts(),
  })

  //Effects
  useEffect(() => {
    if (isLogged) mutate();
  }, [])

  if (!isAppReady || !isStoreReady || isPending) return (
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
            <Route path="/create" element={<CreateProductScreen />} />
            <Route path="/products/:productId" element={<UpdateProductScreen />} />
          </>
        )
      }
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export default App
