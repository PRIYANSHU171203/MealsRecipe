
import {Container, MealSearch} from '../components'
import {MealCard} from '../components'



function Home() {
    

    
    return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <MealSearch />
                        </div>
                    </div>
                </Container>
            </div>
        )
}

export default Home
