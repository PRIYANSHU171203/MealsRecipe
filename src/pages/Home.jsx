
import {Container} from '../components'
import {MealCard} from '../components'



function Home() {
    

    
    return (
            <div className=" py-8 mt-4 mx-10 text-center rounded-2xl  bg-[#F8E8EE] shadow-2xl ">
                <Container>
                    <div className="flex flex-wrap ">
                        <div className="p-2 w-full">
                           
                            <MealCard />
                        </div>
                    </div>
                </Container>
            </div>
        )
}

export default Home
