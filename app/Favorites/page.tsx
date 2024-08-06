import Favorites from "../components/Favorites"
import FooterComp from "../components/FooterComp"

export default function FavoritesPage() {
    
    return(

        <>
        
        <div className="flex h-screen w-full flex-col gap-20 overflow-auto">

            <div className="flex justify-center w-full h-auto p-20 bg-black text-white">

                <h1 className="font-bold text-2xl hover:underline ">Favorites</h1>

            </div>

            <div className=" w-full flex justify-center h-auto">

                <Favorites />
                
            </div>

        </div>

        <FooterComp />

        </>
    )
}