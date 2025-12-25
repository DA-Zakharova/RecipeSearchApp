import check from "./check.png";

function MyRecipesComponent({label, image, calories, ingredients}) {
    return(
        <div className="recipeCard">
            <div className="container">
            <h2>{label}</h2>
            </div>

            <div className="container">
            <img src={image} alt={label} width="300px"/>
            </div>

            
            <ul className="container list">
                {ingredients.map((item, index) => (
                    <li key={index}><img src={check} alt="check" width="30px"/>{item}</li>
                ))}
            </ul>
            

            <div className="container">
            <p>{calories.toFixed()} calories</p>
            </div>

        </div>
    )
}

export default MyRecipesComponent;