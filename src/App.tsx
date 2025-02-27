//Hooks
import { useEffect, useState } from "react";
import { useStore } from "./store"

//UI
import { Route, Routes } from "react-router"
import { HomeScreen, NotFoundScreen, SlashScreen } from "./screens"

const App = () => {

  //States
  const [isAppReady, SetIsAppReady] = useState<boolean>(false);

  //Stores
  const isStoreReady = useStore((state) => state.isStoreReady);

  useEffect(() => {
    console.log(isAppReady, isStoreReady);
  },[isAppReady, isStoreReady])

  if (!isAppReady || !isStoreReady) return (
    <SlashScreen
      onFinish={() => SetIsAppReady(true)}
    />
  )

  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export default App
